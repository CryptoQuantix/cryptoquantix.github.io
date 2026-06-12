# Architecture: Multi-User & Enterprise Security

This document outlines the architectural changes implementing in v2.0 to support Multi-User Concurrency and Role-Based Access Control (RBAC) on a trusted Remote Server.

## 1. The Challenge
In a centralized deployment (e.g. AWS/Heroku serving multiple users via HTTPS), using a Global Singleton for the Salesforce Connection is insecure.
- **Race Conditions**: User A's login overrides User B's session.
- **Privilege Escalation**: A Read-Only user might inherit the Admin session active in RAM.

## 2. The Solution: Session Isolation

We replaced the Global Singleton with a **Session Manager** pattern.

### Components

#### A. Session Manager (`session_manager.py`)
- Maintains a thread-safe dictionary of active sessions.
- Key: `SessionID` (UUID).
- Value: `SalesforceClient` instance.
- Sessions are strictly in-memory (RAM) and are cleared on container restart.

#### B. Context Injection (`server.py`)
- Every specific tool implementation (e.g., `sf_query`) accepts a `ctx: Context` argument.
- The server extracts the `X-Session-ID` header from the transport layer.

#### C. Unique Bridge Identity (`sse_bridge.py`)
- When a client connects via the SSE Bridge, a unique UUID (`uuid4`) is generated.
- This UUID is injected into the `X-Session-ID` header for all JSON-RPC calls.

## 3. Data Flow

1. **Connection**: Client starts `sse_bridge.py`. ID `123-abc` is generated.
2. **Auth**: User asks "Login as Alice".
    - `sf_login` is called with Header `X-Session-ID: 123-abc`.
    - Server instantiates `SalesforceClient(Alice)` and stores it under key `123-abc`.
3. **Action**: User asks "Delete Account".
    - `sf_delete` is called with Header `X-Session-ID: 123-abc`.
    - Server retrieves Alice's client. Action succeeds.
4. **Concurrent Access**:
    - Second user Bob connects (ID `456-def`).
    - Bob tries `sf_delete` without login.
    - Server checks key `456-def` -> Returns "Not Authenticated".
    - Bob cannot access Alice's session.

## 4. Security Principles
- **No Shared State**: Global variables are removed from `salesforce_client.py`.
- **Ephemeral Secrets**: Keys provided in Chat are held in RAM for the session duration only.
- **Persistent Defaults**: Server-wide defaults (from `.env` or Volume) serve as the fallback for unauthenticated sessions, allowing a "Base Service Level".

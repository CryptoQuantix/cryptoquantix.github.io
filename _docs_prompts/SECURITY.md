# Security & Persistence

## Credential Storage

KineticMCP offers two modes for credential storage, catering to different security models.

### 1. File-Based (Enterprise Standard)
- **Mechanism**: Docker Volume Mounts (Secrets).
- **Path**: `/app/secrets/server.key` (ReadOnly).
- **Environment**: `.env` file injected at startup.
- **Usage**: Best for automated deployments, CI/CD, and IT-managed laptops.
- **Security**: Keys never leave the secure file system. Configuration is immutable by the user.

### 2. Volume-Based (Chat Setup)
- **Mechanism**: Encrypted JSON persistence.
- **Path**: `/app/data/mcp_config.json`.
- **Environment**: Runtime injection via `sf_configure`.
- **Usage**: Best for Power Users, prototyping, or scenarios where file access is restricted.
- **Security**:
    - Credentials are strictly confined to the `salesforce_data` Docker volume.
    - They are NOT exposed to the host OS environment variables.
    - They are NOT saved in Claude's text configuration files.

## Transport Security

### HTTPS
When deploying remotely, you **MUST** run the container behind a Reverse Proxy (Nginx/Traefik) providing SSL/TLS termination. The `sse_bridge.py` supports standard HTTPS URLs.

### Header Protection
The `X-Session-ID` header is opaque and should be treated as a session token. In HTTP deployments, TLS is required to prevent sniffing.

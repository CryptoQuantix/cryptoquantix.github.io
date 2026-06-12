# Salesforce MCP Server - Documentation

## Overview
This is a standard Model Context Protocol (MCP) server that connects AI assistants like Claude Desktop to Salesforce. It allows you to read, write, and manage Salesforce data securely using natural language credentials.

## Architecture
The server is designed to run in a Docker container for isolation and ease of deployment.
For **Windows/WSL Users**, we use a special "Stdio Bridge" architecture:
`Claude (Windows)` <-> `wsl.exe` <-> `docker exec` <-> `Python Server (Linux)`

This architecture bypasses common networking issues (SSL/HTTPS, Port forwarding) and provides a secure, direct pipe for communication.

## Installation

### Prerequisites
- Docker (or Docker Desktop)
- Claude Desktop App
- Salesforce Connected App Credentials (Key + Consumer Key)

### 1. Setup Environment
Create a `secrets/` directory and place your Salesforce Private Key there as `server.key`.
Create a `.env` file (copy from `.env.example`) and configure:
```env
SF_USER=your_email@example.com
SF_CONSUMER_KEY=your_connected_app_consumer_key
SF_PRIVATE_KEY_PATH=secrets/server.key
SF_LOGIN_URL=https://test.salesforce.com (or login.salesforce.com)
```

### 2. Configure Permissions inside Docker Compose
Edit `docker-compose.yml` to strictly control what the AI is allowed to do.
```yaml
environment:
  - SF_ENABLE_WRITES=true  # Set to false for read-only safety
  - SF_ALLOWED_SOBJECTS=Account,Contact,Opportunity,Quote,Lead
```

### 3. Build & Run
```bash
docker-compose up --build -d
# The container will start and stay in 'standby' mode (tail -f /dev/null)
```

### 4. Configure Claude (Windows)
Edit `%APPDATA%\Claude\claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "salesforce": {
      "command": "wsl.exe",
      "args": [
        "docker", "exec", "-i", "mcp-salesforce", 
        "python", "-m", "mcp_salesforce_server.server", 
        "--transport=stdio"
      ]
    }
  }
}
```

## Available Tools

### Core Data
- **sf_query**: Run generic SOQL queries (SELECT ...).
- **sf_get**: Get a single record by ID.
- **sf_describe**: inspect object fields and metadata.
- **sf_find_related_fields**: AI-powered fuzzy search for field names.

### Data Manipulation (If Writes Enabled)
- **sf_create**: Create a new record.
- **sf_update**: Update a record.
- **sf_upsert**: Insert or Update based on external ID.
- **sf_delete**: Delete a record.

### Advanced / Bulk
- **sf_create_batch**: Create multiple records in one transaction.
- **sf_sync_records**: Smart sync (Insert/Update/Upsert) logic.
- **sf_bulk_upsert**: Start an asynchronous Bulk V2 job for large files.

## Troubleshooting
- **"Server disconnected"**: Usually due to an error in the Python script. Check indentation or imports.
- **"Command required"**: Ensure your `claude_desktop_config.json` is valid and uses the `command` / `args` structure.
- **Container Exits**: Ensure Dockerfile uses `CMD ["tail", "-f", "/dev/null"]` for the keep-alive strategy.

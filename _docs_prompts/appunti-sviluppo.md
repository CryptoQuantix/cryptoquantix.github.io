# Appunti di Sviluppo e Troubleshooting

## Problema: Claude Desktop non si riconnette al Server MCP
**Sintomo:** Il server Docker è attivo (log ok), ma su Claude Desktop il connettore appare disattivato o errore, e il pulsante "Retry" non funziona.
**Causa:** Claude Desktop "cacha" lo stato di errore o Windows/WSL perde la connessione dopo standby.

### Soluzione "Nucleare" (Funzionante al 100%)
Se i riavvii semplici non funzionano, seguire questa sequenza esatta:

1.  **Riavviare il PC** (per pulire lo stato di WSL e Docker).
2.  **Rimuovere** temporaneamente il file `claude_desktop_config.json` dalla cartella `%APPDATA%\Claude\`.
3.  **Avviare Claude Desktop** (senza config). Verificare che sia "pulito".
4.  **Chiudere Claude Desktop** (Quit dalla tray icon).
5.  **Avviare il server MCP Docker**:
    ```bash
    docker-compose up -d
    ```
6.  **Reinserire** il file `claude_desktop_config.json` nella cartella `%APPDATA%\Claude\`.
7.  **Avviare Claude Desktop**.

---

## Configurazione Corretta (Backup)
File: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "salesforce-mcp-server": {
      "command": "wsl.exe",
      "args": [
        "docker",
        "exec",
        "-i",
        "mcp-salesforce",
        "python",
        "-m",
        "mcp_salesforce_server.server",
        "--transport=stdio"
      ]
    }
  }
}
```

## Note su Docker (WSL)
*   Se il comando `docker exec` non risponde, provare a ricostruire senza cache: `docker-compose build --no-cache`.
*   Il comando `tail -f /dev/null` nel Dockerfile è essenziale per tenere il container vivo in attesa di connessioni.
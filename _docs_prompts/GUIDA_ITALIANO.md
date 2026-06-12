# Guida all'Installazione e Configurazione (KineticMCP)

Questa guida copre i metodi di installazione per collegare KineticMCP a Claude Desktop.

---

## Metodo 1: Automatico (Consigliato)
*Il metodo più semplice e veloce. Fa tutto da solo.*

### Prerequisiti
*   **Docker Desktop** installato e avviato.
*   **Python** installato.

### Istruzioni
1.  Apri la cartella del progetto nel terminale.
2.  Esegui il comando:
    ```bash
    python install_mcp.py
    ```
3.  Segui le istruzioni a schermo:
    *   Scegli il metodo di autenticazione (es. JWT con certificato).
    *   Quando richiesto, inserisci il percorso della cartella `secrets` o del file `.key`.
    *   **IMPORTANTE:** Alla domanda "Connection Mode", scegli **`[1] Direct Docker Run`**.
4.  Riavvia **Claude Desktop**.

Fatto! Claude ora avvierà automaticamente il server quando necessario.

---

## Metodo 2: Configurazione Aziendale (IT / Server Permanente)
*Consigliato se si vuole mantenere il container sempre acceso o per configurazioni centralizzate.*

### 1. Preparazione
1.  Crea una cartella `secrets` nel progetto e inserisci il file `.key`.
2.  Rinomina `.env.example` in `.env` e compilalo con i tuoi dati (User, ClientID, path key).

### 2. Avvio Container
Esegui da terminale:
```bash
docker-compose up -d --build
```

### 3. Configurazione Claude
Aggiungi manualmente al file config JSON di Claude (`%APPDATA%\Claude\claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "salesforce": {
      "command": "docker",
      "args": [ "exec", "-i", "mcp-salesforce", "python", "-m", "mcp_salesforce_server.server", "--transport=stdio" ]
    }
  }
}
```

---

## Metodo 3: Docker Desktop UI (Alternativo)
*Se non puoi usare Python o preferisci l'interfaccia grafica.*

1.  Fai doppio click su `build.bat`.
2.  Apri **Docker Desktop** -> scheda **MCP Servers**.
3.  Clicca **"Add Server"** -> **"From Docker Image"**.
4.  Nome immagine: `kineticmcp`.
5.  Clicca "Connect".
*(Nota: Potrebbe non funzionare su tutte le versioni di Docker Desktop).*

---

## Monitoraggio e Soluzione Problemi

### Dove sono i Log?
Utilizzando il **Metodo 1 (Direct Docker Run)**, il container Docker è "effimero": nasce quando Claude gli parla e muore subito dopo. Questo significa che comando `docker logs` non mostrerà nulla (o darà errore "container not found").

Per vedere i log e controllare cosa succede (es. errori di connessione):
1.  Apri **Esplora File**.
2.  Nella barra degli indirizzi scrivi: `%APPDATA%\Claude\logs` e premi Invio.
3.  Apri l'ultimo file `mcp.log` (o i file `server-...log`).
    *   Troverai lì tutti i messaggi del server KineticMCP (es. `INFO: Connection successful`).

### Verifica Installazione
Se hai dubbi su quale configurazione sia attiva (es. conflitto con vecchie installazioni WSL/Ubuntu):
*   Claude su Windows legge **SOLO** il file in `%APPDATA%\Claude\claude_desktop_config.json`.
*   Le configurazioni su WSL/Ubuntu sono isolate e invisibili a Claude Desktop per Windows.
*   Per verificare l'immagine Docker in uso, esegui: `docker image inspect kineticmcp --format "{{.Created}}"` (dovrebbe mostrarti una data odierna).

---

## FAQ (Domande Frequenti)

**D: Cosa succede se riavvio Windows/Il PC?**
R: **Niente paura.** L'installazione è permanente.
1.  L'immagine Docker `kineticmcp` è salvata sul disco e sopravvive al riavvio.
2.  La configurazione di Claude è salvata.
3.  Basta che **Docker Desktop** sia in esecuzione (parte in automatico con Windows), e al primo messaggio che mandi a Claude, lui avvierà il container. Non serve reinstallare nulla.

**D: Perché non vedo nessun container "kineticmcp" su Docker Desktop?**
R: È perfettamente normale. Il Metodo 1 usa container "usa e getta" che vivono solo ms. mentre Claude risponde. Non consumano RAM quando non li usi.
Se vuoi verificare che sia tutto installato però, puoi andare nella scheda **"Images"** di Docker Desktop e cercare `kineticmcp`. Se l'immagine c'è, sei a posto.

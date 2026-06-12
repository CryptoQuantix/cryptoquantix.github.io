# Guida Configurazione Salesforce (JWT Flow)

Questa guida spiega passo passo come configurare Salesforce per permettere al server MCP di connettersi utilizzando l'autenticazione sicura JWT (Server-to-Server) senza bisogno di login manuale.

## 1. Generare Certificato e Chiave Privata

Per usare il protocollo JWT, hai bisogno di una coppia di chiavi crittografiche (una privata per il server, una pubblica da caricare su Salesforce).

Apri un terminale (o Git Bash su Windows) ed esegui:

```bash
# 1. Genera la Chiave Privata (server.key)
openssl genrsa -des3 -passout pass:SomePassword -out server.pass.key 2048
openssl rsa -passin pass:SomePassword -in server.pass.key -out server.key

# 2. Genera il Certificato Pubblico (server.crt)
# Ti chiederà alcune info (Paese, Città, ecc.), puoi premere invio o mettere dati fittizi.
openssl req -new -key server.key -out server.csr
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt

# 3. Elimina i file temporanei
rm server.pass.key server.csr
```

Ora dovresti avere due file:
*   `server.key`: **SEGRETO**. Va messo nella cartella `secrets/` del progetto MCP.
*   `server.crt`: PUBBLICO. Va caricato su Salesforce.

---

## 2. Creare la "Connected App" su Salesforce

1.  Accedi a Salesforce come Amministratore.
2.  Vai su **Setup** (ingranaggio in alto a destra).
3.  Nella barra di ricerca a sinistra, scrivi "App Manager" e cliccaci.
4.  Clicca sul pulsante **New Connected App** (in alto a destra).

### Compila i campi base:
*   **Connected App Name**: `MCP Server AI` (o quello che preferisci)
*   **API Name**: `MCP_Server_AI`
*   **Contact Email**: la tua email.

### Abilita le impostazioni API (OAuth):
1.  Spunta la casella **Enable OAuth Settings**.
2.  **Callback URL**: Inserisci `http://localhost:1717/OauthRedirect` (non verrà usato per il JWT, ma è obbligatorio).
3.  Spunta la casella **Use digital signatures**.
4.  Clicca su **Choose File** e carica il file `server.crt` generato prima.
5.  **Selected OAuth Scopes**: Aggiungi i seguenti permessi:
    *   `Manage user data via APIs (api)`
    *   `Think user data via APIs (api)` (se presente)
    *   `Perform requests at any time (refresh_token, offline_access)`
6.  Clicca **Save**.
7.  Clicca **Continue**. (Nota: Ci possono volere 2-10 minuti prima che le modifiche siano attive).

---

## 3. Configurare la Policy "Pre-Approved"

Questo passaggio è **CRUCIALE** per evitare errori di login.

1.  Dalla pagina della tua Connected App appena creata, clicca su **Manage**.
2.  Clicca su **Edit Policies**.
3.  Alla voce **OAuth Policies** -> **Permitted Users**, cambia da "All users may self-authorize" a -> **Admin approved users are pre-authorized**.
4.  Clicca **Save**.

### Assegnare il Profilo/Permesso:
1.  Scorri in basso alla sezione **Profiles** (o Permission Sets).
2.  Clicca **Manage Profiles**.
3.  Seleziona il profilo del tuo utente (es. "System Administrator") e salva.
    *   *Questo dice a Salesforce: "Chiunque abbia il profilo Admin può usare questa app senza che gli venga chiesto il permesso ogni volta".*

---

## 4. Recuperare le Credenziali

Torna alla pagina della Connected App (App Manager -> View):
1.  Copia il **Consumer Key** (a volte chiamato "Client ID").
2.  Questa stringa va inserita nel file `.env` del tuo progetto alla voce `SF_CONSUMER_KEY`.

## Riepilogo File .env

```env
SF_USER=tua_email_salesforce@example.com
SF_CONSUMER_KEY=INCOLLA_QUI_LA_CONSUMER_KEY
SF_PRIVATE_KEY_PATH=secrets/server.key
SF_LOGIN_URL=https://test.salesforce.com  (usa login.salesforce.com per Produzione)
```

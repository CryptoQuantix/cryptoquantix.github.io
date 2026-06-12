# 🎬 Video Script: The CFO Report (Advanced Export)

**Obiettivo Demo**: Mostrare capacità di calcolo e formattazione che vanno oltre la semplice "lettura" di dati.

---

## 🔹 Fase 1: Il Setup (Dietro le quinte)
*Fallo prima di iniziare a registrare.*

1.  Seeding (Prompt):
    ```text
    Usa KineticMCP per generare dati finanziari.
    1. Crea 2 Opportunity "Closed Won" da 100.000€ (Settore Banking).
    2. Crea 3 Opportunity "Closed Won" da 20.000€ (Settore Retail).
    3. Assicurati che le CloseDate siano di questo mese.
    ```

---

## 🎥 Fase 2: Azione! (La Registrazione)

### Scena 1: Il Problema ("Before")
*   **Inquadratura**: Salesforce Report Builder (o una lista view confusa).
*   **Narratore**: "Il CFO vuole un report delle commissioni di vendita. Ma le commissioni non sono su Salesforce, sono calcolate: 10% per il Banking, 5% per il Retail. Di solito, devo scaricare 2 report diversi, aprire Excel, fare VLOOKUP, applicare le formule... 40 minuti di lavoro noioso."

### Scena 2: L'Agente al Lavoro
*   **Inquadratura**: Claude Desktop.
*   **Narratore**: "Chiediamolo direttamente all'Agente, dandogli le regole di calcolo."
*   **Azione**: Prompt:

    ```text
    Estrai tutte le opportunità vinte questo mese.
    
    Genera un file CSV pronto per Excel con queste colonne:
    - Nome Opp
    - Cliente
    - Amount (€)
    - Settore
    - **Commissione Calcolata** (Regola: Se Settore=Banking -> 10%, Altrimenti 5%)
    - Net Revenue (Amount - Commissione)
    
    Formatta come blocco codice CSV.
    ```

### Scena 3: Il Risultato ("After")
*   **Inquadratura**: Claude.
*   **Visual**: Mostra il blocco di codice CSV generato. Se possibile, copialo e incollalo in un Excel "live" per far vedere che le colonne combaciano.
*   **Narratore**: "Ecco fatto. L'AI ha fatto le Join tra tabelle, ha applicato la logica di business (le percentuali) e mi ha dato il file finito. 40 minuti diventati 10 secondi."

---

## 💼 Valore per l'Azienda (Talking Points)
*   **Agilità Operativa**: I dati servono *ora*, non domani dopo che l'analista ha tempo.
*   **Logica On-the-Fly**: Puoi applicare regole di calcolo temporanee senza dover modificare la configurazione di Salesforce (niente nuovi campi formula inutili).
*   **Ultimo Miglio**: Copre quel gap tra "Dato nel database" e "Decisione del manager".

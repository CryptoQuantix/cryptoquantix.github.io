# 🎬 Video Script: Intelligent Support Triage

**Obiettivo Demo**: Mostrare come l'AI gestisce un'inondazione di ticket di supporto ("Il Vigile Urbano Digitale").

---

## 🔹 Fase 1: Il Setup (Dietro le quinte)
*Fallo prima di iniziare a registrare.*

1.  Copia il prompt di seeding in Claude.

    ```text
    Usa KineticMCP per creare 6 Case di supporto.
    Tutti devono avere Priority="Medium" (default) e Origin="Email".
    
    1. Subject: "Server Production Down", Desc: "Tutti i sistemi bloccati, perdita dati." (Critico)
    2. Subject: "Reset Password", Desc: "Ho dimenticato la password." (Basso)
    3. Subject: "Errore API 500", Desc: "Il checkout non funziona per i clienti." (Critico)
    4. Subject: "Info fattura", Desc: "Dove trovo il PDF?" (Basso)
    5. Subject: "Feature Request", Desc: "Vorrei il tema scuro." (Basso)
    6. Subject: "Lentezza dashboard", Desc: "Ci mette 30 secondi a caricare." (Medio)
    ```

2.  Vai su Salesforce -> Tab **Cases**.
3.  Imposta la vista "All Open Cases" e assicurati che la colonna **Priority** sia visibile. Noterai che è tutto piatto (tutto Medium/Default).

---

## 🎥 Fase 2: Azione! (La Registrazione)

### Scena 1: Il Problema ("Before")
*   **Inquadratura**: Salesforce, vista Cases.
*   **Narratore**: "Lunedì mattina. Il supporto apre il CRM è vede questo. Tutto ha la stessa priorità. Un 'Reset Password' è mescolato con un 'Server Down'. Se l'agente inizia dal ticket sbagliato, perdiamo clienti."

### Scena 2: L'Agente al Lavoro
*   **Inquadratura**: Claude Desktop.
*   **Narratore**: "Attiviamo il Triage Intelligente. L'AI legge il contenuto, capisce l'urgenza e agisce."
*   **Azione**: Incolla il prompt:

    ```text
    Analizza i Case aperti. 
    Leggi Subject e Description per capire la VERA urgenza.
    
    1. Se il sistema è fermo o impatta i soldi -> Imposta Priority="High" e Status="Escalated".
    2. Se è una richiesta info routinaria -> Imposta Priority="Low".
    3. Per i casi High, aggiungi un Commento interno: "TRIAGE: Assegnato all'Engineering immediatamente."
    ```

### Scena 3: Il Risultato ("After")
*   **Inquadratura**: Salesforce.
*   **Azione**: Refresh della pagina.
*   **Visual**:
    *   Le Priorità sono cambiate: vedi rosso (High) e verde (Low).
    *   Clicca sul caso "Server Down": mostra che c'è il commento automatico di escalation.
*   **Narratore**: "In tempo reale, la coda è stata riordinata. I problemi critici sono in cima. Il supporto sa esattamente cosa fare."

---

## 💼 Valore per l'Azienda (Talking Points)
*   **SLA Compliance**: Rispondere ai problemi critici entro minuti, non ore.
*   **Automazione Intelligente**: Non servono regole rigide (keyword matching), l'AI capisce il contesto ("Il checkout non va" = Soldi persi = Urgente).
*   **Customer Trust**: Il cliente col server fermo riceve attenzione immediata.

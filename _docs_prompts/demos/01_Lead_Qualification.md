# 🎬 Video Script: Automated Lead Qualification

**Obiettivo Demo**: Mostrare come KineticMCP trasforma dati grezzi in opportunità pulite senza intervento umano.

---

## 🔹 Fase 1: Il Setup (Dietro le quinte)
*Fallo prima di iniziare a registrare.*

1.  Copia questo prompt in Claude per generare i dati "sporchi".
    
    ```text
    Usa KineticMCP per generare 10 nuovi Lead.
    Immagina che vengano da una fiera "TechSummit Milan 2024".
    
    Regole dati:
    1. Aziende: Tech fittizie (es. "Nebula AI", "Quantum Soft").
    2. Email:
       - 4 con email personali (@gmail.com, @libero.it).
       - 6 con email aziendali corrette.
    3. Phone: 3 senza numero di telefono.
    4. Description: In tutti scrivi "Incontrato allo stand TechSummit, interessato alla demo".
    
    Procedi.
    ```

2.  Vai su Salesforce -> Tab **Leads**.
3.  Crea una "List View" chiamata "Oggi" per vedere solo i lead creati oggi.

---

## 🎥 Fase 2: Azione! (La Registrazione)

### Scena 1: Il Problema ("Before")
*   **Inquadratura**: Salesforce, Tab Leads. Mostra la lista appena creata.
*   **Narratore**: "Ecco la situazione classica post-evento. Abbiamo decine di lead, ma è un disastro. Email gmail, numeri mancanti... I venditori odiano questa lista di 'spazzatura'."
*   **Azione**: Evidenzia col mouse un lead con email `@gmail.com` e status "Open - Not Contacted".

### Scena 2: L'Agente al Lavoro
*   **Inquadratura**: Spostati su Claude Desktop.
*   **Narratore**: "Invece di pulirli a mano, chiediamo al nostro Agente di fare il lavoro sporco."
*   **Azione**: Incolla questo prompt:

    ```text
    Agisci come un Sales Operations Manager.
    
    1. Cerca su Salesforce i Lead del "TechSummit".
    2. Esegui queste regole di pulizia:
       - Se l'email è personale (gmail, libero, yahoo), imposta Status="Unqualified" e scrivi nella descrizione: "DQ: Email personale".
       - Se manca il telefono, imposta Rating="Cold".
       - Se è un'azienda tech con email aziendale, imposta Rating="Hot".
       
    3. Dammi un report finale.
    ```

### Scena 3: Il Risultato ("After")
*   **Inquadratura**: Torna su Salesforce.
*   **Azione**: Clicca il tasto **Aggiorna (Refresh)** della lista.
*   **Narratore**: "Guardate qui. In pochi secondi..."
*   **Visual**:
    *   Mostra che i lead `@gmail` sono diventati **Unqualified** (magari evidenziando il cambio di status).
    *   Mostra che i lead buoni sono diventati **Hot**.
*   **Chiusura**: "Abbiamo risparmiato 2 ore di data entry e i venditori ora chiamano solo chi è pronto a comprare."

---

## 💼 Valore per l'Azienda (Talking Points)
*   **Velocità**: Da "Lead generato" a "Lead contattabile" in secondi, non giorni.
*   **Qualità**: Regole semantiche (es. riconoscere un'email personale) che i vecchi sistemi basati su "regole if/then" fallivano.
*   **Morale Sales**: I venditori smettono di fare data entry e iniziano a vendere.

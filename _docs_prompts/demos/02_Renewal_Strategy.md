# 🎬 Video Script: Smart Renewal Strategy

**Obiettivo Demo**: Dimostrare come l'AI anticipa il *churn* leggendo tra le righe delle note commerciali.

---

## 🔹 Fase 1: Il Setup (Dietro le quinte)
*Fallo prima di iniziare a registrare.*

1.  Copia questo prompt in Claude per generare le opportunità in scadenza.

    ```text
    Usa KineticMCP per generare 5 Opportunità di tipo "Rinnovo".
    Close Date: Mese prossimo.
    Stage: "Needs Analysis".
    
    Crea 5 Account diversi con queste note specifiche nell'Opportunity Description:
    1. "Cliente felice, crescita utenti del 20%."
    2. "Cliente lamenta bug critico aperto da 3 settimane, minaccia addio."
    3. "Budget tagliato dal CFO, chiedono sconto."
    4. "Nessun contatto recente, sponsor cambiato."
    5. "Cliente strategico, vuole espandere in Francia."
    ```

2.  Vai su Salesforce -> Tab **Opportunities**.
3.  Crea una List View "Rinnovi Prossimo Mese".

---

## 🎥 Fase 2: Azione! (La Registrazione)

### Scena 1: Il Problema ("Before")
*   **Inquadratura**: Salesforce, vista Opportunità.
*   **Narratore**: "Siamo a fine trimestre. Abbiamo 5 rinnovi critici. Chi chiamiamo prima? Guardando questa lista piatta, sembrano tutti uguali. Dovrei aprire ogni singola opportunità e leggere le note una per una."

### Scena 2: L'Agente al Lavoro
*   **Inquadratura**: Claude Desktop.
*   **Narratore**: "Chiediamo all'Agente di fare l'Account Manager per noi."
*   **Azione**: Incolla il prompt:

    ```text
    Analizza tutte le opportunità di rinnovo del prossimo mese.
    Leggi le descrizioni/note e:
    1. Assegna una priorità (Alta/Media/Bassa) basata sul rischio di abbandono.
    2. Aggiorna il campo "NextStep" su Salesforce con la strategia consigliata.
    3. Scrivimi qui in chat la bozza della mail per il cliente più a rischio ("Cliente lamenta bug").
    ```

### Scena 3: Il Risultato ("After")
*   **Inquadratura**: Salesforce.
*   **Azione**: Refresh della pagina.
*   **Visual**: Mostra la colonna **Next Step** popolata magicamente con frasi come "Urgent: Fix Bug & Call CTO", "Upsell: Propose Global Plan".
*   **Inquadratura**: Torna su Claude.
*   **Narratore**: "E guardate qui... ha persino scritto l'email di scuse per il cliente arrabbiato, citando esattamente il problema dei bug. È pronta per l'invio."

---

## 💼 Valore per l'Azienda (Talking Points)
*   **Revenue Protection**: Identifica i clienti a rischio *prima* che mandino la disdetta.
*   **Analisi Qualitativa**: L'unico modo per fare query su dati non strutturati ("cerca chi è arrabbiato").
*   **Efficienza**: 1 minuto per analizzare 50 contratti, invece di 4 ore di riunioni.

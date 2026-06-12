# 🎬 Video Script: Global Churn Intelligence

**Obiettivo Demo**: Trasformare le scuse per cui i clienti dicono "No" in roadmap di prodotto.

---

## 🔹 Fase 1: Il Setup (Dietro le quinte)
*Fallo prima di iniziare a registrare.*

1.  Copia questo prompt per creare le opportunità perse.

    ```text
    Usa KineticMCP per creare 6 Opportunità "Closed Lost" in Germania.
    Industria: Automotive.
    
    Nelle descrizioni (Loss Reason) usa variazioni di questi temi:
    - 3 casi: "Il prodotto manca dell'integrazione SAP" / "Serve connettore SAP nativo".
    - 2 casi: "Troppo costoso rispetto al competitor locale".
    - 1 caso: "Mancanza di supporto in lingua tedesca".
    ```

2.  Vai su Salesforce -> Tab **Opportunities**.
3.  Filtra per Stage = Closed Lost.

---

## 🎥 Fase 2: Azione! (La Registrazione)

### Scena 1: Il Problema ("Before")
*   **Inquadratura**: Salesforce Report (Pie Chart generico).
*   **Narratore**: "Il Direttore Vendite Germania è preoccupato. Perdiamo il 60% dei deal. Il CRM ci dice solo 'Closed Lost', ma non ci dice *perché* a livello aggregato. Dovremmo leggere 50 note diverse."

### Scena 2: L'Agente al Lavoro
*   **Inquadratura**: Claude Desktop.
*   **Narratore**: "Chiediamo all'Agente di agire come Product Manager e trovare i pattern ricorrenti."
*   **Azione**: Incolla il prompt:

    ```text
    Analizza tutte le opportunità perse nel settore Automotive in Germania.
    Leggi le motivazioni nelle note.
    
    1. Identifica il motivo n#1 di perdita ricorrente.
    2. Quantifica quanti soldi abbiamo perso esattamente per questo motivo specifico (somma gli Amount).
    3. Scrivi un memo per il VP of Product suggerendo la feature da sviluppare.
    ```

### Scena 3: Il Risultato ("After")
*   **Inquadratura**: Claude.
*   **Visual**: La risposta dell'IA è chiarissima.
    *   **Motivo**: "Mancanza Integrazione SAP".
    *   **Impatto**: "Abbiamo perso €450k questo trimestre".
    *   **Memo**: "Sviluppare connettore SAP è prioritario. ROI immediato."
*   **Narratore**: "Ecco fatto. Non è servito un sondaggio di mercato. I dati erano già lì, bastava qualcuno in grado di leggerli e collegare i puntini."

---

## 💼 Valore per l'Azienda (Talking Points)
*   **Voice of Customer**: Ascolto reale del mercato basato sui dati di vendita, non sulle opinioni.
*   **Prioritizzazione R&D**: Sviluppare feature che hanno un ROI calcolabile *prima* di scrivere codice.
*   **Feedback Loop**: Il Sales parla, il CRM registra, l'AI analizza, il Product costruisce.

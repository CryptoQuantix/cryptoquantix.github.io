z# Analisi di Scalabilità e Costi API (Salesforce MCP Server)

Questo documento analizza la capacità dell'architettura attuale di sostenere carichi di lavoro enterprise e stima il consumo di chiamate API Salesforce.

---

## 1. Analisi Architetturale (Scalabilità Tecnica)

### Architettura Attuale (Docker Container Singolo)
Attualmente, il server MCP gira come un singolo processo Python (`uvicorn` / `FastMCP`) dentro un container.

*   **Gestione Concorrenza:** FastMCP (basato su Starlette/Uvicorn) è asincrono. Può gestire molte richieste HTTP "leggere" (tipo `sf_query` veloci) contemporaneamente.
*   **Collo di Bottiglia:** Il collo di bottiglia reale non è il server Python, ma **l'infrastruttura sottostante**.
    *   **CPU:** La serializzazione di grandi JSON (es. query da 2000 record) consuma CPU.
    *   **Memoria:** Se 50 utenti chiedono contemporaneamente query pesanti, la RAM del container può saturarsi.

### Stima Utenti Concorrenti (Singolo Container)
Per un container standard (e.g., 2 vCPU, 4GB RAM):

*   **Utenti Totali Supportati:** ~50-100 utenti nominali.
*   **Utenti Attivi Simultanei (Che premono invio nello stesso secondo):** ~10-15.

**Verdetto:** L'architettura attuale va bene per PoC, team dipartimentali o PMI.
**Per Enterprise (1000+ utenti):** L'architettura deve evolvere in un **Cluster Kubernetes** con load balancer che distribuisce le richieste su *N* repliche del container MCP. Essendo il server "stateless" (non salva nulla in memoria tra una chiamata e l'altra), scalare orizzontalmente è banale (si lanciano 10 container invece di 1).

---

## 2. Analisi Consumo API Salesforce

Ogni volta che l'AI "pensa" e agisce, consuma chiamate API Salesforce. Questo è il vero costo "invisibile".

### Modello di "Utilizzo Intensivo" (Agente AI)
Un essere umano fa poche operazioni complesse. Un agente AI ne fa tante semplici e veloci.
Stimiamo una "Sessione di Lavoro" tipica (es. "Analizza questo account e crea un preventivo"):

1.  `sf_describe` (metadata): 1 call (spesso cachata).
2.  `sf_query` (cerca account): 1 call.
3.  `sf_query` (cerca contatti): 1 call.
4.  `sf_query` (cerca prodotti a listino): 1 call.
5.  `sf_create` (crea opportunity): 1 call.
6.  `sf_create` (crea quote): 1 call.
7.  `sf_create` (crea righe): 1 call.

**Totale per "Task":** ~7-10 chiamate API.
Assumiamo che un utente "Intensivo" chieda all'AI di fare 20 task complessi al giorno.
**Consumo Giornaliero per Utente:** 200 chiamate API.

---

### Scenario A: 100 Utenti
*   **Chiamate Giornaliere:** 100 utenti * 200 chiamate = **20.000 chiamate/giorno**.
*   **Chiamate Mensili (20 gg lavorativi):** 20.000 * 20 = **400.000 chiamate/mese**.

**Impatto sui Limiti Salesforce:**
Un'org Salesforce Enterprise ha tipicamente un limite base di **100.000 + (Utenti * 1.000)** chiamate ogni 24 ore.
Per 100 utenti, il limite è ~200.000 chiamate/24h.
**Consumo previsto (20.000) vs Limite (200.000):** ✅ **Nessun problema.** Siamo al 10% del totale.

---

### Scenario B: 1.000 Utenti (Enterprise Scale)
*   **Chiamate Giornaliere:** 1.000 utenti * 200 chiamate = **200.000 chiamate/giorno**.
*   **Chiamate Mensili:** 200.000 * 20 = **4.000.000 chiamate/mese**.

**Impatto sui Limiti Salesforce:**
Limite stimato per 1.000 utenti = 100.000 + 1.000.000 = **1.100.000 chiamate/24h**.
**Consumo previsto (200.000) vs Limite (1.100.000):** ✅ **Nessun problema.** Siamo sotto il 20%.

**Attenzione ai Picchi:**
Se tutti i 1.000 utenti lanciano un processo "Bulk" (es. analisi massiva) alle 9:00 del mattino, si potrebbe rischiare il "Concurrent Request Limit" (che è diverso dal limite giornaliero).
**Soluzione:** Il server MCP dovrebbe implementare una coda (Queue) interna per le richieste non urgenti.

---

## 3. Costi Infrastrutturali (Stima)

Non parliamo di licenze Salesforce, ma del costo per far girare il "Salesforce MCP Server".

### Per 100 Utenti (Piccolo Server)
*   1 Istanza EC2 (AWS) o VPS: t3.medium (2 vCPU, 4GB RAM).
*   Costo: ~**40-50 €/mese**.

### Per 1.000 Utenti (Cluster HA)
*   3 Istanze t3.large in Load Balancing.
*   Database Redis per caching metadata (essenziale per risparmiare API).
*   Costo: ~**300-500 €/mese**.

---

## 4. Conclusioni

1.  **L'architettura attuale è solida** ma per >100 utenti simultanei va dockerizzata in un cluster (Kubernetes/ECS).
2.  **I limiti API di Salesforce NON sono un problema** per l'uso "umano aumentato" (Chat con l'AI). Diventano un problema solo se si usano agenti autonomi che girano 24/7 in background (bot massivi).
3.  **Il costo infrastrutturale è irrisorio** rispetto al valore del tempo risparmiato (pochi centesimi per utente/mese).

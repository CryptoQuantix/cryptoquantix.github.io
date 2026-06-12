# Zirelia — Official Website

### Autonomous AI Virtual Influencer Engine

Questo repository ospita il codice sorgente del sito ufficiale [zirelia.github.io](https://zirelia.github.io), costruito con **Jekyll** e deployato su GitHub Pages. Il sito funge da portale principale per il progetto Zirelia: marketing, documentazione e blog.

---

## Tech Stack & Struttura

Il sito utilizza Jekyll con un'architettura modulare per garantire velocità (static site) e facilità di aggiornamento:

- **Jekyll 4.3.4** — Generazione del sito statico
- **Tailwind CSS** (via CDN) — Utility-first styling
- **Bootstrap 5** — Componenti UI aggiuntivi
- **Space Grotesk + Inter** — Font system
- **jekyll_picture_tag** — Ottimizzazione immagini responsive
- **SEO avanzato** — `_includes/seo.html`, Open Graph, Twitter Card, sitemap

### Struttura cartelle:

```
zirelia.github.io/
├── _includes/        # Componenti riutilizzabili (nav, footer, popup, seo)
├── _layouts/         # Template pagine
├── _posts/           # Blog post (bilingue EN/IT)
├── assets/           # CSS, JS, immagini, loghi
├── en/               # Versione inglese (index, features, pricing, docs, legal)
├── it/               # Versione italiana (stessa struttura)
├── hero.html         # Pagina hero standalone (screenshot/branding)
└── _config.yml       # Configurazione Jekyll
```

---

## Sviluppo Locale

### Prerequisiti
- Ruby & Bundler **oppure** Docker

### Con Bundler:

```bash
git clone https://github.com/zirelia/zirelia.github.io.git
cd zirelia.github.io
bundle install
bundle exec jekyll serve --livereload
# → http://localhost:4000
```

### Con Docker (consigliato):

```bash
docker compose up
# → http://localhost:4000 con livereload attivo
```

---

## Workflow Git

```bash
git pull origin main                     # Sincronizza
git add <file>                           # Aggiungi modifiche specifiche
git commit -m "Edit: [Descrizione]"
git push origin main                     # Deploy automatico su GitHub Pages
```

---

## Roadmap & Stato del Progetto

- [x] Setup Jekyll — architettura base
- [x] SEO & Performance — meta tags, sitemap, Open Graph
- [x] Struttura bilingue EN/IT
- [x] Blog — casi d'uso pubblicati
- [x] Pagine legali — Terms, Privacy Policy, DPA (aggiornate per Zirelia)
- [x] Logo — sostituito emoji con immagini logo in tutte le pagine
- [x] Popup CTA — fix JS conflict, mobile close, trigger timing
- [x] CNAME — aggiornato a zirelia.github.io
- [ ] Demo video — virtual influencer in azione
- [ ] Partner section — area dedicata ai partner

---

## Sicurezza & Compliance

- **Zero Data Retention** — il software è self-hosted, nessun dato transita per server dell'autore
- **Stateless Architecture** — documentata nella Privacy Policy e nel DPA
- **GDPR compliant** — cookie consent, diritti utente, contatti DPO
- **AI Disclaimer** — nei Terms of Service (allucinazioni, contenuti sintetici, platform ToS)
- **Giurisdizione** — Legge italiana, Foro di Milano

---

## todo

- Aggiungere al post di sienna qualche foto o embed pagina


Zirelia — *Define a persona. Zirelia does the rest — 24/7.*

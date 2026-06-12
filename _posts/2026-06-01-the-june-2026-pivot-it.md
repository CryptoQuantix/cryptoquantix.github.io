---
layout: default
title: "Il Ribaltamento del Giugno 2026: Abbandonare l'Orderflow Intraday"
description: "Perché abbiamo archiviato 4 anni di ricerca intraday per concentrarci puramente sul trading quantitativo basato su macro-regimi."
lang: it
date: 2026-06-01 10:00:00 +0000
image: "/assets/images/logo/logo-transparent.png"
categories: research
---

<article class="py-32 px-6 bg-white dark:bg-brand-dark min-h-screen transition-colors">
    <div class="max-w-3xl mx-auto">
        <header class="mb-12">
            <div class="text-brand-purple font-bold mb-4">{{ page.date | date: "%d %B %Y" }}</div>
            <h1 class="text-4xl md:text-5xl font-black font-display text-gray-900 dark:text-white mb-6">{{ page.title }}</h1>
            <p class="text-xl text-gray-500">{{ page.description }}</p>
        </header>

        <div class="prose prose-lg dark:prose-invert prose-purple max-w-none text-gray-700 dark:text-gray-300">
            <p>
                Per i primi tre anni del progetto CryptoQuantix, il nostro focus principale è stato l'orderflow intraday. Abbiamo costruito sistemi complessi per tracciare footprint chart, squilibri dell'order book e sweep di liquidità in tempo reale. La nostra tesi era semplice: più sei vicino al dato, maggiore è il tuo vantaggio (edge).
            </p>
            <p>
                <strong>Ci sbagliavamo.</strong>
            </p>
            <p>
                A giugno 2026, abbiamo concluso un massiccio processo di validazione multi-ciclo che ha coperto quattro anni di dati di mercato (giugno 2022 – giugno 2026). I risultati sono stati illuminanti. Sebbene alcune strategie intraday performassero eccezionalmente bene durante specifici regimi (come il mercato laterale a bassa volatilità del 2023), le loro performance si deterioravano in modo significativo al mutare del regime macro.
            </p>
            
            <h2 class="text-gray-900 dark:text-white mt-12">La Morte dell'Edge</h2>
            <p>
                Strategie come <em>Volume Breakout</em>, <em>Mean Reversion</em>, e <em>Liquidity Squeeze</em> non sono riuscite a mantenere un Profit Factor superiore alla nostra rigorosa soglia di 1.2 attraverso i diversi cicli. I costi di transazione (0.20% roundtrip) e il rumore intrinseco del timeframe a 1 minuto hanno eroso l'alpha teorico.
            </p>
            
            <h2 class="text-gray-900 dark:text-white mt-12">Il Pivot verso i Macro-Regimi</h2>
            <p>
                Invece di cercare di fare curve-fitting sui parametri intraday, abbiamo preso la difficile decisione di archiviare tutto. Abbiamo allargato l'orizzonte. Abbiamo iniziato ad analizzare la struttura del mercato su timeframe giornalieri e settimanali, filtrando il rumore.
            </p>
            <p>
                Questo ha portato alla nascita delle nostre attuali strategie attive:
            </p>
            <ul>
                <li><strong>Macro Core:</strong> Una pura strategia trend-following governata dalla media mobile a 200 giorni.</li>
                <li><strong>Trend Breakdown:</strong> Un sistema che trada breakout long nei mercati toro e breakdown short nei mercati orso.</li>
                <li><strong>Funding Squeeze:</strong> Un approccio contrarian che cattura eventi di capitolazione in deep-bear basati su tassi di funding perpetui estremi.</li>
            </ul>
            <p>
                Tradando meno frequentemente e mantenendo le posizioni più a lungo (es. 7 giorni per Trend Breakdown), abbiamo drasticamente ridotto l'impatto delle commissioni e dello slippage, ottenendo una curva di equity molto più robusta e sostenibile.
            </p>
        </div>
    </div>
</article>

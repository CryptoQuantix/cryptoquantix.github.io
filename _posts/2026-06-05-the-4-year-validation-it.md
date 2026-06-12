---
layout: default
title: "Validazione 4 Anni: Risultati del Backtest Multi-Ciclo"
description: "Un'analisi approfondita delle performance delle nostre 3 strategie core attraverso mercati toro, orso e laterali dal 2022 al 2026."
lang: it
date: 2026-06-05 10:00:00 +0000
image: "/assets/images/logo/logo-transparent.png"
categories: performance
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
                Nel trading quantitativo, i backtest sono notoriamente inclini all'overfitting. È incredibilmente facile costruire una strategia che stampa soldi in un backtest ottimizzando i parametri per uno specifico periodo storico, per poi vederla sanguinare capitale nel trading live.
            </p>
            <p>
                Per combattere questo fenomeno, la pipeline di validazione di CryptoQuantix è spietata.
            </p>
            
            <h2 class="text-gray-900 dark:text-white mt-12">L'Ambiente di Test</h2>
            <ul>
                <li><strong>Dataset:</strong> Da Giugno 2022 a Giugno 2026 (4 anni completi).</li>
                <li><strong>Asset:</strong> Futures perpetual su BTCUSDT e ETHUSDT.</li>
                <li><strong>Timeframe:</strong> Kline a 1 minuto per una simulazione accurata dell'esecuzione.</li>
                <li><strong>Costi:</strong> 0.20% roundtrip per trade (slippage + fee).</li>
                <li><strong>Motore:</strong> Codice di produzione reale, non un backtest vettoriale semplificato.</li>
            </ul>
            
            <h2 class="text-gray-900 dark:text-white mt-12">Strategia 1: Macro Core (Solo BTC)</h2>
            <p>
                La strategia Macro Core è il nostro motore puro di trend-following. Rimane long finché il prezzo è al di sopra della SMA a 200 giorni, ed esce usando un trailing stop Chandelier basato su 5x ATR(20d).
            </p>
            <ul>
                <li><strong>Performance:</strong> +315% in 4 anni.</li>
                <li><strong>Max Drawdown:</strong> 24.7%.</li>
                <li><strong>Benchmark:</strong> Il Buy & Hold su BTC ha reso il +136% nello stesso periodo.</li>
            </ul>
            <p>
                <em>Nota: Questa strategia è stata scartata per ETH, in quanto non ha superato la soglia minima di Profit Factor di 1.2.</em>
            </p>

            <h2 class="text-gray-900 dark:text-white mt-12">Strategia 2: Trend Breakdown</h2>
            <p>
                Questa strategia inverte la sua logica in base al regime macro. In un mercato orso (prezzo < SMA200d), va short sul breakdown del minimo a 48 ore. In un mercato toro, va long sul breakout del massimo a 7 giorni. Non c'è take profit; le posizioni vengono mantenute esattamente per 7 giorni.
            </p>
            <ul>
                <li><strong>Lato Short:</strong> +22 bps per trade, Profit Factor 1.26 (123 trade).</li>
                <li><strong>Lato Long:</strong> +68 bps per trade, Profit Factor 1.53 (84 trade).</li>
            </ul>

            <h2 class="text-gray-900 dark:text-white mt-12">Strategia 3: Funding Squeeze</h2>
            <p>
                Una strategia contrarian che identifica la capitolazione in fase deep-bear. Va short quando il tasso di funding dei perpetual tocca il suo limite massimo mentre la SMA a 200 giorni è in discesa.
            </p>
            <ul>
                <li><strong>Profit Factor BTC:</strong> 2.65</li>
                <li><strong>Profit Factor ETH:</strong> 1.82</li>
            </ul>
            <p>
                Si tratta di un setup molto raro (solo 15 trade scattati in 4 anni), ma la win rate e il rapporto rischio-rendimento sono eccezionalmente alti.
            </p>

            <div class="bg-gray-50 dark:bg-brand-surface p-8 rounded-2xl border border-gray-100 dark:border-white/10 mt-12 transition-colors">
                <h3 class="text-gray-900 dark:text-white mt-0 mb-4">Aggregazione di Portafoglio</h3>
                <p class="mb-0">
                    Quando combinate in un singolo portafoglio con il nostro dimensionamento a 3 fattori e un cap di esposizione lorda a 1.5x, la curva di equity simulata ha generato un <strong>+491% in 4 anni</strong>, con un max drawdown del 21.5% e un indice di Calmar di 2.61. L'anno peggiore ha registrato un ritorno nullo (0%).
                </p>
            </div>
        </div>
    </div>
</article>

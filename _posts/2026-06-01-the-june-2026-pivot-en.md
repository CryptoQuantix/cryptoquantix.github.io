---
layout: default
title: "The June 2026 Pivot: Abandoning Intraday Orderflow"
description: "Why we archived 4 years of intraday research to focus purely on macro-regime quantitative trading."
lang: en
date: 2026-06-01 10:00:00 +0000
image: "/assets/images/logo/logo-transparent.png"
categories: research
---

<article class="py-32 px-6 bg-white dark:bg-brand-dark min-h-screen transition-colors">
    <div class="max-w-3xl mx-auto">
        <header class="mb-12">
            <div class="text-brand-purple font-bold mb-4">{{ page.date | date: "%B %d, %Y" }}</div>
            <h1 class="text-4xl md:text-5xl font-black font-display text-gray-900 dark:text-white mb-6">{{ page.title }}</h1>
            <p class="text-xl text-gray-500">{{ page.description }}</p>
        </header>

        <div class="prose prose-lg dark:prose-invert prose-purple max-w-none text-gray-700 dark:text-gray-300">
            <p>
                For the first three years of the CryptoQuantix project, our primary focus was intraday orderflow. We built complex systems to track footprint charts, order book imbalances, and liquidity sweeps in real-time. Our thesis was simple: the closer you are to the data, the larger the edge.
            </p>
            <p>
                <strong>We were wrong.</strong>
            </p>
            <p>
                In June 2026, we concluded a massive multi-cycle validation process spanning four years of market data (June 2022 – June 2026). The results were eye-opening. While some intraday strategies performed exceptionally well during specific market regimes (like the low-volatility chop of 2023), their performance deteriorated significantly when the macro regime shifted.
            </p>
            
            <h2 class="text-gray-900 dark:text-white mt-12">The Death of the Edge</h2>
            <p>
                Strategies such as <em>Volume Breakout</em>, <em>Mean Reversion</em>, and <em>Liquidity Squeeze</em> failed to maintain a Profit Factor above our strict 1.2 threshold across different cycles. The transaction costs (0.20% roundtrip) and the inherent noise of the 1-minute timeframe ate away the theoretical alpha.
            </p>
            
            <h2 class="text-gray-900 dark:text-white mt-12">The Pivot to Macro-Regimes</h2>
            <p>
                Instead of trying to curve-fit the intraday parameters, we made the hard decision to archive them all. We zoomed out. We began looking at market structure on daily and weekly timeframes, filtering the noise.
            </p>
            <p>
                This led to the birth of our current active strategies:
            </p>
            <ul>
                <li><strong>Macro Core:</strong> A pure trend-following strategy governed by the 200-day moving average.</li>
                <li><strong>Trend Breakdown:</strong> A system that trades long breakouts in bull markets and short breakdowns in bear markets.</li>
                <li><strong>Funding Squeeze:</strong> A contrarian approach that captures deep-bear capitulation events based on extreme perpetual funding rates.</li>
            </ul>
            <p>
                By trading less frequently and holding positions longer (e.g., 7 days for Trend Breakdown), we drastically reduced the impact of transaction fees and slippage, resulting in a much more robust and sustainable equity curve.
            </p>
        </div>
    </div>
</article>

---
layout: default
title: "The 4-Year Validation: Multi-Cycle Backtest Results"
description: "A deep dive into the performance of our 3 core strategies across bull, bear, and chop markets from 2022 to 2026."
lang: en
date: 2026-06-05 10:00:00 +0000
image: "/assets/images/logo/logo-transparent.png"
categories: performance
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
                In quantitative trading, backtests are notoriously prone to overfitting. It's incredibly easy to build a strategy that prints money in a backtest by optimizing parameters for a specific historical period, only to watch it bleed capital in live trading.
            </p>
            <p>
                To combat this, the CryptoQuantix validation pipeline is ruthless.
            </p>
            
            <h2 class="text-gray-900 dark:text-white mt-12">The Testing Environment</h2>
            <ul>
                <li><strong>Dataset:</strong> June 2022 to June 2026 (4 full years).</li>
                <li><strong>Assets:</strong> BTCUSDT and ETHUSDT perpetual futures.</li>
                <li><strong>Timeframe:</strong> 1-minute klines for precise execution simulation.</li>
                <li><strong>Costs:</strong> 0.20% roundtrip per trade (slippage + fees).</li>
                <li><strong>Engine:</strong> Actual production code, not a simplified vector backtest.</li>
            </ul>
            
            <h2 class="text-gray-900 dark:text-white mt-12">Strategy 1: Macro Core (BTC Only)</h2>
            <p>
                The Macro Core strategy is our pure trend-following engine. It stays long as long as the price is above the 200-day SMA, and exits using a trailing Chandelier stop based on 5x ATR(20d).
            </p>
            <ul>
                <li><strong>Performance:</strong> +315% over 4 years.</li>
                <li><strong>Max Drawdown:</strong> 24.7%.</li>
                <li><strong>Benchmark:</strong> Buy & Hold BTC returned +136% in the same period.</li>
            </ul>
            <p>
                <em>Note: This strategy was rejected for ETH, as it failed to meet the 1.2 Profit Factor threshold.</em>
            </p>

            <h2 class="text-gray-900 dark:text-white mt-12">Strategy 2: Trend Breakdown</h2>
            <p>
                This strategy flips its logic based on the macro regime. In a bear market (price < SMA200d), it shorts the breakdown of the 48-hour low. In a bull market, it longs the breakout of the 7-day high. There is no take profit; positions are held for exactly 7 days.
            </p>
            <ul>
                <li><strong>Short Side:</strong> +22 bps per trade, Profit Factor 1.26 (123 trades).</li>
                <li><strong>Long Side:</strong> +68 bps per trade, Profit Factor 1.53 (84 trades).</li>
            </ul>

            <h2 class="text-gray-900 dark:text-white mt-12">Strategy 3: Funding Squeeze</h2>
            <p>
                A contrarian strategy that identifies deep-bear capitulation. It goes short when the perpetual funding rate hits its cap while the 200-day SMA is declining.
            </p>
            <ul>
                <li><strong>BTC Profit Factor:</strong> 2.65</li>
                <li><strong>ETH Profit Factor:</strong> 1.82</li>
            </ul>
            <p>
                This is a very rare setup (only 15 trades triggered in 4 years), but the win rate and risk-reward ratio are exceptionally high.
            </p>

            <div class="bg-gray-50 dark:bg-brand-surface p-8 rounded-2xl border border-gray-100 dark:border-white/10 mt-12 transition-colors">
                <h3 class="text-gray-900 dark:text-white mt-0 mb-4">Portfolio Aggregation</h3>
                <p class="mb-0">
                    When combined into a single portfolio with our 3-factor sizing and 1.5x gross exposure cap, the simulated equity curve yielded <strong>+491% over 4 years</strong>, with a max drawdown of 21.5% and a Calmar ratio of 2.61. The worst performing year returned a flat 0%.
                </p>
            </div>
        </div>
    </div>
</article>

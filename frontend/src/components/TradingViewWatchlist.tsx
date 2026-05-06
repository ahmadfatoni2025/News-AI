"use client";

import { useEffect, useRef, memo } from "react";

function TradingViewWatchlistInner() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current || container.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "colorTheme": "dark",
        "dateRange": "12M",
        "showChart": false,
        "locale": "en",
        "largeChartUrl": "",
        "isTransparent": true,
        "showSymbolLogo": true,
        "showFloatingTooltip": true,
        "width": "100%",
        "height": "100%",
        "tabs": [
          {
            "title": "Watchlist",
            "symbols": [
              { "s": "BITSTAMP:BTCUSD", "d": "BTC/USD" },
              { "s": "BITSTAMP:ETHUSD", "d": "ETH/USD" },
              { "s": "BINANCE:BTCUSDT", "d": "BTC/USDT" },
              { "s": "BINANCE:ETHUSDT", "d": "ETH/USDT" },
              { "s": "BINANCE:SOLUSDT", "d": "SOL/USDT" },
              { "s": "BINANCE:PEPEUSDT", "d": "PEPE" }
            ]
          }
        ]
      }
    `;
    if (container.current) {
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container w-full h-full" ref={container}>
      <div className="tradingview-widget-container__widget w-full h-full"></div>
    </div>
  );
}

export const TradingViewWatchlist = memo(TradingViewWatchlistInner);

"use client";

import { useEffect, useRef, memo } from "react";

function TradingViewMarketOverviewInner() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current && container.current.innerHTML !== "") return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "colorTheme": "dark",
        "dateRange": "12M",
        "showChart": true,
        "locale": "en",
        "largeChartUrl": "",
        "isTransparent": true,
        "showSymbolLogo": true,
        "showFloatingTooltip": true,
        "width": "100%",
        "height": "100%",
        "tabs": [
          {
            "title": "Indices",
            "symbols": [
              { "s": "FOREXCOM:SPXUSD", "d": "S&P 500 Index" },
              { "s": "FOREXCOM:NSXUSD", "d": "US 100 Cash Indices" },
              { "s": "FOREXCOM:DJI", "d": "Dow Jones Industrial Average" },
              { "s": "INDEX:NKY", "d": "Nikkei 225" },
              { "s": "INDEX:DEU40", "d": "DAX Index" }
            ],
            "originalTitle": "Indices"
          },
          {
            "title": "Commodities",
            "symbols": [
              { "s": "CME_MINI:ES1!", "d": "S&P 500" },
              { "s": "CME:6E1!", "d": "Euro" },
              { "s": "COMEX:GC1!", "d": "Gold" },
              { "s": "NYMEX:CL1!", "d": "WTI Crude Oil" },
              { "s": "NYMEX:NG1!", "d": "Gas" }
            ],
            "originalTitle": "Commodities"
          },
          {
            "title": "Crypto",
            "symbols": [
              { "s": "BINANCE:BTCUSDT", "d": "Bitcoin" },
              { "s": "BINANCE:ETHUSDT", "d": "Ethereum" },
              { "s": "BINANCE:SOLUSDT", "d": "Solana" }
            ]
          },
          {
            "title": "Forex",
            "symbols": [
              { "s": "FX:EURUSD", "d": "EUR to USD" },
              { "s": "FX:GBPUSD", "d": "GBP to USD" },
              { "s": "FX:USDJPY", "d": "USD to JPY" }
            ],
            "originalTitle": "Forex"
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
      <div className="tradingview-widget-container__widget h-full"></div>
    </div>
  );
}

export const TradingViewMarketOverview = memo(TradingViewMarketOverviewInner);

"use client";

import { useEffect, useRef, memo } from "react";

function TradingViewAdvancedChartInner() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current || container.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "KRAKEN:XAUTUSD*FX_IDC:USDIDR",
        "interval": "1",
        "timezone": "Asia/Jakarta",
        "theme": "dark",
        "style": "1",
        "locale": "id",
        "enable_publishing": false,
        "backgroundColor": "rgba(0, 0, 0, 1)",
        "gridColor": "rgba(34, 34, 34, 1)",
        "withdaterange": false,
        "hide_side_toolbar": true,
        "hide_top_toolbar": true,
        "allow_symbol_change": false,
        "save_image": false,
        "details": false,
        "hotlist": false,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
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

export const TradingViewAdvancedChart = memo(TradingViewAdvancedChartInner);

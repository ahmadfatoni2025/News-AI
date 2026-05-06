"use client";

import { useEffect, useRef, memo } from "react";

interface TradingViewMiniChartProps {
  symbol: string;
}

function TradingViewMiniChartInner({ symbol }: TradingViewMiniChartProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear previous widget if symbol changes or strict mode double invocation
    if (container.current) {
      container.current.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbol": "${symbol}",
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "dateRange": "1M",
        "colorTheme": "dark",
        "isTransparent": true,
        "autosize": true,
        "largeChartUrl": ""
      }
    `;
    if (container.current) {
      container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container w-full h-full" ref={container}>
      <div className="tradingview-widget-container__widget h-full"></div>
    </div>
  );
}

export const TradingViewMiniChart = memo(TradingViewMiniChartInner);

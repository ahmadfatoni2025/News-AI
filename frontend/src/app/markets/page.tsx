"use client";

import { TradingViewTicker } from "@/components/TradingViewTicker";
import { TradingViewMarketOverview } from "@/components/TradingViewMarketOverview";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function MarketsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 h-[calc(100vh-60px)]" id="markets-page">
      {/* Ticker Tape */}
      <div className="w-full h-[40px] rounded-lg overflow-hidden border border-border bg-card shrink-0">
        <TradingViewTicker />
      </div>

      {/* Main Markets Overview */}
      <Card className="flex-1 overflow-hidden border-border bg-card flex flex-col">
        <CardHeader className="py-4 shrink-0">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Live Global Markets
          </CardTitle>
          <CardDescription className="text-xs">Real-time data provided by TradingView</CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <TradingViewMarketOverview />
        </CardContent>
      </Card>
    </div>
  );
}

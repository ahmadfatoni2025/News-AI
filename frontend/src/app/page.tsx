"use client";

import { useState } from "react";
import Link from "next/link";
import { countryData, type CountryEconomy, liveNews } from "@/lib/data";
import WorldMap from "@/components/WorldMap";
import RegionPanel from "@/components/RegionPanel";
import { TradingViewTicker } from "@/components/TradingViewTicker";

import { TradingViewAdvancedChart } from "@/components/TradingViewAdvancedChart";
import { TradingViewMarketOverview } from "@/components/TradingViewMarketOverview";
import { TradingViewWatchlist } from "@/components/TradingViewWatchlist";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Globe, Newspaper, TrendingUp, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const [selectedCountry, setSelectedCountry] = useState<CountryEconomy | null>(null);

  return (
    <div className="flex flex-col gap-6 p-6" id="dashboard-page">
      {/* Ticker Tape */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TradingView Advanced Chart */}
        <Card className="lg:col-span-2 overflow-hidden border-[#222] bg-[#111111] flex flex-col h-[600px]">
          <CardContent className="p-0 flex-1 h-full relative">
            <TradingViewAdvancedChart />
          </CardContent>
        </Card>

        {/* Right Column: Video + Watchlist */}
        <div className="flex flex-col gap-6 h-[600px]">
          {/* Finance Video */}
          <Card className="flex-1 overflow-hidden border-[#222] bg-[#111111] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between py-2">
              <CardTitle className="text-[10px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse-slow"></span>
                Live News
              </CardTitle>
              <Badge variant="destructive" className="bg-red/20 text-red text-[8px] h-4 hover:bg-red/30 px-1">LIVE</Badge>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <div className="video-wrapper rounded-none h-full w-full">
                <iframe
                  src="https://www.youtube.com/embed/live_stream?channel=UCIALMKvObZNtJ6AmdCLP7Lg&autoplay=1&mute=0&controls=1&rel=0"
                  title="Live Finance News"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>

          {/* Watchlist */}
          <Card className="flex-1 overflow-hidden border-[#222] bg-[#111111] flex flex-col">
            <CardContent className="p-0 flex-1 h-full relative">
              <TradingViewWatchlist />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Market Overview */}
        <Card className="overflow-hidden border-[#222] bg-[#111111] flex flex-col h-[450px]">
          <CardContent className="p-0 flex-1 h-full relative">
            <TradingViewMarketOverview />
          </CardContent>
        </Card>
      </div>

      {/* Row 2: World Map + Region Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={`overflow-hidden border-[#222] bg-[#111111] ${selectedCountry ? "lg:col-span-2" : "lg:col-span-3"}`}>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-sm flex items-center gap-2 text-foreground">
              <Globe className="w-4 h-4 text-primary" />
              Global Economic Map
            </CardTitle>
            <Link href="/map" className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-xs font-medium transition-colors hover:bg-muted hover:text-foreground h-8 px-3 text-muted-foreground">
              Full Screen <ChevronRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0 pb-4 px-4">
            <WorldMap
              compact
              onSelectCountry={(c) => setSelectedCountry(c)}
              selectedCountry={selectedCountry?.code}
            />
          </CardContent>
        </Card>

        {selectedCountry && (
          <div className="animate-fade lg:col-span-1">
            <RegionPanel
              country={selectedCountry}
              onClose={() => setSelectedCountry(null)}
            />
          </div>
        )}
      </div>

      {/* Row 3: Quick Stats + News Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <Card className="border-[#222] bg-[#111111]">
          <CardHeader className="py-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Quick Stats
            </CardTitle>
            <CardDescription className="text-xs">Top economies by GDP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.values(countryData).slice(0, 5).map((c) => (
                <div key={c.code} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-xs font-bold text-primary">
                      {c.code.substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground">GDP {c.gdp}</p>
                    </div>
                  </div>
                  <Badge variant={c.gdpGrowth > 0 ? "default" : "destructive"} className={c.gdpGrowth > 0 ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : ""}>
                    {c.gdpGrowth > 0 ? "+" : ""}{c.gdpGrowth}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* News Feed */}
        <Card className="lg:col-span-2 border-[#222] bg-[#111111]">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-primary" />
              Latest News
            </CardTitle>
            <Link href="/news" className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-xs font-medium transition-colors hover:bg-muted hover:text-foreground h-8 px-3 text-muted-foreground">
              View All
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[280px]">
              <div className="px-4 pb-4 space-y-1">
                {liveNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/news#${news.id}`}
                    className="flex items-start gap-3 p-3 rounded-md hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">{news.category}</Badge>
                        {news.isLive && <Badge variant="destructive" className="text-[10px] bg-red/20 text-red">LIVE</Badge>}
                      </div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {news.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                        <span>{news.source}</span>
                        <span>·</span>
                        <span>{news.time}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground mt-2 group-hover:text-primary transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

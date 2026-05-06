"use client";

import { useState } from "react";
import { liveNews } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ChevronRight, Inbox } from "lucide-react";

const categories = ["All", "Policy", "Crypto", "Trade", "Economy", "Energy", "Employment"];

export default function NewsPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? liveNews
      : liveNews.filter((n) => n.category === active);

  return (
    <div className="p-6 space-y-6" id="news-page">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
          <Newspaper className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Live News Feed</h1>
          <p className="text-xs text-muted-foreground">Real-time economic and financial updates</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={active === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActive(cat)}
            className="text-xs h-8 rounded-full"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-xs text-muted-foreground">
        Showing <span className="text-foreground font-semibold">{filtered.length}</span> articles
      </p>

      {/* News list */}
      <div className="space-y-3" id="news-list">
        {filtered.map((news) => (
          <article
            key={news.id}
            className="group flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-lg border border-border bg-card hover:bg-secondary/30 transition-colors cursor-pointer"
            id={news.id}
          >
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary flex-shrink-0 border border-border">
              <Newspaper className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="secondary" className="text-[10px] font-semibold">{news.category}</Badge>
                {news.isLive && <Badge variant="destructive" className="bg-red/20 text-red hover:bg-red/30 text-[10px]">LIVE</Badge>}
              </div>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {news.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground/80">{news.source}</span>
                <span>·</span>
                <span>{news.time}</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-secondary/50 group-hover:bg-primary/10 transition-colors">
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-lg bg-card/50">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
            <Inbox className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">No articles found</p>
          <p className="text-xs text-muted-foreground mt-1">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
}

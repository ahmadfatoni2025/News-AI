"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Newspaper,
  ChevronRight,
  Inbox,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  time: string;
  sentiment: "bullish" | "bearish" | "neutral";
  impact: 1 | 2 | 3;
  isLive: boolean;
  region: string;
  url: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Crypto", "Markets", "Economy", "Policy", "Trade", "Banking", "Energy", "Employment"];

const SORT_OPTIONS = [
  { value: "newest", label: "Terbaru" },
  { value: "impact", label: "Impact Tertinggi" },
  { value: "bullish", label: "Bullish" },
  { value: "bearish", label: "Bearish" },
];

const TICKER_ITEMS = [
  { sym: "IDR/USD", val: "16.284", chg: "+0.3%", up: true },
  { sym: "BTC", val: "$97.420", chg: "+1.8%", up: true },
  { sym: "IHSG", val: "6.842", chg: "+0.5%", up: true },
  { sym: "Gold", val: "$3.312", chg: "+0.7%", up: true },
  { sym: "Oil WTI", val: "$59.20", chg: "-1.1%", up: false },
  { sym: "S&P 500", val: "5.663", chg: "+0.9%", up: true },
  { sym: "ETH", val: "$1.832", chg: "+2.1%", up: true },
  { sym: "EUR/USD", val: "1.1312", chg: "+0.2%", up: true },
];

const CACHE_KEY = "nf_cache_v3";
const CACHE_DATE_KEY = "nf_cache_date_v3";

const CATEGORY_BADGE: Record<string, string> = {
  Crypto: "bg-violet-100 text-violet-700 border-violet-200",
  Markets: "bg-teal-100 text-teal-700 border-teal-200",
  Economy: "bg-green-100 text-green-700 border-green-200",
  Policy: "bg-blue-100 text-blue-700 border-blue-200",
  Trade: "bg-amber-100 text-amber-700 border-amber-200",
  Banking: "bg-stone-100 text-stone-600 border-stone-200",
  Energy: "bg-orange-100 text-orange-700 border-orange-200",
  Employment: "bg-pink-100 text-pink-700 border-pink-200",
};

const CATEGORY_LABELS: Record<string, string> = {
  All: "Semua",
  Crypto: "Kripto",
  Markets: "Pasar Modal",
  Economy: "Ekonomi",
  Policy: "Kebijakan",
  Trade: "Perdagangan",
  Banking: "Perbankan",
  Energy: "Energi",
  Employment: "Tenaga Kerja",
};

// ─── Cache helpers ────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split("T")[0];
}

function tryLoadCache(): NewsItem[] | null {
  try {
    if (localStorage.getItem(CACHE_DATE_KEY) === today()) {
      const c = localStorage.getItem(CACHE_KEY);
      if (c) return JSON.parse(c);
    }
  } catch {
    /* ignore */
  }
  return null;
}

function saveCache(data: NewsItem[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_DATE_KEY, today());
  } catch {
    /* ignore */
  }
}

function clearCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_DATE_KEY);
  } catch {
    /* ignore */
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden border-y border-border/60 bg-gradient-to-r from-muted/30 via-background to-muted/30 py-2.5 mb-5 rounded-lg">
      <div className="flex gap-8 animate-ticker whitespace-nowrap" style={{ animationDuration: "28s" }}>
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 text-[11px] px-2">
            <span className="font-semibold text-foreground/80">{t.sym}</span>
            <span className="text-muted-foreground">{t.val}</span>
            <span
              className={`font-medium ${t.up ? "text-emerald-600" : "text-rose-500"}`}
            >
              {t.up ? "▲" : "▼"} {t.chg}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ImpactBars({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" title={`Market impact: ${level}/3`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`inline-block w-1.5 h-3 rounded-sm transition-colors ${i <= level ? "bg-primary/70" : "bg-border/50"
            }`}
        />
      ))}
    </span>
  );
}

function SentimentBadge({ sentiment }: { sentiment: NewsItem["sentiment"] }) {
  if (sentiment === "bullish")
    return (
      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
        <TrendingUp className="w-2.5 h-2.5" /> Bullish
      </span>
    );
  if (sentiment === "bearish")
    return (
      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
        <TrendingDown className="w-2.5 h-2.5" /> Bearish
      </span>
    );
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-stone-50 text-stone-600 border border-stone-200">
      <Minus className="w-2.5 h-2.5" /> Netral
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="flex gap-4 p-5 rounded-xl border border-border/60 bg-card animate-pulse shadow-sm">
      <div className="w-12 h-12 rounded-xl bg-muted flex-shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <div className="flex gap-2">
          <div className="h-4 w-16 rounded-full bg-muted" />
          <div className="h-4 w-12 rounded-full bg-muted" />
        </div>
        <div className="h-4 w-4/5 rounded bg-muted" />
        <div className="h-3 w-2/3 rounded bg-muted" />
        <div className="h-3 w-1/3 rounded bg-muted" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NewsPage() {
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [active, setActive] = useState("All");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState("Memuat...");

  const fetchNews = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) clearCache();

    const cached = tryLoadCache();
    if (cached && cached.length > 0) {
      setAllNews(cached);
      setLastUpdated("Diperbarui hari ini (dari cache)");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setLastUpdated("Mengambil berita terbaru...");

    const dateStr = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const prompt = `You are a financial news aggregator. Today is ${dateStr}. Use web search to find the 20 most recent finance and economic news articles from the last 24 hours. Focus on: cryptocurrency, global markets, Indonesian economy (IHSG, rupiah, Bank Indonesia), US Federal Reserve, trade wars, oil prices, and major corporate finance news.

Return ONLY a JSON array of exactly 20 objects. No markdown, no explanation, just raw JSON. Each object:
- id: string (unique, e.g. "n1")
- title: string (headline max 120 chars)
- summary: string (2-3 sentence summary in Indonesian, max 220 chars)
- source: string (e.g. "Bloomberg","Reuters","CNBC Indonesia")
- category: string (one of: "Crypto","Markets","Economy","Policy","Trade","Banking","Energy","Employment")
- time: string (relative, e.g. "5 menit lalu","2 jam lalu")
- sentiment: string ("bullish"|"bearish"|"neutral")
- impact: number (1|2|3)
- isLive: boolean
- region: string (e.g. "Global","Indonesia","US","Asia")
- url: string (actual URL or "#")`;

    try {
      const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;

      if (!apiKey) {
        console.warn("API Key tidak ditemukan. Menggunakan data dummy.");
        const MOCK_NEWS: NewsItem[] = [
          {
            id: "1",
            title: "Federal Reserve Mengisyaratkan Potensi Penurunan Suku Bunga",
            summary:
              "Gubernur The Fed memberikan sinyal kuat bahwa pemangkasan suku bunga dapat dimulai pada kuartal ketiga tahun ini seiring dengan mendinginnya inflasi.",
            source: "Reuters",
            category: "Policy",
            time: "1 jam lalu",
            sentiment: "bullish",
            impact: 3,
            isLive: true,
            region: "US",
            url: "#",
          },
          {
            id: "2",
            title: "Bitcoin Melonjak Lewati $90K karena Permintaan Institusional",
            summary:
              "Arus masuk ETF Bitcoin Spot mencapai rekor tertinggi minggu ini, mendorong harga menembus level resistensi kunci.",
            source: "Bloomberg",
            category: "Crypto",
            time: "2 jam lalu",
            sentiment: "bullish",
            impact: 3,
            isLive: false,
            region: "Global",
            url: "#",
          },
          {
            id: "3",
            title: "IHSG Ditutup Menguat, Sektor Perbankan Pimpin Kenaikan",
            summary:
              "Indeks Harga Saham Gabungan (IHSG) berakhir hijau berkat rilis laporan keuangan kuartal pertama dari bank-bank besar yang melebihi ekspektasi.",
            source: "CNBC Indonesia",
            category: "Markets",
            time: "3 jam lalu",
            sentiment: "bullish",
            impact: 2,
            isLive: false,
            region: "Indonesia",
            url: "#",
          },
          {
            id: "4",
            title: "Harga Minyak Dunia Turun Tipis Pasca Data Inventaris AS",
            summary:
              "Harga minyak WTI melemah tipis setelah laporan menunjukkan peningkatan cadangan minyak mentah AS melebihi perkiraan.",
            source: "WSJ",
            category: "Energy",
            time: "4 jam lalu",
            sentiment: "bearish",
            impact: 2,
            isLive: false,
            region: "Global",
            url: "#",
          },
          {
            id: "5",
            title: "Bank Indonesia Tahan Suku Bunga Acuan (BI Rate)",
            summary:
              "BI mempertahankan suku bunga pada level saat ini untuk menjaga stabilitas nilai tukar Rupiah di tengah ketidakpastian global.",
            source: "Bisnis",
            category: "Banking",
            time: "5 jam lalu",
            sentiment: "neutral",
            impact: 3,
            isLive: false,
            region: "Indonesia",
            url: "#",
          },
        ];

        setAllNews(MOCK_NEWS);
        setLastUpdated("Data Dummy (API Key tidak diatur)");
        setLoading(false);
        return;
      }

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-3-7-sonnet-20250219",
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const text = (data.content as { type: string; text?: string }[])
        .filter((b) => b.type === "text")
        .map((b) => b.text ?? "")
        .join("");

      const match = text.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("No JSON array found");

      const news: NewsItem[] = JSON.parse(match[0]);
      if (!Array.isArray(news) || news.length === 0) throw new Error("Empty result");

      const trimmed = news.slice(0, 20);
      saveCache(trimmed);
      setAllNews(trimmed);

      const now = new Date();
      setLastUpdated(
        `Diperbarui ${now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`
      );
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil berita. Pastikan koneksi aktif dan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();

    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const msToMidnight = midnight.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      clearCache();
      fetchNews();
      const daily = setInterval(() => {
        clearCache();
        fetchNews();
      }, 86_400_000);
      return () => clearInterval(daily);
    }, msToMidnight);

    return () => clearTimeout(midnightTimer);
  }, [fetchNews]);

  const filtered = (() => {
    let data = active === "All" ? [...allNews] : allNews.filter((n) => n.category === active);
    if (sort === "impact") data.sort((a, b) => b.impact - a.impact);
    if (sort === "bullish")
      data.sort(
        (a, b) => (b.sentiment === "bullish" ? 1 : 0) - (a.sentiment === "bullish" ? 1 : 0)
      );
    if (sort === "bearish")
      data.sort(
        (a, b) => (b.sentiment === "bearish" ? 1 : 0) - (a.sentiment === "bearish" ? 1 : 0)
      );
    return data;
  })();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-5" id="news-page">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-card/50 p-4 sm:p-5 rounded-2xl border border-border/50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shadow-inner">
            <Newspaper className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Live News Feed</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              20 berita keuangan terbaru · Auto-refresh harian
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs h-9 rounded-lg shadow-sm"
          onClick={() => fetchNews(true)}
          disabled={loading}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Memuat..." : "Refresh"}
        </Button>
      </div>

      {/* Ticker */}
      <Ticker />

      {/* Meta bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-medium">{lastUpdated}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Menampilkan{" "}
          <span className="font-semibold text-foreground">{filtered.length}</span> dari{" "}
          <span className="font-semibold text-foreground">{allNews.length}</span> artikel
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-muted/40 rounded-xl">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={active === cat ? "default" : "ghost"}
            size="sm"
            onClick={() => setActive(cat)}
            className={`text-xs h-8 rounded-lg transition-all ${active === cat
                ? "shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-background"
              }`}
          >
            {CATEGORY_LABELS[cat] || cat}
          </Button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2.5 px-1">
        <span className="text-xs text-muted-foreground font-medium">Urutkan:</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-xs h-8 px-3 rounded-lg border border-border/60 bg-background text-foreground cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Skeleton */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/60 rounded-2xl bg-card/30 gap-4">
          <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center">
            <AlertCircle className="w-7 h-7 text-rose-500" />
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">{error}</p>
          <Button variant="outline" size="sm" className="rounded-lg" onClick={() => fetchNews(true)}>
            Coba Lagi
          </Button>
        </div>
      )}

      {/* News list */}
      {!loading && !error && (
        <div className="space-y-3" id="news-list">
          {filtered.map((news) => (
            <article
              key={news.id}
              className="group flex flex-col sm:flex-row sm:items-start gap-4 p-4 sm:p-5 rounded-xl border border-border/60 bg-card hover:bg-accent/30 hover:border-primary/20 hover:shadow-md transition-all duration-200 cursor-pointer"
              id={news.id}
              onClick={() => news.url && news.url !== "#" && window.open(news.url, "_blank")}
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary flex-shrink-0 border border-primary/10 group-hover:bg-primary/10 transition-colors">
                <Newspaper className="w-5 h-5" />
              </div>

              {/* Body */}
              <div className="flex-1 min-w-0">
                {/* Badges row */}
                <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                  <Badge
                    variant="secondary"
                    className={`text-[10px] font-semibold border ${CATEGORY_BADGE[news.category] ?? ""}`}
                  >
                    {CATEGORY_LABELS[news.category] || news.category}
                  </Badge>

                  {news.isLive && (
                    <Badge className="text-[10px] font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-50">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1" />
                      LIVE
                    </Badge>
                  )}

                  <SentimentBadge sentiment={news.sentiment} />

                  <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground ml-0.5">
                    <ImpactBars level={news.impact} />
                    <span>Impact</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5 leading-snug">
                  {news.title}
                </h3>

                {/* Summary */}
                {news.summary && (
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2.5 line-clamp-2">
                    {news.summary}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground/70">{news.source}</span>
                  <span className="text-border">·</span>
                  <span>{news.time}</span>
                  {news.region && (
                    <>
                      <span className="text-border">·</span>
                      <span className="px-1.5 py-0.5 rounded bg-muted/50 text-[10px]">{news.region}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-muted/30 group-hover:bg-primary/10 transition-colors flex-shrink-0 mt-1">
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/60 rounded-2xl bg-card/30">
          <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <Inbox className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-foreground">Tidak ada artikel ditemukan</p>
          <p className="text-xs text-muted-foreground mt-1">Coba pilih kategori lain.</p>
        </div>
      )}
    </div>
  );
}
import type { CountryEconomy } from "@/lib/data";

interface RegionPanelProps {
  country: CountryEconomy;
  onClose: () => void;
}

export default function RegionPanel({ country, onClose }: RegionPanelProps) {
  const indicators = [
    { label: "GDP", value: country.gdp, sub: `Growth: ${country.gdpGrowth > 0 ? "+" : ""}${country.gdpGrowth}%`, positive: country.gdpGrowth > 0 },
    { label: "Inflation", value: `${country.inflation}%`, sub: country.inflation < 3 ? "Stable" : "Elevated", positive: country.inflation < 3 },
    { label: "Unemployment", value: `${country.unemployment}%`, sub: country.unemployment < 5 ? "Low" : "High", positive: country.unemployment < 5 },
    { label: "Trade Balance", value: country.tradeBalance, sub: country.tradeBalance.startsWith("+") ? "Surplus" : "Deficit", positive: country.tradeBalance.startsWith("+") },
  ];

  return (
    <div className="region-panel card p-5" id="region-panel">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-muted font-medium">{country.region}</p>
          <h3 className="text-lg font-bold text-foreground">{country.name}</h3>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-2 text-muted" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Quick stats */}
      <div className="flex items-center gap-4 mb-4 text-xs text-muted-2">
        <span>👥 {country.population}</span>
        <span>💰 {country.currency}</span>
        <span>📍 {country.code}</span>
      </div>

      {/* Indicators */}
      <div className="grid grid-cols-2 gap-3">
        {indicators.map((ind) => (
          <div key={ind.label} className="bg-surface-2 rounded-xl p-3">
            <p className="text-[10px] text-muted font-medium uppercase tracking-wide mb-1">{ind.label}</p>
            <p className="text-base font-bold text-foreground">{ind.value}</p>
            <span className={`badge text-[10px] mt-1 ${ind.positive ? "badge-green" : "badge-red"}`}>
              {ind.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <button className="btn btn-accent flex-1 text-xs">View Full Report</button>
        <button className="btn btn-outline text-xs">Download CSV</button>
      </div>
    </div>
  );
}

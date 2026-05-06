"use client";

import { useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { countryData, type CountryEconomy } from "@/lib/data";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Map ISO numeric to our country codes
const isoToCode: Record<string, string> = {
  "840": "USA", "156": "CHN", "392": "JPN", "276": "DEU",
  "826": "GBR", "356": "IND", "076": "BRA", "360": "IDN",
  "036": "AUS", "682": "SAU", "566": "NGA", "710": "ZAF",
};

interface WorldMapProps {
  onSelectCountry?: (country: CountryEconomy | null) => void;
  selectedCountry?: string | null;
  compact?: boolean;
}

function WorldMapInner({ onSelectCountry, selectedCountry, compact = false }: WorldMapProps) {
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);

  const markers = Object.values(countryData);
  const height = compact ? 300 : 500;

  return (
    <div
      className="map-container relative"
      style={{ height }}
      id="world-map"
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: compact ? 120 : 150,
          center: [10, 20],
        }}
        width={800}
        height={height}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const code = isoToCode[geo.id];
                const isActive = code === selectedCountry;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (code && countryData[code] && onSelectCountry) {
                        onSelectCountry(countryData[code]);
                      }
                    }}
                    onMouseEnter={() => {
                      const name = geo.properties.name;
                      setTooltip({ name, x: 0, y: 0 });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: {
                        fill: isActive ? "#ff6b35" : "#1a2035",
                        stroke: isActive ? "#ff8555" : "#2a3050",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: "pointer",
                        transition: "fill 0.2s ease",
                      },
                      hover: {
                        fill: "#ff6b35",
                        stroke: "#ff8555",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#e5552a",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Glowing dots for data-enabled countries */}
          {markers.map((c) => (
            <Marker key={c.code} coordinates={c.coordinates}>
              <circle
                className="map-dot"
                r={selectedCountry === c.code ? 6 : 3.5}
                onClick={() => onSelectCountry?.(c)}
              />
              {selectedCountry === c.code && (
                <circle
                  r={12}
                  fill="none"
                  stroke="#ff6b35"
                  strokeWidth={1}
                  opacity={0.3}
                  className="animate-pulse-slow"
                />
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Country labels */}
      {!compact && tooltip && (
        <div className="absolute top-3 left-3 chart-tooltip text-foreground text-xs pointer-events-none">
          {tooltip.name}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 right-3 flex items-center gap-3 text-[10px] text-muted">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-accent"></span> Data Available
        </span>
        <span>Scroll to zoom · Drag to pan</span>
      </div>
    </div>
  );
}

const WorldMap = memo(WorldMapInner);
export default WorldMap;

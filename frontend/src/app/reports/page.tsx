"use client";

import { useState } from "react";
import { countryData, type CountryEconomy } from "@/lib/data";
import RegionPanel from "@/components/RegionPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, MapPin, FileText } from "lucide-react";

export default function ReportsPage() {
  const [selected, setSelected] = useState<CountryEconomy | null>(null);

  const countries = Object.values(countryData);

  return (
    <div className="p-6 space-y-6" id="reports-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Economic Reports</h1>
            <p className="text-xs text-muted-foreground">Select a country to view detailed analysis</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-xs h-8">
          <Download className="w-3 h-3 mr-2" /> Export All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Country selector grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {countries.map((c) => (
              <Card
                key={c.code}
                onClick={() => setSelected(c)}
                className={`cursor-pointer transition-all border ${
                  selected?.code === c.code
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-muted-foreground/30 hover:bg-secondary/20"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">
                      {c.code}
                    </div>
                    <Badge variant={c.gdpGrowth > 0 ? "default" : "destructive"} className={`text-[10px] px-1.5 py-0 ${c.gdpGrowth > 0 ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : ""}`}>
                      {c.gdpGrowth > 0 ? "+" : ""}{c.gdpGrowth}%
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{c.region}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">GDP {c.gdp}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Report panel */}
        <div>
          {selected ? (
            <div className="sticky top-20">
              <RegionPanel country={selected} onClose={() => setSelected(null)} />
            </div>
          ) : (
            <Card className="p-8 text-center border-dashed border-2 bg-card/50">
              <CardContent className="flex flex-col items-center justify-center py-8 px-0">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Select a Country</p>
                <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">
                  Click on any country card to view its detailed economic report
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import WorldMap from "@/components/WorldMap";
import RegionPanel from "@/components/RegionPanel";
import { countryData, type CountryEconomy } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, TrendingUp, BarChart3, Clock, Download } from "lucide-react";

export default function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryEconomy | null>(null);

  const totalCountries = Object.keys(countryData).length;
  const avgGrowth = (
    Object.values(countryData).reduce((sum, c) => sum + c.gdpGrowth, 0) / totalCountries
  ).toFixed(1);

  return (
    <div className="p-6 space-y-6" id="map-page">
      {/* Top stats bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" id="map-stats">
        {[
          { label: "Countries Tracked", value: totalCountries.toString(), icon: Globe },
          { label: "Avg GDP Growth", value: `${avgGrowth}%`, icon: TrendingUp },
          { label: "Data Points", value: "48+", icon: BarChart3 },
          { label: "Last Updated", value: "2h ago", icon: Clock },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Map + Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Map */}
        <Card className={`overflow-hidden border-border bg-card ${selectedCountry ? "xl:col-span-3" : "xl:col-span-4"}`}>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Interactive World Map
            </CardTitle>
            <CardDescription className="text-xs">Click a country or dot to view data</CardDescription>
          </CardHeader>
          <CardContent className="p-0 pb-4 px-4">
            <WorldMap
              onSelectCountry={(c) => setSelectedCountry(c)}
              selectedCountry={selectedCountry?.code}
            />
          </CardContent>
        </Card>

        {/* Panel */}
        {selectedCountry && (
          <div className="animate-fade flex flex-col gap-4">
            <RegionPanel
              country={selectedCountry}
              onClose={() => setSelectedCountry(null)}
            />

            {/* Comparison data */}
            <Card className="border-border bg-card">
              <CardHeader className="py-4">
                <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Regional Comparison</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-1">
                  {Object.values(countryData)
                    .filter((c) => c.region === selectedCountry.region && c.code !== selectedCountry.code)
                    .slice(0, 3)
                    .map((c) => (
                      <button
                        key={c.code}
                        onClick={() => setSelectedCountry(c)}
                        className="w-full flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-bold text-primary">
                            {c.code}
                          </div>
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{c.name}</span>
                        </div>
                        <span className={`text-xs font-semibold ${c.gdpGrowth > 0 ? "text-emerald-500" : "text-red"}`}>
                          {c.gdpGrowth > 0 ? "+" : ""}{c.gdpGrowth}%
                        </span>
                      </button>
                    ))}
                  {Object.values(countryData).filter((c) => c.region === selectedCountry.region && c.code !== selectedCountry.code).length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">No other tracked countries in this region.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Country List Table */}
      <Card className="overflow-hidden border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            All Countries
          </CardTitle>
          <Button variant="outline" size="sm" className="text-xs h-8">
            <Download className="w-3 h-3 mr-2" /> Export Data
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow className="hover:bg-transparent">
                <TableHead>Country</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>GDP</TableHead>
                <TableHead>Growth</TableHead>
                <TableHead>Inflation</TableHead>
                <TableHead>Unemployment</TableHead>
                <TableHead className="text-right">Trade Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(countryData).map((c) => (
                <TableRow
                  key={c.code}
                  className="cursor-pointer hover:bg-secondary/40 transition-colors"
                  onClick={() => setSelectedCountry(c)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded bg-secondary flex items-center justify-center text-[10px] font-bold text-primary">
                        {c.code}
                      </div>
                      <span className="font-medium text-foreground">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{c.region}</TableCell>
                  <TableCell className="font-medium">{c.gdp}</TableCell>
                  <TableCell>
                    <Badge variant={c.gdpGrowth > 0 ? "default" : "destructive"} className={c.gdpGrowth > 0 ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : ""}>
                      {c.gdpGrowth > 0 ? "+" : ""}{c.gdpGrowth}%
                    </Badge>
                  </TableCell>
                  <TableCell className={c.inflation > 5 ? "text-red" : "text-muted-foreground"}>{c.inflation}%</TableCell>
                  <TableCell className={c.unemployment > 10 ? "text-red" : "text-muted-foreground"}>{c.unemployment}%</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-medium ${c.tradeBalance.startsWith("+") ? "text-emerald-500" : "text-red"}`}>
                      {c.tradeBalance}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

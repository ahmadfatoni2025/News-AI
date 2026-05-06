// Country economic data for the interactive world map

export interface CountryEconomy {
  name: string;
  code: string;
  gdp: string;
  gdpGrowth: number;
  inflation: number;
  unemployment: number;
  population: string;
  currency: string;
  tradeBalance: string;
  coordinates: [number, number]; // [lng, lat]
  region: string;
}

export const countryData: Record<string, CountryEconomy> = {
  USA: {
    name: "United States",
    code: "USA",
    gdp: "$26.95T",
    gdpGrowth: 3.2,
    inflation: 2.4,
    unemployment: 3.6,
    population: "334M",
    currency: "USD",
    tradeBalance: "-$68.4B",
    coordinates: [-98.5, 39.8],
    region: "North America",
  },
  CHN: {
    name: "China",
    code: "CHN",
    gdp: "$18.32T",
    gdpGrowth: 4.8,
    inflation: 0.7,
    unemployment: 5.0,
    population: "1.43B",
    currency: "CNY",
    tradeBalance: "+$823B",
    coordinates: [104.0, 35.0],
    region: "East Asia",
  },
  JPN: {
    name: "Japan",
    code: "JPN",
    gdp: "$4.23T",
    gdpGrowth: 1.2,
    inflation: 3.2,
    unemployment: 2.5,
    population: "125M",
    currency: "JPY",
    tradeBalance: "-$45.2B",
    coordinates: [138.2, 36.2],
    region: "East Asia",
  },
  DEU: {
    name: "Germany",
    code: "DEU",
    gdp: "$4.46T",
    gdpGrowth: 0.3,
    inflation: 2.2,
    unemployment: 3.1,
    population: "84M",
    currency: "EUR",
    tradeBalance: "+$245B",
    coordinates: [10.4, 51.1],
    region: "Europe",
  },
  GBR: {
    name: "United Kingdom",
    code: "GBR",
    gdp: "$3.33T",
    gdpGrowth: 0.6,
    inflation: 3.4,
    unemployment: 4.0,
    population: "68M",
    currency: "GBP",
    tradeBalance: "-$98B",
    coordinates: [-3.4, 55.3],
    region: "Europe",
  },
  IND: {
    name: "India",
    code: "IND",
    gdp: "$3.73T",
    gdpGrowth: 7.8,
    inflation: 4.8,
    unemployment: 7.1,
    population: "1.43B",
    currency: "INR",
    tradeBalance: "-$242B",
    coordinates: [78.9, 20.5],
    region: "South Asia",
  },
  BRA: {
    name: "Brazil",
    code: "BRA",
    gdp: "$2.13T",
    gdpGrowth: 2.9,
    inflation: 4.5,
    unemployment: 7.9,
    population: "216M",
    currency: "BRL",
    tradeBalance: "+$62B",
    coordinates: [-51.9, -14.2],
    region: "South America",
  },
  IDN: {
    name: "Indonesia",
    code: "IDN",
    gdp: "$1.37T",
    gdpGrowth: 5.1,
    inflation: 2.8,
    unemployment: 5.3,
    population: "277M",
    currency: "IDR",
    tradeBalance: "+$36B",
    coordinates: [113.9, -0.7],
    region: "Southeast Asia",
  },
  AUS: {
    name: "Australia",
    code: "AUS",
    gdp: "$1.69T",
    gdpGrowth: 1.5,
    inflation: 3.6,
    unemployment: 3.7,
    population: "26M",
    currency: "AUD",
    tradeBalance: "+$78B",
    coordinates: [133.7, -25.2],
    region: "Oceania",
  },
  SAU: {
    name: "Saudi Arabia",
    code: "SAU",
    gdp: "$1.07T",
    gdpGrowth: -0.8,
    inflation: 1.6,
    unemployment: 4.8,
    population: "36M",
    currency: "SAR",
    tradeBalance: "+$156B",
    coordinates: [45.0, 24.0],
    region: "Middle East",
  },
  NGA: {
    name: "Nigeria",
    code: "NGA",
    gdp: "$472B",
    gdpGrowth: 3.3,
    inflation: 28.9,
    unemployment: 33.3,
    population: "224M",
    currency: "NGN",
    tradeBalance: "-$1.2B",
    coordinates: [8.6, 9.0],
    region: "Africa",
  },
  ZAF: {
    name: "South Africa",
    code: "ZAF",
    gdp: "$399B",
    gdpGrowth: 0.7,
    inflation: 5.3,
    unemployment: 32.1,
    population: "60M",
    currency: "ZAR",
    tradeBalance: "+$8.4B",
    coordinates: [22.9, -30.5],
    region: "Africa",
  },
};

export interface MarketAsset {
  name: string;
  symbol: string;
  price: string;
  change: number;
  changePercent: number;
  icon: string;
}

export const marketAssets: MarketAsset[] = [
  { name: "Gold", symbol: "XAU", price: "$2,345.60", change: 12.30, changePercent: 0.53, icon: "🥇" },
  { name: "Bitcoin", symbol: "BTC", price: "$67,234", change: 1234, changePercent: 1.87, icon: "₿" },
  { name: "Ethereum", symbol: "ETH", price: "$3,456", change: -45.2, changePercent: -1.29, icon: "⟠" },
  { name: "S&P 500", symbol: "SPX", price: "5,842.31", change: 23.47, changePercent: 0.40, icon: "📈" },
  { name: "Crude Oil", symbol: "WTI", price: "$78.45", change: -1.23, changePercent: -1.54, icon: "🛢️" },
  { name: "EUR/USD", symbol: "EUR", price: "1.0847", change: 0.0023, changePercent: 0.21, icon: "💱" },
  { name: "Silver", symbol: "XAG", price: "$27.84", change: 0.45, changePercent: 1.64, icon: "🪙" },
  { name: "NASDAQ", symbol: "NDX", price: "18,923", change: 156.89, changePercent: 0.84, icon: "📊" },
];

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  category: string;
  isLive?: boolean;
}

export const liveNews: NewsItem[] = [
  { id: "1", title: "Federal Reserve Signals Potential Rate Cut Amid Cooling Inflation", source: "Reuters", time: "2h ago", category: "Policy", isLive: true },
  { id: "2", title: "Bitcoin Surges Past $67K as Institutional Demand Grows", source: "Bloomberg", time: "3h ago", category: "Crypto" },
  { id: "3", title: "Global Supply Chain Disruptions Ease Significantly", source: "WSJ", time: "4h ago", category: "Trade" },
  { id: "4", title: "China GDP Grows 4.8% in Q1, Beating Expectations", source: "CNBC", time: "5h ago", category: "Economy" },
  { id: "5", title: "Renewable Energy Investments Reach $1.3T Record", source: "Financial Times", time: "6h ago", category: "Energy" },
  { id: "6", title: "Tech Sector Adds 450K Jobs in Record Q1 Growth", source: "MarketWatch", time: "7h ago", category: "Employment" },
  { id: "7", title: "OPEC+ Agrees to Gradual Production Increase", source: "Reuters", time: "8h ago", category: "Energy" },
  { id: "8", title: "US-China Semiconductor Talks Enter Critical Phase", source: "Nikkei", time: "9h ago", category: "Trade" },
];

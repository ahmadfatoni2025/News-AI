import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "EconMap - Interactive Economic Data Platform",
  description:
    "Explore global economic data through an interactive world map, real-time financial news, and detailed economic reports. Built for economists and financial analysts.",
  keywords: "economic data, world map, GDP, inflation, financial news, market analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}>
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

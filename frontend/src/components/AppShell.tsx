"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; subtitle?: string }> = {
  "/": { title: "Dashboard", subtitle: "Overview of global economic data" },
  "/map": { title: "World Map", subtitle: "Explore economic data by region" },
  "/markets": { title: "Markets", subtitle: "Real-time market data" },
  "/news": { title: "News Feed", subtitle: "Latest economic developments" },
  "/reports": { title: "Reports", subtitle: "Detailed economic analysis" },
};

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const pageInfo = pageTitles[pathname] || { title: "EconMap" };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <TopBar
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

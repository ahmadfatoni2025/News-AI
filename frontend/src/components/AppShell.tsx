"use client";

import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; subtitle?: string }> = {
  "/": { title: "Dashboard", subtitle: "Overview of global economic data" },
  "/map": { title: "World Map", subtitle: "Explore economic data by region" },
  "/markets": { title: "Markets", subtitle: "Real-time market data" },
  "/news": { title: "News Feed", subtitle: "Latest economic developments" },
  "/reports": { title: "Reports", subtitle: "Detailed economic analysis" },
};

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageInfo = pageTitles[pathname] || { title: "EconMap" };

  return (
    <div className="flex h-screen w-full bg-[#050505] p-0 md:p-3 overflow-hidden font-sans text-foreground">
      {/* Outer Floating Window */}
      <div className="flex w-full h-full bg-[#111111] md:rounded-[32px] overflow-hidden md:border border-[#222] shadow-2xl relative">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 bg-[#111111]">
          <main className="flex-1 overflow-y-auto px-6 md:px-10 pb-28 md:pb-10">
            {/* Title Section (Optional, you can remove if it doesn't fit the new design) */}
            <div className="mb-8 pt-4">
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">{pageInfo.title}</h1>
              {pageInfo.subtitle && <p className="text-[#888] mt-2 text-sm">{pageInfo.subtitle}</p>}
            </div>

            {/* Page Content */}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

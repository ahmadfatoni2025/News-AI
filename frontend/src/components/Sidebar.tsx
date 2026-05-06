"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Globe, Activity, Newspaper, FileText, Settings, LogOut } from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "World Map", href: "/map", icon: Globe },
  { label: "Markets", href: "/markets", icon: Activity },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Reports", href: "/reports", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-[88px] hidden md:flex flex-col items-center py-8 bg-[#000000] border-r border-[#222]">
        <Link href="/" className="mb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111111] border border-[#222] hover:border-primary/50 transition-colors">
            <span className="text-sm font-bold text-foreground">EM</span>
          </div>
        </Link>

        <nav className="flex-1 flex flex-col items-center gap-6 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${
                  isActive ? "bg-[#1a1a1a] text-foreground" : "text-[#888] hover:text-foreground hover:bg-[#111]"
                }`}
                title={item.label}
              >
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full -ml-3.5" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <button className="p-3.5 rounded-2xl text-[#888] hover:text-foreground hover:bg-[#111] transition-all">
            <Settings className="w-6 h-6" />
          </button>
          <button className="p-3.5 rounded-2xl text-[#888] hover:text-red-500 hover:bg-[#111] transition-all">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 bg-[#000000] border-t border-[#222] z-50">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl text-[10px] font-medium transition-all ${
                isActive ? "text-foreground" : "text-[#888] hover:text-foreground"
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
            </Link>
          );
        })}
      </nav>
    </>
  );
}

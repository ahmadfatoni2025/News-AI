"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Activity,
  Newspaper,
  FileText,
  Search,
  Zap,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "World Map", href: "/map", icon: Globe },
  { label: "Markets", href: "/markets", icon: Activity },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Reports", href: "/reports", icon: FileText },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden ${isOpen ? "block" : "hidden"
          }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col border-r border-border bg-card transition-transform duration-300 md:sticky md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        id="sidebar"
      >
        {/* Logo */}
        <div className="border-b border-border p-6">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-xs font-bold text-primary-foreground">
                EM
              </span>
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              EconMap
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-full border-border bg-secondary/50 pl-9 focus-visible:ring-primary"
              id="sidebar-search"
            />
            <kbd className="absolute right-2 top-2.5 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4" id="sidebar-nav">
          <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Main
          </p>
          <div className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${isActive
                    ? "bg-gradient-to-r from-primary/20 to-transparent text-foreground"
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                    }`}
                  id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary shadow-[0_0_10px_var(--primary)]" />
                  )}
                  <Icon
                    className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                  />
                  {item.label}
                  {item.label === "News" && (
                    <Badge
                      variant="default"
                      className="ml-auto flex h-5 w-5 items-center justify-center rounded-full border border-border bg-secondary p-0 text-[10px] text-secondary-foreground"
                    >
                      3
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom - Pro Card */}
        <div className="mt-auto p-4">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-[#151518] p-5 shadow-lg">
            {/* Glow effect */}
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Zap className="h-3.5 w-3.5 fill-primary text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground">
                  Upgrade Pro!
                </h3>
              </div>
              <p className="mb-4 text-[11px] leading-relaxed text-muted-foreground">
                Upgrade to Pro and elevate your experience today
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="h-8 w-full border-none bg-gradient-to-r from-[#ff7300] to-[#ff9900] text-xs text-white shadow-md shadow-primary/20 hover:from-[#e66a00] hover:to-[#e68a00]"
                >
                  Upgrade
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-full text-xs text-muted-foreground hover:text-foreground"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
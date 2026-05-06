"use client";

import { Menu, Bell, Mail, Share, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface TopBarProps {
  title: string;
  subtitle?: string;
  onMenuToggle: () => void;
}

export default function TopBar({ title, subtitle, onMenuToggle }: TopBarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-20" id="topbar">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
        <div className="relative hidden md:block w-64 mr-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Anything..."
            className="w-full pl-9 bg-secondary/30 border-border focus-visible:ring-primary h-9 rounded-full"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-secondary/50">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
        </Button>

        {/* Messages */}
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50">
          <Mail className="w-4 h-4" />
        </Button>

        {/* Profile */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-foreground">Tony Analyst</p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Pro Plan</p>
          </div>
          <Avatar className="w-9 h-9 border border-border cursor-pointer">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/20 text-primary font-semibold text-sm">TA</AvatarFallback>
          </Avatar>
        </div>

        {/* Share */}
        <Button className="hidden xl:flex ml-2 h-9 rounded-full px-4 text-xs font-semibold shadow-md shadow-primary/20">
          <Share className="w-3.5 h-3.5 mr-2" />
          Share
        </Button>
      </div>
    </header>
  );
}

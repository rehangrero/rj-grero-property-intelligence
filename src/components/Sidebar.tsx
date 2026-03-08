"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Globe,
  MapPin,
  TrendingUp,
  ArrowRightLeft,
  ShieldAlert,
  Target,
  Newspaper,
  FileText,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "global-signals", label: "Global Signals", icon: Globe },
  { id: "sri-lanka", label: "Sri Lanka Intel", icon: MapPin },
  { id: "interest-rates", label: "Interest Rates", icon: TrendingUp },
  { id: "capital-flows", label: "Capital Flows", icon: ArrowRightLeft },
  { id: "risk-monitor", label: "Risk Monitor", icon: ShieldAlert },
  { id: "opportunities", label: "Opportunities", icon: Target },
  { id: "news-feed", label: "News Feed", icon: Newspaper },
  { id: "reports", label: "Reports", icon: FileText },
];

interface SidebarProps {
  onNavigate?: (itemId: string) => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleClick = (itemId: string) => {
    setActiveItem(itemId);
    onNavigate?.(itemId);
  };

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-[#141b2d] border-r border-gray-800 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#1a2235] border-l-2 border-[#c9a84c]"
                  : "hover:bg-[#1a2235]"
              }`}
            >
              <Icon className="w-5 h-5 text-gray-400" />
              <span className={`text-sm font-medium ${isActive ? "text-[#c9a84c]" : "text-gray-400"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

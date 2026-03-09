"use client";

import {
  LayoutDashboard,
  Globe,
  MapPin,
  TrendingUp,
  ArrowRightLeft,
  ShieldAlert,
  Target,
  Newspaper,
  Brain,
  Building2,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { id: "dashboard",      label: "Overview",        icon: LayoutDashboard },
  { id: "global-signals", label: "Global Signals",  icon: Globe },
  { id: "sri-lanka",      label: "Sri Lanka Intel",  icon: MapPin },
  { id: "colombo-map",    label: "Colombo 1–10",     icon: Building2, badge: "NEW" },
  { id: "interest-rates", label: "Interest Rates",  icon: TrendingUp },
  { id: "capital-flows",  label: "Capital Flows",   icon: ArrowRightLeft },
  { id: "risk-monitor",   label: "Risk Monitor",    icon: ShieldAlert },
  { id: "opportunities",  label: "Opportunities",   icon: Target },
  { id: "ai-analysis",    label: "AI Intelligence", icon: Brain, badge: "AI" },
  { id: "news-feed",      label: "News Feed",       icon: Newspaper },
];

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-[#111111] border-r border-[#1e1e1e] overflow-y-auto z-40">
      {/* Branding strip */}
      <div className="px-4 py-3 border-b border-[#1e1e1e]">
        <p className="text-[10px] uppercase tracking-widest text-[#4ade80] font-semibold">Property Intelligence</p>
        <p className="text-[11px] text-gray-500 mt-0.5">RJ Grero Advisory</p>
      </div>

      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative ${
                isActive
                  ? "bg-[#4ade80]/10 border border-[#4ade80]/30"
                  : "hover:bg-[#1a1a1a] border border-transparent"
              }`}
            >
              {/* Active left bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#4ade80] rounded-r" />
              )}

              <Icon
                size={16}
                className={isActive ? "text-[#4ade80]" : "text-gray-500 group-hover:text-gray-300"}
              />
              <span
                className={`text-sm font-medium flex-1 text-left ${
                  isActive ? "text-[#4ade80]" : "text-gray-400 group-hover:text-gray-200"
                }`}
              >
                {item.label}
              </span>
              {item.badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  item.badge === "AI"
                    ? "bg-[#4ade80]/20 text-[#4ade80]"
                    : "bg-blue-500/20 text-blue-400"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom market pulse */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[#1e1e1e] bg-[#111111]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">Market Pulse</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500">LKR/USD</span>
            <span className="text-[#4ade80] font-medium">330.5</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500">SL Inflation</span>
            <span className="text-yellow-400 font-medium">4.2%</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500">Policy Rate</span>
            <span className="text-[#4ade80] font-medium">8.0%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { Activity, Bell, Settings, User } from "lucide-react";

export default function Navbar() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#111111] border-b border-[#1e1e1e] z-50 flex items-center px-6">
      {/* Logo */}
      <div className="flex items-center gap-2.5 w-64">
        <div className="w-7 h-7 rounded bg-[#4ade80]/20 flex items-center justify-center">
          <Activity size={14} className="text-[#4ade80]" />
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-tight tracking-wide">RJ GRERO</p>
          <p className="text-[9px] text-[#4ade80] uppercase tracking-widest leading-tight">Property Intelligence</p>
        </div>
      </div>

      {/* Center status bar */}
      <div className="flex-1 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
          <span className="text-gray-400">LIVE</span>
        </div>
        <div className="h-4 w-px bg-[#1e1e1e]" />
        <span className="text-xs text-gray-500">{dateStr}</span>
        <div className="h-4 w-px bg-[#1e1e1e]" />
        <span className="text-xs font-mono text-[#4ade80]">{timeStr} IST</span>
        <div className="h-4 w-px bg-[#1e1e1e]" />
        <div className="flex items-center gap-4 text-xs">
          <span className="text-gray-500">LKR <span className="text-white font-medium">330.5</span></span>
          <span className="text-gray-500">USD/SQF <span className="text-[#4ade80] font-medium">↑ 12.5%</span></span>
          <span className="text-gray-500">SL Rate <span className="text-yellow-400 font-medium">8.0%</span></span>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222] transition-colors relative">
          <Bell size={14} className="text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
        </button>
        <button className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222] transition-colors">
          <Settings size={14} className="text-gray-400" />
        </button>
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-[#1e1e1e]">
          <div className="w-8 h-8 rounded-full bg-[#4ade80]/20 flex items-center justify-center">
            <User size={14} className="text-[#4ade80]" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-medium text-white">Rehan Jude</p>
            <p className="text-[10px] text-gray-500">Strategic Advisor</p>
          </div>
        </div>
      </div>
    </header>
  );
}

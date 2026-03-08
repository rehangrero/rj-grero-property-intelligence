"use client";

import { useState } from "react";
import { Search, Bell, User } from "lucide-react";

const regions = ["Global", "Sri Lanka", "UK", "Europe", "Australia", "Singapore", "Malaysia", "SE Asia"];

export default function Navbar() {
  const [activeRegion, setActiveRegion] = useState("Global");

  return (
    <nav className="fixed top-0 w-full h-16 bg-[#141b2d] border-b border-gray-800 flex items-center justify-between px-6 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-[#c9a84c]">RJ Grero</span>
        <span className="text-xl font-bold text-gray-400">Property Intelligence</span>
      </div>

      {/* Center: Search Input */}
      <div className="flex-1 mx-8 max-w-md">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search news, countries, markets..."
            className="w-full pl-10 pr-4 py-2 bg-[#0a0f1e] border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#c9a84c]"
          />
        </div>
      </div>

      {/* Center: Region Filter Pills */}
      <div className="flex items-center gap-2">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeRegion === region
                ? "bg-[#c9a84c] text-[#0a0f1e]"
                : "bg-[#0a0f1e] text-gray-400 hover:text-gray-300"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4 ml-8">
        <button className="p-2 hover:bg-[#1a2235] rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-[#1a2235] rounded-lg transition-colors">
          <User className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </nav>
  );
}

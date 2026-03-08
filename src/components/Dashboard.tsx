'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ArrowUpRight,
  ArrowDownRight,
  Target,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  dailySummary,
  globalSentiment,
  interestRates,
  capitalFlows,
  opportunities,
  risks,
  propertyNews,
  sriLankaData,
  sriLankaDistrictPrices,
} from '@/data/mockData';

const FLAG_MAP: Record<string, string> = {
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'European Union': '🇪🇺',
  'Australia': '🇦🇺',
  'Singapore': '🇸🇬',
  'Sri Lanka': '🇱🇰',
};

type SortKey = 'price' | 'growth' | 'province';

export default function Dashboard() {
  const [expandedNews, setExpandedNews] = useState<string | null>(null);
  const [districtSort, setDistrictSort] = useState<SortKey>('price');

  const gaugeData = [
    { name: 'Sentiment', value: globalSentiment, fill: getSentimentColor(globalSentiment) },
    { name: 'Empty', value: 100 - globalSentiment, fill: '#1a1f2e' },
  ];

  function getSentimentColor(value: number): string {
    if (value < 20) return '#ef4444';
    if (value < 40) return '#f97316';
    if (value < 60) return '#eab308';
    if (value < 80) return '#14b8a6';
    return '#22c55e';
  }

  function getSentimentLabel(value: number): string {
    if (value < 20) return 'Very Negative';
    if (value < 40) return 'Negative';
    if (value < 60) return 'Neutral';
    if (value < 80) return 'Positive';
    return 'Very Positive';
  }

  function getTrendIcon(trend: string) {
    if (trend === 'falling') return <TrendingDown className="w-4 h-4 text-green-500" />;
    if (trend === 'rising') return <TrendingUp className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  }

  function getTrendColor(trend: string): string {
    if (trend === 'falling') return 'text-green-400';
    if (trend === 'rising') return 'text-red-400';
    return 'text-gray-400';
  }

  function getSeverityColor(severity: string): string {
    if (severity === 'high') return 'bg-red-900/80 text-red-200';
    if (severity === 'medium') return 'bg-yellow-900/80 text-yellow-200';
    return 'bg-green-900/80 text-green-200';
  }

  function getMagnitudeColor(magnitude: string): string {
    if (magnitude === 'high') return 'bg-red-600';
    if (magnitude === 'medium') return 'bg-yellow-600';
    return 'bg-green-600';
  }

  function getSentimentDotColor(sentiment: string): string {
    if (sentiment === 'positive') return 'bg-green-500';
    if (sentiment === 'negative') return 'bg-red-500';
    return 'bg-gray-500';
  }

  function getTierStyle(tier: string): string {
    if (tier === 'premium') return 'border-[#c9a84c]/60 bg-[#c9a84c]/5';
    if (tier === 'mid') return 'border-[#2dd4bf]/50 bg-[#2dd4bf]/5';
    if (tier === 'emerging') return 'border-blue-500/50 bg-blue-500/5';
    return 'border-gray-700/50 bg-[#0a0f1e]';
  }

  function getTierBadge(tier: string): string {
    if (tier === 'premium') return 'bg-[#c9a84c]/20 text-[#c9a84c]';
    if (tier === 'mid') return 'bg-teal-900/50 text-teal-300';
    if (tier === 'emerging') return 'bg-blue-900/50 text-blue-300';
    return 'bg-gray-800 text-gray-400';
  }

  const sortedDistricts = [...sriLankaDistrictPrices].sort((a, b) => {
    if (districtSort === 'price') return b.priceUSD - a.priceUSD;
    if (districtSort === 'growth') return b.yoyChange - a.yoyChange;
    return a.province.localeCompare(b.province);
  });

  const provinces = districtSort === 'province'
    ? [...new Set(sortedDistricts.map(d => d.province))]
    : ['All'];

  const topPrice = [...sriLankaDistrictPrices].sort((a, b) => b.priceUSD - a.priceUSD)[0];
  const topGrowth = [...sriLankaDistrictPrices].sort((a, b) => b.yoyChange - a.yoyChange)[0];
  const topHotspot = sriLankaDistrictPrices.filter(d => d.hotspot && d.tier === 'emerging').sort((a, b) => b.yoyChange - a.yoyChange)[0];

  // Prepare Sri Lanka chart data (reverse for chronological order)
  const tourismData = [...sriLankaData.tourismArrivals].reverse().map(d => ({ name: d.month.slice(0, 3), value: d.arrivals }));
  const constructionData = [...sriLankaData.constructionIndex].reverse().map(d => ({ name: d.month.slice(0, 3), value: d.value }));
  const mortgageData = [...sriLankaData.mortgageRates].reverse().map(d => ({ name: d.month.slice(0, 3), value: d.rate }));
  const foreignBuyerData = [...sriLankaData.foreignBuyerSignals].reverse().map(d => ({ name: d.month.slice(0, 3), value: d.score }));

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* SECTION 1: Daily Intelligence Summary */}
      <div className="bg-[#141b2d] rounded-xl p-6 border border-gray-800">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Daily Property Intelligence</h2>
            <p className="text-gray-400 text-sm">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-[#c9a84c] to-transparent rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {dailySummary.keySignals.map((signal, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-[#c9a84c] mt-2 flex-shrink-0" />
              <p className="text-gray-300 text-sm">{signal}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0a0f1e] rounded-lg p-4 border border-teal-900/50">
          <p className="text-xs text-teal-600 font-semibold mb-1 uppercase tracking-wide">Sri Lanka Opportunity</p>
          <p className="text-teal-400 font-medium text-sm">{dailySummary.sriLankaOpportunity}</p>
        </div>
      </div>

      {/* SECTION 2: Two-column grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT COL */}
        <div className="col-span-2 space-y-6">
          {/* Interest Rate Tracker */}
          <div className="bg-[#141b2d] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Global Interest Rate Tracker</h3>
            <div className="grid grid-cols-3 gap-4">
              {interestRates.map((item) => (
                <div key={item.country} className="bg-[#0a0f1e] rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{FLAG_MAP[item.country] || '🌍'}</span>
                      <span className="text-white font-medium text-sm">{item.country}</span>
                    </div>
                    {getTrendIcon(item.trend)}
                  </div>
                  <p className="text-2xl font-bold text-[#c9a84c] mb-1">{item.rate}%</p>
                  <p className={`text-xs ${getTrendColor(item.trend)}`}>
                    Previous: {item.previousRate}% · {item.trend === 'falling' ? '▼' : item.trend === 'stable' ? '–' : '▲'} {item.trend}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Property Sentiment Gauge */}
          <div className="bg-[#141b2d] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Global Property Sentiment</h3>
            <div className="flex items-center justify-center">
              <div className="relative" style={{ width: 280, height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gaugeData}
                      cx="50%"
                      cy="100%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={70}
                      outerRadius={95}
                      dataKey="value"
                      stroke="none"
                    >
                      {gaugeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-4xl font-bold text-white">{globalSentiment}</p>
                  <p className="text-xs text-gray-400 mt-1">{getSentimentLabel(globalSentiment)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Capital Flow Tracker */}
          <div className="bg-[#141b2d] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Capital Flow Signals</h3>
            <div className="space-y-3">
              {capitalFlows.map((flow) => (
                <div key={flow.id} className="flex items-center space-x-4 bg-[#0a0f1e] rounded-lg p-4 border border-gray-700/50">
                  <div className="flex-shrink-0">
                    {flow.direction === 'inflow' ? (
                      <ArrowUpRight className="w-5 h-5 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{flow.signal}</p>
                    <p className="text-gray-500 text-xs mt-1">{flow.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-900/60 text-blue-200 text-xs rounded-full whitespace-nowrap">{flow.region}</span>
                  <span className={`px-3 py-1 ${getMagnitudeColor(flow.magnitude)} text-white text-xs rounded-full`}>
                    {flow.magnitude}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COL */}
        <div className="space-y-6">
          {/* Opportunity Scanner */}
          <div className="bg-[#141b2d] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-[#c9a84c]" />
              <h3 className="text-lg font-bold text-white">Opportunity Scanner</h3>
            </div>
            <div className="space-y-3">
              {opportunities.slice(0, 6).map((opp) => (
                <div key={opp.id} className="bg-[#0a0f1e] rounded-lg p-3 border border-gray-700/50">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-white font-medium text-sm flex-1">{opp.title}</p>
                    <span className="px-2 py-0.5 bg-purple-900/60 text-purple-200 text-xs rounded ml-2 whitespace-nowrap">
                      {opp.region}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mb-2">{opp.description}</p>
                  <div className="w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${opp.confidence}%`,
                        background: opp.confidence >= 80 ? '#22c55e' : opp.confidence >= 60 ? '#c9a84c' : '#f97316',
                      }}
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{opp.confidence}% confidence · {opp.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Monitor */}
          <div className="bg-[#141b2d] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-white">Risk Monitor</h3>
            </div>
            <div className="space-y-3">
              {risks.map((risk) => (
                <div key={risk.id} className="bg-[#0a0f1e] rounded-lg p-3 border border-gray-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 ${getSeverityColor(risk.severity)} text-xs rounded font-semibold`}>
                      {risk.severity.toUpperCase()}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-700/60 text-gray-300 text-xs rounded">{risk.category}</span>
                  </div>
                  <p className="text-white font-medium text-sm mb-1">{risk.title}</p>
                  <p className="text-gray-500 text-xs">{risk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Sri Lanka Market Intelligence */}
      <div className="bg-[#141b2d] rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-6">Sri Lanka Market Intelligence</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#0a0f1e] rounded-lg p-4 border border-gray-700/50">
            <p className="text-gray-300 font-semibold text-sm mb-4">Tourism Arrivals</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={tourismData}>
                <defs>
                  <linearGradient id="colorTourism" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2235" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#141b2d', border: '1px solid #333', borderRadius: 8 }} />
                <Area type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorTourism)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#0a0f1e] rounded-lg p-4 border border-gray-700/50">
            <p className="text-gray-300 font-semibold text-sm mb-4">Construction Activity Index</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={constructionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2235" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#141b2d', border: '1px solid #333', borderRadius: 8 }} />
                <Line type="monotone" dataKey="value" stroke="#c9a84c" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#0a0f1e] rounded-lg p-4 border border-gray-700/50">
            <p className="text-gray-300 font-semibold text-sm mb-4">Mortgage Interest Rates (%)</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={mortgageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2235" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} domain={['dataMin - 0.2', 'dataMax + 0.2']} />
                <Tooltip contentStyle={{ backgroundColor: '#141b2d', border: '1px solid #333', borderRadius: 8 }} />
                <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#0a0f1e] rounded-lg p-4 border border-gray-700/50">
            <p className="text-gray-300 font-semibold text-sm mb-4">Foreign Buyer Signals</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={foreignBuyerData}>
                <defs>
                  <linearGradient id="colorForeign" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2235" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#141b2d', border: '1px solid #333', borderRadius: 8 }} />
                <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorForeign)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECTION 4: Sri Lanka District Price Intelligence */}
      <div className="bg-[#141b2d] rounded-xl p-6 border border-gray-800">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-white">Sri Lanka District Price Intelligence</h3>
            <p className="text-gray-500 text-xs mt-1">Residential property · USD/sqft · Q1 2026 estimates</p>
          </div>
          <div className="flex items-center gap-2">
            {(['price', 'growth', 'province'] as SortKey[]).map((s) => (
              <button
                key={s}
                onClick={() => setDistrictSort(s)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                  districtSort === s
                    ? 'bg-[#c9a84c] text-black'
                    : 'bg-[#0a0f1e] text-gray-400 hover:text-white border border-gray-700/50'
                }`}
              >
                {s === 'price' ? 'By Price' : s === 'growth' ? 'By Growth' : 'By Province'}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0a0f1e] rounded-lg p-4 border border-[#c9a84c]/30">
            <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">Highest Price</p>
            <p className="text-[#c9a84c] text-xl font-bold">{topPrice.district}</p>
            <p className="text-white text-sm font-medium">${topPrice.priceUSD}/sqft</p>
            <p className="text-gray-500 text-xs">LKR {topPrice.priceLKR.toLocaleString()} · {topPrice.province}</p>
          </div>
          <div className="bg-[#0a0f1e] rounded-lg p-4 border border-green-900/40">
            <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">Fastest Growing</p>
            <p className="text-green-400 text-xl font-bold">{topGrowth.district}</p>
            <p className="text-white text-sm font-medium">+{topGrowth.yoyChange}% YoY</p>
            <p className="text-gray-500 text-xs">${topGrowth.priceUSD}/sqft · {topGrowth.province}</p>
          </div>
          <div className="bg-[#0a0f1e] rounded-lg p-4 border border-blue-900/40">
            <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">Emerging Hotspot</p>
            <p className="text-blue-400 text-xl font-bold">{topHotspot?.district}</p>
            <p className="text-white text-sm font-medium">+{topHotspot?.yoyChange}% YoY</p>
            <p className="text-gray-500 text-xs">${topHotspot?.priceUSD}/sqft · {topHotspot?.province}</p>
          </div>
        </div>

        {/* Tier Legend */}
        <div className="flex items-center gap-6 mb-5 pb-4 border-b border-gray-800">
          {[
            { tier: 'premium', label: 'Premium $50+', color: 'bg-[#c9a84c]' },
            { tier: 'mid', label: 'Mid-Range $25–50', color: 'bg-[#2dd4bf]' },
            { tier: 'emerging', label: 'Emerging $15–25', color: 'bg-blue-500' },
            { tier: 'affordable', label: 'Affordable <$15', color: 'bg-gray-600' },
          ].map(({ tier, label, color }) => (
            <div key={tier} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
              <span className="text-gray-400 text-xs">{label}</span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-gray-400 text-xs">Hotspot</span>
          </div>
        </div>

        {/* District Grid */}
        {districtSort === 'province' ? (
          <div className="space-y-5">
            {provinces.map(province => (
              <div key={province}>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">{province} Province</p>
                <div className="grid grid-cols-5 gap-3">
                  {sortedDistricts.filter(d => d.province === province).map(d => (
                    <div key={d.district} className={`rounded-lg p-3 border ${getTierStyle(d.tier)}`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white font-semibold text-sm">{d.district}</p>
                        {d.hotspot && <span className="text-yellow-400 text-xs">★</span>}
                      </div>
                      <p className="text-[#c9a84c] font-bold text-base">${d.priceUSD}</p>
                      <p className="text-gray-500 text-xs">LKR {d.priceLKR.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className={`text-xs font-semibold ${d.yoyChange >= 10 ? 'text-green-400' : d.yoyChange >= 6 ? 'text-teal-400' : 'text-gray-400'}`}>
                          +{d.yoyChange}%
                        </span>
                        <span className="text-gray-600 text-xs">YoY</span>
                      </div>
                      <span className={`inline-block mt-1.5 px-1.5 py-0.5 rounded text-xs ${getTierBadge(d.tier)}`}>
                        {d.tier}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-3">
            {sortedDistricts.map(d => (
              <div key={d.district} className={`rounded-lg p-3 border ${getTierStyle(d.tier)}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-white font-semibold text-sm">{d.district}</p>
                  {d.hotspot && <span className="text-yellow-400 text-xs">★</span>}
                </div>
                <p className="text-[#c9a84c] font-bold text-base">${d.priceUSD}<span className="text-gray-500 text-xs font-normal">/sqft</span></p>
                <p className="text-gray-500 text-xs">LKR {d.priceLKR.toLocaleString()}</p>
                <p className="text-gray-600 text-xs mt-0.5">{d.province}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className={`text-xs font-semibold ${d.yoyChange >= 10 ? 'text-green-400' : d.yoyChange >= 6 ? 'text-teal-400' : 'text-gray-400'}`}>
                    +{d.yoyChange}%
                  </span>
                  <span className="text-gray-600 text-xs">YoY</span>
                </div>
                <span className={`inline-block mt-1.5 px-1.5 py-0.5 rounded text-xs ${getTierBadge(d.tier)}`}>
                  {d.tier}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 5: News Intelligence Feed */}
      <div className="bg-[#141b2d] rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-6">Property News Intelligence</h3>
        <div className="grid grid-cols-3 gap-4">
          {propertyNews.map((news) => (
            <div key={news.id} className="bg-[#0a0f1e] rounded-lg p-4 border border-gray-700/50 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${getSentimentDotColor(news.sentiment)} flex-shrink-0`} />
                <span className="text-gray-500 text-xs">
                  {new Date(news.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <h4 className="text-white font-bold text-sm mb-3 leading-tight">{news.headline}</h4>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="px-2 py-0.5 bg-blue-900/60 text-blue-200 text-xs rounded-full">{news.source}</span>
                <span className="px-2 py-0.5 bg-purple-900/60 text-purple-200 text-xs rounded-full">{news.region}</span>
              </div>

              <p className="text-gray-400 text-xs mb-3 flex-1 leading-relaxed">{news.summary}</p>

              <button
                onClick={() => setExpandedNews(expandedNews === news.id ? null : news.id)}
                className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-xs font-semibold transition-colors mt-auto"
              >
                {expandedNews === news.id ? (
                  <>Hide AI Analysis <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>View AI Analysis <ChevronDown className="w-3 h-3" /></>
                )}
              </button>

              {expandedNews === news.id && (
                <div className="mt-3 pt-3 border-t border-gray-700/50 space-y-2.5">
                  <div>
                    <p className="text-[#c9a84c] text-xs font-semibold mb-0.5">What Happened</p>
                    <p className="text-gray-300 text-xs">{news.aiAnalysis.whatHappened}</p>
                  </div>
                  <div>
                    <p className="text-[#c9a84c] text-xs font-semibold mb-0.5">Why It Matters</p>
                    <p className="text-gray-300 text-xs">{news.aiAnalysis.whyItMatters}</p>
                  </div>
                  <div>
                    <p className="text-[#c9a84c] text-xs font-semibold mb-0.5">Property Impact</p>
                    <p className="text-gray-300 text-xs">{news.aiAnalysis.propertyImpact}</p>
                  </div>
                  <div>
                    <p className="text-teal-500 text-xs font-semibold mb-0.5">Sri Lanka Implication</p>
                    <p className="text-gray-300 text-xs">{news.aiAnalysis.sriLankaImplication}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

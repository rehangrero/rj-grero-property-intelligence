'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import {
  ArrowUpRight, ArrowDownRight, RefreshCw, Clock, X, Database,
  Brain, Zap, ShieldAlert, Target, AlertCircle, Globe,
  ChevronRight, Star, TrendingUp, TrendingDown, Minus, Search, Loader2,
} from 'lucide-react';
import {
  interestRates, capitalFlows, opportunities, risks,
  propertyNews, sriLankaData, sriLankaDistrictPrices, dailySummary, marketMapData,
} from '@/data/mockData';

// ── Types ─────────────────────────────────────────────────────────────────────
type NewsArticle = {
  id: string; headline: string; summary: string; source: string;
  region: string; timestamp: Date | string; sentiment: 'positive' | 'negative' | 'neutral';
  url?: string;
  aiAnalysis: { whatHappened: string; whyItMatters: string; propertyImpact: string; sriLankaImplication: string };
};
type HistoryEntry = { id: string; fetchedAt: string; source: string; articleCount: number; articles: NewsArticle[] };
type SortKey = 'price' | 'growth' | 'score';

// ── Theme constants ───────────────────────────────────────────────────────────
const G = '#4ade80';
const CARD = 'bg-[#161616] border border-[#222]';
const CARD2 = 'bg-[#1a1a1a] border border-[#222]';

// ── Helpers ───────────────────────────────────────────────────────────────────
const sentimentColour = (s: string) =>
  s === 'positive' ? 'text-[#4ade80]' : s === 'negative' ? 'text-red-400' : 'text-yellow-400';

const trendIcon = (t: string) =>
  t === 'rising'  ? <ArrowUpRight size={12} className="text-[#4ade80]" /> :
  t === 'falling' ? <ArrowDownRight size={12} className="text-red-400" /> :
                    <Minus size={12} className="text-yellow-400" />;

const tierBorder = (t: string) =>
  t === 'premium'  ? 'border-purple-500/40 bg-purple-500/5' :
  t === 'mid'      ? 'border-blue-500/40 bg-blue-500/5' :
  t === 'emerging' ? 'border-[#4ade80]/40 bg-[#4ade80]/5' :
                     'border-gray-700 bg-[#1a1a1a]';

const tierBadge = (t: string) =>
  t === 'premium'  ? 'bg-purple-500/20 text-purple-300' :
  t === 'mid'      ? 'bg-blue-500/20 text-blue-300' :
  t === 'emerging' ? 'bg-[#4ade80]/20 text-[#4ade80]' :
                     'bg-gray-700 text-gray-400';

const scoreColour = (s: number) =>
  s >= 8 ? '#4ade80' : s >= 6 ? '#facc15' : s >= 4 ? '#fb923c' : '#f87171';

const sentimentBg = (s: string) =>
  s === 'positive' ? '#4ade80' : s === 'negative' ? '#f87171' : '#facc15';

// ── Static AI data ────────────────────────────────────────────────────────────
const aiInsights = [
  { icon: '🏆', title: 'Top Buy Signal', body: 'Colombo 7 – Cinnamon Gardens remains the strongest capital preservation play. Limited supply, embassy-zone demand, and heritage asset scarcity sustain 14%+ YoY appreciation.', score: 9.1, action: 'STRONG BUY' },
  { icon: '📈', title: 'Emerging Opportunity', body: 'Colombo 2 (Slave Island) is 25% underpriced relative to C3 proximity. Lake-facing plots command 30% uplift. Entry window narrowing as developers move in.', score: 8.7, action: 'BUY' },
  { icon: '⚡', title: 'Growth Momentum', body: 'Galle district showing 18.5% YoY — highest in Southern Province. Expat demand + short-term rental yields (7–9%) make it a dual-income play.', score: 8.6, action: 'BUY' },
  { icon: '🔄', title: 'Recovery Play', body: 'Jaffna land values accelerating at 15.6% YoY post-conflict recovery. Diaspora remittance-driven demand creating a structural floor. Early mover advantage window open.', score: 7.6, action: 'ACCUMULATE' },
  { icon: '⚠️', title: 'Risk Watchlist', body: 'Hambantota and Northern Province remote districts: limited exit liquidity, illiquid secondary market. Land banking only — not suitable for short-term capital deployment.', score: 4.2, action: 'HOLD / AVOID' },
];

const riskMatrix = [
  { label: 'Currency Depreciation', level: 65, colour: '#fb923c' },
  { label: 'Liquidity Risk',        level: 45, colour: '#facc15' },
  { label: 'Regulatory Risk',       level: 30, colour: '#4ade80' },
  { label: 'Macro / Inflation',     level: 55, colour: '#fb923c' },
  { label: 'Demand Risk',           level: 20, colour: '#4ade80' },
  { label: 'Title / Legal Risk',    level: 40, colour: '#facc15' },
];

const marketSentimentData = [
  { month: 'Oct', score: 58 }, { month: 'Nov', score: 62 }, { month: 'Dec', score: 70 },
  { month: 'Jan', score: 67 }, { month: 'Feb', score: 75 }, { month: 'Mar', score: 81 },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-[#4ade80] rounded" />
        <div>
          <h2 className="text-white font-semibold text-base">{title}</h2>
          {subtitle && <p className="text-gray-500 text-xs mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function StatCard({ label, value, sub, trend, colour }: {
  label: string; value: string; sub?: string; trend?: 'up' | 'down' | 'flat'; colour?: string;
}) {
  return (
    <div className={`${CARD} rounded-xl p-4`}>
      <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-2xl font-bold ${colour ?? 'text-white'}`}>{value}</p>
      {sub && (
        <p className={`text-xs mt-1 flex items-center gap-1 ${
          trend === 'up' ? 'text-[#4ade80]' : trend === 'down' ? 'text-red-400' : 'text-gray-500'
        }`}>
          {trend === 'up' && <ArrowUpRight size={12} />}
          {trend === 'down' && <ArrowDownRight size={12} />}
          {sub}
        </p>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Dashboard({ activeSection }: { activeSection: string }) {
  const [expandedNews, setExpandedNews] = useState<string | null>(null);
  const [districtSort, setDistrictSort] = useState<SortKey>('score');
  const [colomboFilter, setColomboFilter] = useState<'all' | 'colombo' | 'other'>('all');
  const [news, setNews] = useState<NewsArticle[]>(propertyNews as NewsArticle[]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [newsSource, setNewsSource] = useState<string>('mock');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<HistoryEntry | null>(null);
  const [newsSearch, setNewsSearch] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rjgrero_news_history');
      if (saved) setHistory(JSON.parse(saved));
    } catch { /* noop */ }
    fetchNews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to section when sidebar tab changes
  useEffect(() => {
    if (!activeSection || activeSection === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const el = document.getElementById(activeSection);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [activeSection]);

  const fetchNews = useCallback(async (force = false) => {
    setIsRefreshing(true);
    try {
      const res = await fetch(force ? '/api/news?force=true' : '/api/news');
      const data = await res.json();
      if (data.success && data.articles?.length > 0) {
        const entry: HistoryEntry = {
          id: Date.now().toString(),
          fetchedAt: new Date().toISOString(),
          source: data.source || 'unknown',
          articleCount: data.articles.length,
          articles: data.articles,
        };
        setNews(data.articles);
        setLastUpdated(new Date().toLocaleTimeString());
        setNewsSource((data.source || 'mock').replace('_cached', ''));
        setHistory(prev => {
          const updated = [entry, ...prev].slice(0, 10);
          localStorage.setItem('rjgrero_news_history', JSON.stringify(updated));
          return updated;
        });
      }
    } catch (e) { console.error(e); }
    finally { setIsRefreshing(false); }
  }, []);

  const analyzeArticle = useCallback(async (article: NewsArticle) => {
    setAnalyzingId(article.id);
    try {
      const res = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: article.headline, summary: article.summary }),
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setNews(prev => prev.map(a => a.id === article.id ? { ...a, aiAnalysis: data.analysis } : a));
      }
    } catch { /* noop */ }
    finally { setAnalyzingId(null); }
  }, []);

  // Auto-refresh news every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => fetchNews(), 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  // District data
  const sortedDistricts = [...sriLankaDistrictPrices]
    .filter(d => colomboFilter === 'all' ? true : colomboFilter === 'colombo' ? d.area === 'colombo' : d.area === 'other')
    .sort((a, b) =>
      districtSort === 'price'  ? b.priceUSD - a.priceUSD :
      districtSort === 'growth' ? b.yoyChange - a.yoyChange :
      (b.aiScore ?? 0) - (a.aiScore ?? 0)
    );

  const colomboDistricts = sriLankaDistrictPrices
    .filter(d => d.area === 'colombo')
    .sort((a, b) => b.priceUSD - a.priceUSD);

  // Chart data derived from real mockData
  const interestRateChart = interestRates.map(r => ({ name: r.currency, rate: r.rate }));
  const tourismChart = sriLankaData.tourismArrivals.slice(0, 6).reverse().map(t => ({ month: t.month.substring(0, 3), arrivals: Math.round(t.arrivals / 1000) }));
  const mortgageChart = sriLankaData.mortgageRates.slice(0, 6).reverse().map(m => ({ month: m.month.substring(0, 3), rate: m.rate }));
  const globalSentimentChart = marketMapData.map(m => ({
    name: m.country.substring(0, 6),
    score: m.sentiment === 'positive' ? 78 : m.sentiment === 'negative' ? 35 : 55,
    sentiment: m.sentiment,
  }));

  const displayNews = selectedHistory ? selectedHistory.articles : news;

  const uniqueRegions = [...new Set(displayNews.map(a => a.region).filter(Boolean))].sort();

  const filteredNews = displayNews.filter(a => {
    const q = newsSearch.toLowerCase();
    const searchMatch = !q || a.headline.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q);
    const sentimentMatch = sentimentFilter === 'all' || a.sentiment === sentimentFilter;
    const regionMatch = regionFilter === 'all' || a.region === regionFilter;
    return searchMatch && sentimentMatch && regionMatch;
  });

  const needsAnalysis = (a: NewsArticle) =>
    !a.aiAnalysis.whyItMatters || a.aiAnalysis.whyItMatters === '';

  const sourceBadgeClass = (source: string) => {
    if (['Economy Next', 'FT Sri Lanka'].includes(source)) return 'bg-[#4ade80]/15 text-[#4ade80]';
    if (['PropertyGuru', 'Straits Times'].includes(source)) return 'bg-blue-500/15 text-blue-400';
    if (['Reuters', 'CNBC', 'CNBC Real Estate'].includes(source)) return 'bg-orange-500/15 text-orange-400';
    if (['The Guardian'].includes(source)) return 'bg-purple-500/15 text-purple-400';
    if (['Arabian Business'].includes(source)) return 'bg-amber-500/15 text-amber-400';
    return 'bg-gray-700/60 text-gray-400';
  };

  return (
    <div className="p-6 min-h-screen bg-[#0d0d0d] text-white">

      {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
      <Section id="dashboard" title="Market Overview" subtitle="Real-time Sri Lanka property intelligence dashboard">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard label="SL Market Score"  value="81/100"   sub="+6 pts MoM"      trend="up"   colour="text-[#4ade80]" />
          <StatCard label="LKR / USD"        value="330.5"    sub="Stable ±0.3%"    trend="flat" />
          <StatCard label="Colombo 7 PSF"    value="$150"     sub="+14.2% YoY"      trend="up"   colour="text-[#4ade80]" />
          <StatCard label="SL Policy Rate"   value="9.5%"     sub="↓ from 10% (Q4)" trend="down" colour="text-yellow-400" />
        </div>

        {/* Key signals from dailySummary */}
        <div className={`${CARD} rounded-xl p-4 mb-4`}>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={13} className="text-[#4ade80]" />
            <p className="text-xs text-gray-400 uppercase tracking-wider">Today's Key Signals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {dailySummary.keySignals.map((signal: string, i: number) => (
              <div key={i} className={`${CARD2} rounded-lg p-3 flex items-start gap-2`}>
                <ChevronRight size={12} className="text-[#4ade80] mt-0.5 shrink-0" />
                <p className="text-xs text-gray-300">{signal}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SL opportunity banner */}
        <div className="rounded-xl border border-[#4ade80]/20 bg-[#4ade80]/5 p-4">
          <div className="flex items-start gap-3">
            <Target size={16} className="text-[#4ade80] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#4ade80] uppercase tracking-wider mb-1">Sri Lanka Opportunity Window</p>
              <p className="text-sm text-gray-300">{dailySummary.sriLankaOpportunity}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── GLOBAL SIGNALS ────────────────────────────────────────────────── */}
      <Section id="global-signals" title="Global Market Signals" subtitle="Cross-border sentiment and capital movement indicators">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`${CARD} rounded-xl p-4`}>
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Market Sentiment Index</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={globalSentimentChart} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {globalSentimentChart.map((entry, i) => (
                    <Cell key={i} fill={sentimentBg(entry.sentiment)} opacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {marketMapData.slice(0, 5).map((m, i) => (
              <div key={i} className={`${CARD} rounded-xl p-3 flex items-center gap-3`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{m.country}</p>
                    <span className={`text-xs font-bold ${sentimentColour(m.sentiment)}`}>{m.sentiment.toUpperCase()}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{m.headline}</p>
                  <div className="mt-1.5 w-full bg-[#222] rounded-full h-1">
                    <div className="h-1 rounded-full" style={{ width: m.sentiment === 'positive' ? '78%' : m.sentiment === 'negative' ? '35%' : '55%', background: sentimentBg(m.sentiment) }} />
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${m.capitalFlow === 'inflow' ? 'bg-[#4ade80]/20 text-[#4ade80]' : 'bg-red-500/20 text-red-400'}`}>
                  {m.capitalFlow === 'inflow' ? '↑ INFLOW' : '↓ OUTFLOW'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── SRI LANKA INTEL ───────────────────────────────────────────────── */}
      <Section id="sri-lanka" title="Sri Lanka Market Intelligence" subtitle="Macro indicators, tourism data, and construction trends">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className={`${CARD} rounded-xl p-4`}>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">Tourism Arrivals</p>
            <p className="text-xl font-bold text-white">250K</p>
            <p className="text-xs text-[#4ade80] mt-1 flex items-center gap-1"><ArrowUpRight size={12} />Mar 2026 peak</p>
          </div>
          <div className={`${CARD} rounded-xl p-4`}>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">Construction Index</p>
            <p className="text-xl font-bold text-white">68</p>
            <p className="text-xs text-[#4ade80] mt-1 flex items-center gap-1"><ArrowUpRight size={12} />+13 YoY</p>
          </div>
          <div className={`${CARD} rounded-xl p-4`}>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">Mortgage Rate</p>
            <p className="text-xl font-bold text-white">9.5%</p>
            <p className="text-xs text-[#4ade80] mt-1 flex items-center gap-1"><ArrowDownRight size={12} />↓ from 10.4%</p>
          </div>
          <div className={`${CARD} rounded-xl p-4`}>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">Foreign Buyer Score</p>
            <p className="text-xl font-bold text-white">78/100</p>
            <p className="text-xs text-[#4ade80] mt-1 flex items-center gap-1"><ArrowUpRight size={12} />+40 pts YoY</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`${CARD} rounded-xl p-4`}>
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Monthly Tourism Arrivals (000s)</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={tourismChart}>
                <defs>
                  <linearGradient id="tourGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={G} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={G} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}K arrivals`]} />
                <Area type="monotone" dataKey="arrivals" stroke={G} fill="url(#tourGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className={`${CARD} rounded-xl p-4`}>
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Mortgage Rate Trend (%)</p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={mortgageChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[9, 11]} tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}%`]} />
                <Line type="monotone" dataKey="rate" stroke="#fb923c" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      {/* ── COLOMBO 1–10 MAP ──────────────────────────────────────────────── */}
      <Section id="colombo-map" title="Colombo District Price Map" subtitle="Granular pricing intelligence — Colombo 1 through 10">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className={`${CARD} rounded-xl p-4 text-center`}>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Highest PSF</p>
            <p className="text-2xl font-bold text-[#4ade80] mt-1">$150</p>
            <p className="text-xs text-gray-500 mt-0.5">Colombo 7</p>
          </div>
          <div className={`${CARD} rounded-xl p-4 text-center`}>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Avg YoY Growth</p>
            <p className="text-2xl font-bold text-[#4ade80] mt-1">+11.0%</p>
            <p className="text-xs text-gray-500 mt-0.5">Across all 10 districts</p>
          </div>
          <div className={`${CARD} rounded-xl p-4 text-center`}>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Best AI Score</p>
            <p className="text-2xl font-bold text-[#4ade80] mt-1">9.1</p>
            <p className="text-xs text-gray-500 mt-0.5">Colombo 7</p>
          </div>
        </div>

        <div className={`${CARD} rounded-xl p-4 mb-4`}>
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Price per sqft (USD)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={colomboDistricts.map(d => ({ name: d.district.split('–')[0].trim(), price: d.priceUSD }))} barSize={30}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, fontSize: 12 }} formatter={(v) => [`$${v}/sqft`]} />
              <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                {colomboDistricts.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? '#4ade80' : i <= 2 ? '#22c55e' : i <= 5 ? '#16a34a' : '#166534'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {colomboDistricts.map((d, i) => (
            <div key={i} className={`rounded-xl border p-4 ${tierBorder(d.tier)}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-white">{d.district}</p>
                  <p className="text-[11px] text-gray-500">{d.province} Province</p>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${tierBadge(d.tier)}`}>{d.tier.toUpperCase()}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 my-2">
                <div><p className="text-[10px] text-gray-500">USD/sqft</p><p className="text-sm font-bold text-white">${d.priceUSD}</p></div>
                <div><p className="text-[10px] text-gray-500">LKR/sqft</p><p className="text-sm font-bold text-white">{d.priceLKR.toLocaleString()}</p></div>
                <div>
                  <p className="text-[10px] text-gray-500">YoY</p>
                  <p className={`text-sm font-bold flex items-center gap-0.5 ${d.yoyChange > 0 ? 'text-[#4ade80]' : 'text-red-400'}`}>
                    {trendIcon(d.trend)}{d.yoyChange}%
                  </p>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-gray-500">AI Score</span>
                  <span className="text-[11px] font-bold" style={{ color: scoreColour(d.aiScore ?? 5) }}>{d.aiScore ?? 5} / 10</span>
                </div>
                <div className="w-full bg-[#222] rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: `${((d.aiScore ?? 5) / 10) * 100}%`, background: scoreColour(d.aiScore ?? 5) }} />
                </div>
              </div>
              {d.notes && <p className="text-[11px] text-gray-500 italic leading-relaxed">{d.notes}</p>}
              {d.hotspot && (
                <div className="mt-2 flex items-center gap-1">
                  <Star size={10} className="text-yellow-400" />
                  <span className="text-[10px] text-yellow-400 font-medium">AI-flagged hotspot</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ── ALL DISTRICTS ─────────────────────────────────────────────────── */}
      <Section id="sri-lanka-districts" title="All District Price Intelligence" subtitle="Full Sri Lanka coverage — 25 districts with AI scoring">
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex bg-[#1a1a1a] border border-[#222] rounded-lg p-0.5">
            {(['all', 'colombo', 'other'] as const).map(f => (
              <button key={f} onClick={() => setColomboFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${colomboFilter === f ? 'bg-[#4ade80]/20 text-[#4ade80]' : 'text-gray-500 hover:text-gray-300'}`}>
                {f === 'all' ? 'All Districts' : f === 'colombo' ? 'Colombo 1–10' : 'Other Districts'}
              </button>
            ))}
          </div>
          <div className="flex bg-[#1a1a1a] border border-[#222] rounded-lg p-0.5 ml-auto">
            {(['score', 'price', 'growth'] as const).map(s => (
              <button key={s} onClick={() => setDistrictSort(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${districtSort === s ? 'bg-[#4ade80]/20 text-[#4ade80]' : 'text-gray-500 hover:text-gray-300'}`}>
                {s === 'score' ? 'AI Score' : s === 'price' ? 'By Price' : 'By Growth'}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedDistricts.map((d, i) => (
            <div key={i} className={`rounded-xl border p-3 ${tierBorder(d.tier)}`}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-white">{d.district}</p>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${tierBadge(d.tier)}`}>{d.tier.toUpperCase()}</span>
              </div>
              <p className="text-[10px] text-gray-500 mb-2">{d.province}</p>
              <div className="grid grid-cols-3 gap-1">
                <div><p className="text-[9px] text-gray-600">USD/sqft</p><p className="text-xs font-bold text-white">${d.priceUSD}</p></div>
                <div>
                  <p className="text-[9px] text-gray-600">YoY</p>
                  <p className={`text-xs font-bold flex items-center gap-0.5 ${d.yoyChange > 0 ? 'text-[#4ade80]' : 'text-red-400'}`}>
                    {trendIcon(d.trend)}{d.yoyChange}%
                  </p>
                </div>
                <div><p className="text-[9px] text-gray-600">AI Score</p><p className="text-xs font-bold" style={{ color: scoreColour(d.aiScore ?? 5) }}>{d.aiScore ?? '–'}</p></div>
              </div>
              {d.hotspot && <div className="mt-2 flex items-center gap-1"><Star size={9} className="text-yellow-400" /><span className="text-[9px] text-yellow-400">Hotspot</span></div>}
            </div>
          ))}
        </div>
      </Section>

      {/* ── INTEREST RATES ────────────────────────────────────────────────── */}
      <Section id="interest-rates" title="Interest Rates & Monetary Policy" subtitle="Global central bank rates affecting property financing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`${CARD} rounded-xl p-4`}>
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Policy Rate Comparison (%)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={interestRateChart} layout="vertical" barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#999', fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}%`]} />
                <Bar dataKey="rate" fill={G} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {interestRates.map((r, i) => (
              <div key={i} className={`${CARD} rounded-xl p-3 flex items-center gap-3`}>
                <div className="w-9 h-9 rounded-lg bg-[#222] flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {r.country.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-white">{r.country}</p>
                    <p className="text-sm font-bold text-[#4ade80]">{r.rate}%</p>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] ${(r.trend as string) === 'falling' ? 'text-[#4ade80]' : (r.trend as string) === 'rising' ? 'text-red-400' : 'text-gray-500'}`}>
                      {(r.trend as string) === 'falling' ? '↓ Falling' : (r.trend as string) === 'rising' ? '↑ Rising' : '→ Stable'}
                    </span>
                    <span className="text-[10px] text-gray-600">Prev: {r.previousRate}%</span>
                    <span className="text-[10px] text-gray-600">{r.currency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CAPITAL FLOWS ─────────────────────────────────────────────────── */}
      <Section id="capital-flows" title="Capital Flows & FDI Tracker" subtitle="Foreign capital movement into global property markets">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {capitalFlows.map((c, i) => (
            <div key={i} className={`${CARD} rounded-xl p-4 flex items-start gap-3`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${c.direction === 'inflow' ? 'bg-[#4ade80]/10' : 'bg-red-500/10'}`}>
                {c.direction === 'inflow'
                  ? <TrendingUp size={16} className="text-[#4ade80]" />
                  : <TrendingDown size={16} className="text-red-400" />}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{c.signal}</p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${c.magnitude === 'high' ? 'bg-[#4ade80]/20 text-[#4ade80]' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {c.magnitude?.toUpperCase()}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">{c.region}</p>
                <p className="text-xs text-gray-500 mt-1">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── RISK MONITOR ──────────────────────────────────────────────────── */}
      <Section id="risk-monitor" title="Risk Monitor" subtitle="Macro and property-specific risk exposure across key markets">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`${CARD} rounded-xl p-4`}>
            <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider">Sri Lanka Risk Matrix</p>
            <div className="space-y-3">
              {riskMatrix.map((r, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{r.label}</span>
                    <span style={{ color: r.colour }} className="font-medium">{r.level}%</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${r.level}%`, background: r.colour }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {risks.map((r, i) => (
              <div key={i} className={`${CARD} rounded-xl p-3`}>
                <div className="flex items-start gap-2">
                  <AlertCircle size={13} className={`shrink-0 mt-0.5 ${r.severity === 'high' ? 'text-red-400' : r.severity === 'medium' ? 'text-yellow-400' : 'text-[#4ade80]'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{r.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.description}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{r.region} · {r.category}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                    r.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                    r.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-[#4ade80]/20 text-[#4ade80]'}`}>{r.severity?.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── OPPORTUNITIES ─────────────────────────────────────────────────── */}
      <Section id="opportunities" title="Acquisition Opportunities" subtitle="Screened, scored, and AI-ranked live investment targets">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {opportunities.map((o, i) => (
            <div key={i} className={`${CARD} rounded-xl p-4`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-white">{o.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{o.region} · {o.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-gray-500">Confidence</p>
                  <p className="text-base font-bold" style={{ color: scoreColour((o.confidence / 10)) }}>{o.confidence}%</p>
                </div>
              </div>
              <div className="w-full bg-[#222] rounded-full h-1 mb-3">
                <div className="h-1 rounded-full bg-[#4ade80]" style={{ width: `${o.confidence}%` }} />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{o.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── AI INTELLIGENCE ───────────────────────────────────────────────── */}
      <Section id="ai-analysis" title="AI Intelligence Panel" subtitle="Machine-learning driven property insights, deal scoring, and risk assessment">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Sentiment gauge */}
          <div className={`${CARD} rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <Brain size={14} className="text-[#4ade80]" />
              <p className="text-xs text-gray-400 uppercase tracking-wider">AI Market Sentiment</p>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <p className="text-4xl font-bold text-[#4ade80]">81</p>
              <p className="text-sm text-gray-500 mb-1">/ 100</p>
            </div>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">BULLISH — Property market entering recovery phase. Diaspora capital + rate cuts creating demand surge.</p>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={marketSentimentData}>
                <defs>
                  <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={G} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={G} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="score" stroke={G} fill="url(#aiGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Deal signals */}
          <div className={`${CARD} rounded-xl p-4 lg:col-span-2`}>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-[#4ade80]" />
              <p className="text-xs text-gray-400 uppercase tracking-wider">Live Deal Signals</p>
            </div>
            <div className="space-y-2">
              {aiInsights.map((insight, i) => (
                <div key={i} className={`${CARD2} rounded-lg p-3 flex items-start gap-3`}>
                  <span className="text-base mt-0.5">{insight.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-semibold text-white">{insight.title}</p>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                        insight.action === 'STRONG BUY' ? 'bg-[#4ade80]/20 text-[#4ade80]' :
                        insight.action === 'BUY' ? 'bg-blue-500/20 text-blue-400' :
                        insight.action === 'ACCUMULATE' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'}`}>{insight.action}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{insight.body}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[9px] text-gray-600">Score</p>
                    <p className="text-sm font-bold" style={{ color: scoreColour(insight.score) }}>{insight.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk matrix */}
        <div className={`${CARD} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert size={14} className="text-[#4ade80]" />
            <p className="text-xs text-gray-400 uppercase tracking-wider">AI Risk Matrix — Sri Lanka Property</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {riskMatrix.map((r, i) => (
              <div key={i} className={`${CARD2} rounded-lg p-3`}>
                <p className="text-[11px] text-gray-400 mb-2">{r.label}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#222] rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${r.level}%`, background: r.colour }} />
                  </div>
                  <span className="text-xs font-bold shrink-0" style={{ color: r.colour }}>{r.level}%</span>
                </div>
                <p className="text-[10px] text-gray-600 mt-1">{r.level < 35 ? 'Low risk' : r.level < 60 ? 'Moderate' : 'Elevated'}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── NEWS FEED ─────────────────────────────────────────────────────── */}
      <Section id="news-feed" title="Property News Feed" subtitle="Live intelligence from global property markets">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button onClick={() => fetchNews(true)} disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-[#4ade80]/20 hover:bg-[#4ade80]/30 border border-[#4ade80]/40 rounded-lg text-[#4ade80] text-xs font-semibold transition-all disabled:opacity-50">
            <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Fetching...' : 'Refresh News'}
          </button>
          <button onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-[#222] rounded-lg text-gray-400 text-xs font-semibold transition-all">
            <Database size={12} /> History ({history.length})
          </button>
          {lastUpdated && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Clock size={11} />
              <span>Updated {lastUpdated}</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                newsSource === 'firecrawl' ? 'bg-[#4ade80]/20 text-[#4ade80]' :
                newsSource === 'mock' ? 'bg-gray-700 text-gray-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {newsSource === 'firecrawl' ? 'LIVE' : newsSource === 'mock' ? 'MOCK' : newsSource.toUpperCase()}
              </span>
            </div>
          )}
          {selectedHistory && (
            <button onClick={() => setSelectedHistory(null)} className="ml-auto flex items-center gap-1 text-xs text-yellow-400">
              <X size={12} /> Exit history view
            </button>
          )}
        </div>

        {/* ── Search + Filters ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={newsSearch}
              onChange={e => setNewsSearch(e.target.value)}
              placeholder="Search headlines and summaries..."
              className="w-full bg-[#1a1a1a] border border-[#222] rounded-lg pl-8 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#4ade80]/40 transition-colors"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Sentiment filter */}
            <div className="flex bg-[#1a1a1a] border border-[#222] rounded-lg p-0.5">
              {(['all', 'positive', 'negative', 'neutral'] as const).map(s => (
                <button key={s} onClick={() => setSentimentFilter(s)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all capitalize ${sentimentFilter === s ? 'bg-[#4ade80]/20 text-[#4ade80]' : 'text-gray-500 hover:text-gray-300'}`}>
                  {s === 'all' ? 'All' : s}
                </button>
              ))}
            </div>
            {/* Region filter */}
            <select
              value={regionFilter}
              onChange={e => setRegionFilter(e.target.value)}
              className="bg-[#1a1a1a] border border-[#222] rounded-lg px-3 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-[#4ade80]/40 cursor-pointer"
            >
              <option value="all">All Regions</option>
              {uniqueRegions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <span className="text-[11px] text-gray-600 ml-auto">{filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* ── Loading skeleton ──────────────────────────────────────────── */}
        {isRefreshing && news.length === 0 && (
          <div className="space-y-3 mb-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`${CARD} rounded-xl p-4 animate-pulse`}>
                <div className="h-2.5 bg-[#222] rounded w-1/4 mb-3" />
                <div className="h-4 bg-[#222] rounded w-3/4 mb-2" />
                <div className="h-3 bg-[#222] rounded w-full mb-1" />
                <div className="h-3 bg-[#222] rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {filteredNews.map((article, i) => {
            const a = article;
            const isExpanded = expandedNews === a.id;
            return (
              <div key={a.id ?? i} className={`${CARD} rounded-xl p-4`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className={`text-[9px] font-bold ${sentimentColour(a.sentiment)}`}>{a.sentiment.toUpperCase()}</span>
                      <span className="text-[10px] text-gray-700">·</span>
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${sourceBadgeClass(a.source)}`}>{a.source}</span>
                      <span className="text-[10px] text-gray-700">·</span>
                      <span className="text-[10px] text-gray-500">{a.region}</span>
                    </div>
                    <button onClick={() => setExpandedNews(isExpanded ? null : a.id)} className="text-left w-full">
                      <p className="text-sm font-semibold text-white hover:text-[#4ade80] transition-colors leading-snug">{a.headline}</p>
                    </button>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{a.summary}</p>
                  </div>
                  <button onClick={() => setExpandedNews(isExpanded ? null : a.id)}
                    className="shrink-0 w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222] transition-colors">
                    <ChevronRight size={14} className={`text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {isExpanded && a.aiAnalysis && (
                  <div className="mt-4 pt-4 border-t border-[#222] grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { label: '📋 What Happened',    content: a.aiAnalysis.whatHappened },
                      { label: '💡 Why It Matters',   content: a.aiAnalysis.whyItMatters },
                      { label: '🏠 Property Impact',  content: a.aiAnalysis.propertyImpact },
                      { label: '🇱🇰 SL Implication', content: a.aiAnalysis.sriLankaImplication },
                    ].filter(item => item.content).map((item, j) => (
                      <div key={j} className={`${CARD2} rounded-lg p-3`}>
                        <p className="text-[10px] font-semibold text-gray-400 mb-1">{item.label}</p>
                        <p className="text-xs text-gray-300 leading-relaxed">{item.content}</p>
                      </div>
                    ))}

                    {/* On-demand AI analysis button */}
                    {needsAnalysis(a) && (
                      <div className="col-span-full">
                        <button
                          onClick={() => analyzeArticle(a)}
                          disabled={analyzingId === a.id}
                          className="flex items-center gap-2 px-4 py-2 bg-[#4ade80]/10 hover:bg-[#4ade80]/20 border border-[#4ade80]/30 rounded-lg text-[#4ade80] text-xs font-semibold transition-all disabled:opacity-50"
                        >
                          {analyzingId === a.id
                            ? <><Loader2 size={12} className="animate-spin" /> Analysing with AI...</>
                            : <><Brain size={12} /> Generate AI Analysis</>}
                        </button>
                      </div>
                    )}

                    {a.url && (
                      <div className="col-span-full">
                        <a href={a.url} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-[#4ade80] hover:underline flex items-center gap-1">
                          <Globe size={11} /> Read full article →
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── HISTORY PANEL ─────────────────────────────────────────────────── */}
      {showHistory && (
        <div className="fixed inset-y-0 right-0 w-80 bg-[#111111] border-l border-[#1e1e1e] z-50 flex flex-col shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-[#1e1e1e]">
            <p className="text-sm font-semibold text-white">News History</p>
            <button onClick={() => setShowHistory(false)} className="w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222]">
              <X size={14} className="text-gray-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {history.length === 0 ? (
              <p className="text-xs text-gray-500 text-center mt-8">No history yet. Click Refresh to start saving snapshots.</p>
            ) : history.map((h) => (
              <button key={h.id} onClick={() => { setSelectedHistory(h); setShowHistory(false); }}
                className={`w-full ${CARD} rounded-lg p-3 text-left hover:border-[#4ade80]/30 transition-all`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    h.source === 'firecrawl' || h.source === 'gnews' ? 'bg-[#4ade80]/20 text-[#4ade80]' : 'bg-gray-700 text-gray-400'
                  }`}>
                    {h.source === 'firecrawl' || h.source === 'gnews' ? 'LIVE' : 'MOCK'}
                  </span>
                  <span className="text-[10px] text-gray-600">{h.articleCount} articles</span>
                </div>
                <p className="text-xs text-gray-400">{new Date(h.fetchedAt).toLocaleString()}</p>
              </button>
            ))}
          </div>
          {history.length > 0 && (
            <div className="p-3 border-t border-[#1e1e1e]">
              <button onClick={() => { setHistory([]); localStorage.removeItem('rjgrero_news_history'); }}
                className="w-full py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-all">
                Clear All History
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

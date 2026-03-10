# RJ Grero Property Intelligence — User Guide

> A real-time property market dashboard for Sri Lanka and global markets, powered by live web scraping (Firecrawl) and AI analysis (GPT-4o mini).

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Dashboard Layout](#2-dashboard-layout)
3. [Sidebar Navigation](#3-sidebar-navigation)
4. [Sections Explained](#4-sections-explained)
   - [Overview](#41-overview)
   - [Global Signals](#42-global-signals)
   - [Sri Lanka Intel](#43-sri-lanka-intel)
   - [Colombo 1–10](#44-colombo-110)
   - [Interest Rates](#45-interest-rates)
   - [Capital Flows](#46-capital-flows)
   - [Risk Monitor](#47-risk-monitor)
   - [Opportunities](#48-opportunities)
   - [AI Intelligence](#49-ai-intelligence)
   - [News Feed](#410-news-feed)
5. [News Feed — Detailed Guide](#5-news-feed--detailed-guide)
6. [Environment Variables](#6-environment-variables)
7. [API Endpoints](#7-api-endpoints)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| npm | 9+ |
| Firecrawl API key | Required for live news |
| OpenAI API key | Required for AI analysis |
| FRED API key | Required for live interest rates |

### Installation

```bash
# Clone the repo
git clone https://github.com/rehangrero/rj-grero-property-intelligence.git
cd rj-grero-property-intelligence

# Install dependencies
npm install
```

### Environment Setup

Create `.env.local` in the project root (never commit this file):

```env
# Firecrawl — scrapes 8 live property news sources
FIRECRAWL_API_KEY=fc-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# FRED — Federal Reserve Economic Data (interest rates)
FRED_API_KEY=your_fred_api_key_here

# OpenAI — article extraction + AI property analysis
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Get your keys:
- **Firecrawl**: https://firecrawl.dev → Dashboard → API Keys
- **FRED**: https://fred.stlouisfed.org/docs/api/api_key.html (free)
- **OpenAI**: https://platform.openai.com/api-keys

### Running the App

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

> **Without API keys**, the dashboard still works using built-in mock data — no live scraping or AI calls are made.

---

## 2. Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  NAVBAR  — RJ Grero Property Intelligence          [live indicator] │
├──────────────┬──────────────────────────────────────────────────────┤
│              │                                                       │
│   SIDEBAR    │                MAIN CONTENT AREA                     │
│              │                                                       │
│  Navigation  │   Charts · Tables · Cards · News · AI Analysis       │
│  10 sections │                                                       │
│              │                                                       │
│ ─────────── │                                                       │
│ Market Pulse │                                                       │
│  LKR/USD     │                                                       │
│  Inflation   │                                                       │
│  Policy Rate │                                                       │
└──────────────┴──────────────────────────────────────────────────────┘
```

The layout has three persistent zones:

| Zone | Description |
|------|-------------|
| **Navbar** (top) | App title and live status indicator |
| **Sidebar** (left) | Navigation menu + Market Pulse widget |
| **Main Area** (right) | All content — changes per selected section |

---

## 3. Sidebar Navigation

The sidebar is always visible. Click any item to jump to that section.

| Icon | Label | Badge | Purpose |
|------|-------|-------|---------|
| 🗂️ | Overview | — | Summary KPIs and daily briefing |
| 🌐 | Global Signals | — | USD, GBP, EUR interest rate charts |
| 📍 | Sri Lanka Intel | — | Local market metrics and district data |
| 🏢 | Colombo 1–10 | **NEW** | Per-district price map for Colombo zones |
| 📈 | Interest Rates | — | Fed, BoE, ECB rate trend charts |
| ↔️ | Capital Flows | — | Investment flow data by region |
| 🛡️ | Risk Monitor | — | Geopolitical and macro risk signals |
| 🎯 | Opportunities | — | Ranked property investment opportunities |
| 🧠 | AI Intelligence | **AI** | On-demand GPT analysis of market conditions |
| 📰 | News Feed | — | Live-scraped news from 8 global sources |

### Market Pulse Widget

At the bottom of the sidebar, a persistent widget shows:

| Metric | Description |
|--------|-------------|
| **LKR/USD** | Sri Lankan Rupee to US Dollar exchange rate |
| **SL Inflation** | Current Sri Lanka inflation rate |
| **Policy Rate** | Central Bank of Sri Lanka policy rate |

The green pulsing dot indicates the dashboard is live.

---

## 4. Sections Explained

### 4.1 Overview

The landing section. Shows:
- **Daily Intelligence Briefing** — auto-generated summary of the day's key signals
- **Top KPI cards** — key metrics at a glance (rates, sentiment, market activity)
- **Quick-access charts** — area charts for recent price and rate trends

Use this section for a rapid morning check before drilling into specifics.

---

### 4.2 Global Signals

Tracks macro signals from three major economies that directly influence Sri Lankan property through capital flows and import costs:

| Signal | Source | Why It Matters |
|--------|--------|----------------|
| US Fed Funds Rate | FRED API | Drives USD strength, affects LKR/USD |
| UK BoE Base Rate | FRED API | Impacts GBP flows and UK investor appetite |
| ECB Main Rate | FRED API | Euro-zone sentiment and EU-linked trade |

Charts show historical rate trajectories with colour-coded trend indicators.

---

### 4.3 Sri Lanka Intel

Deep-dive into the domestic market:

- **Market Map** — district-level price data visualised on a bar chart
- **Price Index** — indexed property price movements over time
- **Key Indicators** — inflation, LKR, bond yields, tourist arrivals
- **District Comparison** — sortable table of price per sqft by district

**Sort the district table** by clicking the column headers:
- `Price` — ascending/descending per-sqft prices
- `Growth` — YoY percentage change
- `Score` — composite investment score (1–10)

---

### 4.4 Colombo 1–10

A granular breakdown of Colombo's ten postal zones. Each zone card shows:

- Average price per sqft (LKR)
- YoY growth percentage
- Investment score badge
- Trend arrow (rising / stable / falling)

Zones are colour-coded: **green** = positive trend, **red** = negative, **yellow** = neutral.

---

### 4.5 Interest Rates

Full interest rate dashboard with three chart panels:

1. **Fed Funds Rate** (USD) — area chart, US Federal Reserve
2. **BoE Base Rate** (GBP) — area chart, Bank of England
3. **ECB Main Rate** (EUR) — area chart, European Central Bank

Data is fetched live from the **FRED API** in parallel. Charts display the last available data points with currency codes (USD / GBP / EUR) on the X-axis to avoid ambiguity.

> If `FRED_API_KEY` is not set, charts render with mock historical data.

---

### 4.6 Capital Flows

Tracks money moving in and out of property markets:

- **Inflow / Outflow bars** by region
- **Net flow trend** line chart
- **Regional breakdown** table

High inflow regions signal competitive markets; outflow signals may indicate stress or better opportunities elsewhere.

---

### 4.7 Risk Monitor

A consolidated view of risk signals:

| Risk Type | Description |
|-----------|-------------|
| Geopolitical | Political stability scores for key markets |
| Currency | LKR volatility and USD exposure |
| Interest Rate | Rate-hike risk timeline |
| Liquidity | Market depth and transaction volume signals |

Each risk card shows a **severity badge** (Low / Medium / High / Critical) and a short explanation.

---

### 4.8 Opportunities

Ranked list of investment opportunities filtered from global and local data:

- **Score** (1–10) based on price, growth, yield, and risk
- **Region tag** — Sri Lanka, Asia-Pacific, Global, etc.
- **Rationale** — one-line AI-generated reason
- **Risk level** badge

Opportunities update when the news feed refreshes with new signals.

---

### 4.9 AI Intelligence

On-demand AI analysis of current market conditions. Click **"Generate Analysis"** to get a structured GPT-4o mini report covering:

1. **What Happened** — key events this cycle
2. **Why It Matters** — macro implications
3. **Property Impact** — direct effect on property prices and demand
4. **Sri Lanka Implication** — how it affects the local market specifically

> Requires `OPENAI_API_KEY` to be set. Without it, the button is disabled and a notice is shown.

---

### 4.10 News Feed

The most interactive section. See the detailed guide below.

---

## 5. News Feed — Detailed Guide

The News Feed scrapes **8 live property news sources** every 15 minutes and uses GPT-4o mini to extract and summarise the most relevant articles.

### News Sources

| Source | Region | URL Scraped |
|--------|--------|-------------|
| Economy Next | Sri Lanka | economynext.com/category/property/ |
| FT Sri Lanka | Sri Lanka | ft.lk/front-page |
| PropertyGuru | Asia-Pacific | propertyguru.com.sg/property-news |
| Reuters | Global | reuters.com/business/real-estate/ |
| The Guardian | United Kingdom | theguardian.com/money/property |
| CNBC | United States | cnbc.com/real-estate/ |
| Arabian Business | Dubai | arabianbusiness.com/industries/real-estate |
| Straits Times | Singapore | straitstimes.com/business/property |

### Source Badges

Each article card shows a colour-coded badge identifying its origin:

| Colour | Region |
|--------|--------|
| 🟢 Green | Sri Lanka |
| 🔵 Blue | Asia-Pacific / Singapore |
| 🟠 Orange | Global / US |
| 🟣 Purple | United Kingdom |
| 🟡 Amber | Dubai |

### Sentiment Indicators

Every article is tagged with an AI-detected sentiment:

| Colour | Sentiment | Meaning |
|--------|-----------|---------|
| 🟢 Green | Positive | Bullish for property / market improving |
| 🔴 Red | Negative | Bearish signal / market stress |
| 🟡 Yellow | Neutral | Informational, no clear direction |

### Search and Filters

Use the controls above the news list to narrow articles:

| Control | How to Use |
|---------|-----------|
| **Search box** | Type keywords — filters headlines and summaries in real time |
| **Sentiment tabs** | Click All / Positive / Negative / Neutral to filter by tone |
| **Region dropdown** | Select a specific region (Sri Lanka, Global, Dubai, etc.) |

Filters combine — e.g. "Positive" + "Sri Lanka" shows only bullish Sri Lankan articles.

### Refreshing News

| Action | How |
|--------|-----|
| **Auto-refresh** | Every 30 minutes automatically |
| **Manual refresh** | Click the **↻ Refresh** button (top-right of the news section) |
| **Force fresh fetch** | Hold — the refresh button bypasses the 15-minute server cache |

The header shows:
- **Source label** — `LIVE` (Firecrawl) or `CACHED` or `MOCK`
- **Last fetched** time — when the data was last retrieved
- **Article count** — total articles currently loaded

### Reading an Article

Click any article card to expand it:

```
┌─────────────────────────────────────────────────────┐
│  [Source Badge]  Headline text               [Sentiment] │
│  Region · Timestamp                                  │
├─────────────────────────────────────────────────────┤
│  Summary paragraph (2–3 sentences)                   │
│                                                      │
│  [Generate AI Analysis]  ← button appears here      │
│                                                      │
│  ── AI Analysis (after generation) ──────────────── │
│  What Happened:       ...                            │
│  Why It Matters:      ...                            │
│  Property Impact:     ...                            │
│  Sri Lanka Implication: ...                          │
│                                                      │
│  [Read Full Article →]                               │
└─────────────────────────────────────────────────────┘
```

### Generating AI Analysis on an Article

1. Expand an article card
2. Click **"Generate AI Analysis"**
3. A spinner appears while GPT-4o mini processes
4. The analysis panel fills in with four structured sections
5. Click **"Read Full Article →"** to open the source page

> Each article is analysed individually and cached in memory for the session. Re-opening a previously analysed article shows the cached result instantly.

### News History

The **History** panel (accessible via the clock icon) stores previous fetch sessions in `localStorage`. Each history entry shows:

- Fetch timestamp
- Source label (LIVE / CACHED / MOCK)
- Article count
- Toggle to expand and browse past articles

History persists across page reloads within the same browser.

---

## 6. Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `FIRECRAWL_API_KEY` | Yes (for live news) | Authenticates web scraping via Firecrawl |
| `OPENAI_API_KEY` | Yes (for AI features) | Powers article extraction and property analysis |
| `FRED_API_KEY` | Yes (for live rates) | Fetches Fed, BoE, ECB interest rate data |

### What happens without each key

| Missing Key | Behaviour |
|-------------|-----------|
| `FIRECRAWL_API_KEY` | News feed falls back to built-in mock articles |
| `OPENAI_API_KEY` | No AI analysis; article extraction skipped (raw scrape only) |
| `FRED_API_KEY` | Interest rate charts use mock historical data |

---

## 7. API Endpoints

All endpoints are under `/api/` and are called internally by the dashboard.

### `GET /api/news`

Returns property news articles.

| Query Param | Values | Default | Description |
|-------------|--------|---------|-------------|
| `force` | `true` / `false` | `false` | Bypass the 15-minute server cache |

**Response:**

```json
{
  "success": true,
  "source": "firecrawl | firecrawl_cached | mock",
  "articles": [...],
  "lastFetched": "2026-03-10T08:00:00.000Z",
  "cachedUntil": "2026-03-10T08:15:00.000Z"
}
```

**Caching:** Results are cached server-side for **15 minutes**. Append `?force=true` to force a fresh scrape.

---

### `GET /api/rates`

Returns the latest interest rates from FRED.

**Response:**

```json
{
  "success": true,
  "rates": [
    { "country": "United States", "currency": "USD", "rate": 5.33, "series": "FEDFUNDS" },
    { "country": "United Kingdom", "currency": "GBP", "rate": 5.25, "series": "BOEBR" },
    { "country": "Euro Area",      "currency": "EUR", "rate": 4.50, "series": "ECBMR" }
  ]
}
```

All three series are fetched **in parallel** (`Promise.all`).

---

### `POST /api/analysis`

Generates an AI property market analysis.

**Request body:**

```json
{
  "context": "Optional article or market context text"
}
```

**Response:**

```json
{
  "success": true,
  "analysis": {
    "whatHappened": "...",
    "whyItMatters": "...",
    "propertyImpact": "...",
    "sriLankaImplication": "..."
  }
}
```

---

## 8. Troubleshooting

### News feed shows "Mock Data"

- Confirm `FIRECRAWL_API_KEY` is set in `.env.local`
- Restart the dev server after editing `.env.local` (`npm run dev`)
- Check the browser console or terminal for Firecrawl API errors
- Verify your Firecrawl account has remaining credits

### AI Analysis button is greyed out / spinner never resolves

- Confirm `OPENAI_API_KEY` is set and valid
- Check your OpenAI account has sufficient quota
- Look at terminal output for `analysis/route.ts` errors

### Interest rate charts are empty or show zeros

- Confirm `FRED_API_KEY` is set
- FRED API is free but rate-limited; wait a moment and refresh
- Check https://fred.stlouisfed.org for API status

### News articles have no URLs (show "#")

- Some sites block URL extraction in their page markdown
- The article still contains the headline and summary from OpenAI extraction
- Use the source name to find the article manually on the source site

### 15-minute cache feels stale

Click **↻ Refresh** in the News Feed — this calls `/api/news?force=true` and bypasses the server cache, triggering a fresh Firecrawl scrape immediately.

### Port 3000 already in use

```bash
# Find and kill the process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

---

*Last updated: March 2026 · RJ Grero Advisory*

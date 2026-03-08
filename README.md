# RJ Grero Property Intelligence

Global Property Market Intelligence Dashboard for RJ Grero Property Advisory.

## Quick Start

```bash
cd rj-grero-property-intelligence
npm install
npm run dev
```

Open http://localhost:3000

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS 3.4
- Recharts
- Lucide React Icons

## API Configuration

Add keys to `.env.local`:

```
NEWSAPI_KEY=your_newsapi_key
FRED_API_KEY=your_fred_api_key
OPENAI_API_KEY=your_openai_api_key
```

All APIs fall back to mock data if keys are not configured.

## Dashboard Modules

- **Daily Intelligence Summary** — Key global signals and Sri Lanka opportunity alerts
- **Interest Rate Tracker** — US, UK, EU, Australia, Singapore, Sri Lanka rates with trend indicators
- **Property Sentiment Gauge** — Aggregated market sentiment (0-100 scale)
- **Capital Flow Signals** — Inflow/outflow tracking across regions
- **Opportunity Scanner** — Investment opportunities ranked by confidence
- **Risk Monitor** — Active risk alerts by severity
- **Sri Lanka Market Intelligence** — Tourism, construction, mortgage rates, foreign buyer charts
- **News Intelligence Feed** — 12 property news items with AI analysis

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── news/route.ts
│   │   ├── rates/route.ts
│   │   └── analysis/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Dashboard.tsx
│   ├── Navbar.tsx
│   └── Sidebar.tsx
├── data/
│   └── mockData.ts
└── lib/
```
# RJ Grero Property Intelligence Dashboard

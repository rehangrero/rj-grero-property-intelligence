import { NextRequest, NextResponse } from 'next/server';
import { propertyNews } from '@/data/mockData';

export const dynamic = 'force-dynamic';

// ── Types ─────────────────────────────────────────────────────────────────────
interface NewsSource {
  name: string;
  url: string;
  region: string;
}

interface ExtractedArticle {
  headline: string;
  summary: string;
  url: string;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

// ── 8 scraped sources ─────────────────────────────────────────────────────────
const NEWS_SOURCES: NewsSource[] = [
  { name: 'Economy Next',     url: 'https://economynext.com/category/property/',                        region: 'Sri Lanka'     },
  { name: 'FT Sri Lanka',     url: 'https://www.ft.lk/front-page',                                     region: 'Sri Lanka'     },
  { name: 'PropertyGuru',     url: 'https://www.propertyguru.com.sg/property-news',                     region: 'Asia-Pacific'  },
  { name: 'Reuters',          url: 'https://www.reuters.com/business/real-estate/',                     region: 'Global'        },
  { name: 'The Guardian',     url: 'https://www.theguardian.com/money/property',                        region: 'United Kingdom'},
  { name: 'CNBC',             url: 'https://www.cnbc.com/real-estate/',                                 region: 'United States' },
  { name: 'Arabian Business', url: 'https://www.arabianbusiness.com/industries/real-estate',            region: 'Dubai'         },
  { name: 'Straits Times',    url: 'https://www.straitstimes.com/business/property',                    region: 'Singapore'     },
];

// ── Server-side in-memory cache (15 min TTL) ──────────────────────────────────
let cache: { articles: object[]; cachedAt: number } | null = null;
const CACHE_TTL = 15 * 60 * 1000;

// ── Scrape one source via Firecrawl ───────────────────────────────────────────
async function scrapeSource(source: NewsSource, firecrawlKey: string): Promise<string | null> {
  try {
    const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${firecrawlKey}`,
      },
      body: JSON.stringify({
        url: source.url,
        formats: ['markdown'],
        onlyMainContent: true,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.data?.markdown as string) || null;
  } catch {
    return null;
  }
}

// ── Extract articles from markdown via OpenAI ─────────────────────────────────
async function extractArticles(
  markdown: string,
  source: NewsSource,
  openaiKey: string,
): Promise<ExtractedArticle[]> {
  try {
    const truncated = markdown.slice(0, 4000);
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'user',
          content: `From this "${source.name}" (${source.region}) news page markdown, extract the 2 most recent property or real estate articles.
Return ONLY a valid JSON array, no markdown fences:
[{"headline":"...","summary":"2-3 sentence description","url":"absolute url or empty string","publishedAt":"ISO date or today","sentiment":"positive|negative|neutral"}]
If no property articles are found, return [].
Page content:
${truncated}`,
        }],
        temperature: 0.1,
        max_tokens: 700,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const text: string = data.choices?.[0]?.message?.content || '[]';
    const cleaned = text.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '');
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed.slice(0, 2) : [];
  } catch {
    return [];
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const force = request.nextUrl.searchParams.get('force') === 'true';

  // Serve from cache if fresh and not a forced refresh
  if (!force && cache && Date.now() - cache.cachedAt < CACHE_TTL) {
    return NextResponse.json({
      success: true,
      source: 'firecrawl_cached',
      articles: cache.articles,
      lastFetched: new Date(cache.cachedAt).toISOString(),
      cachedUntil: new Date(cache.cachedAt + CACHE_TTL).toISOString(),
    });
  }

  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!firecrawlKey) {
    return NextResponse.json({
      success: true,
      source: 'mock',
      articles: propertyNews,
      lastFetched: new Date().toISOString(),
    });
  }

  try {
    // Scrape all 8 sources in parallel
    const markdowns = await Promise.all(
      NEWS_SOURCES.map(source => scrapeSource(source, firecrawlKey))
    );

    let allArticles: object[] = [];

    if (openaiKey) {
      // Extract articles from all sources in parallel
      const extracted = await Promise.all(
        markdowns.map((md, i) =>
          md ? extractArticles(md, NEWS_SOURCES[i], openaiKey) : Promise.resolve([])
        )
      );

      let idx = 0;
      extracted.forEach((articles, i) => {
        const src = NEWS_SOURCES[i];
        articles.forEach(a => {
          const validSentiments = ['positive', 'negative', 'neutral'];
          allArticles.push({
            id: `fc-${Date.now()}-${idx++}`,
            headline: a.headline,
            summary: a.summary,
            url: a.url || src.url,
            source: src.name,
            timestamp: a.publishedAt ? new Date(a.publishedAt).toISOString() : new Date().toISOString(),
            sentiment: validSentiments.includes(a.sentiment) ? a.sentiment : 'neutral',
            region: src.region,
            aiAnalysis: {
              whatHappened: a.summary || a.headline,
              whyItMatters: '',
              propertyImpact: '',
              sriLankaImplication: '',
            },
          });
        });
      });
    }

    if (allArticles.length === 0) {
      return NextResponse.json({
        success: true,
        source: 'mock',
        articles: propertyNews,
        lastFetched: new Date().toISOString(),
      });
    }

    cache = { articles: allArticles, cachedAt: Date.now() };

    return NextResponse.json({
      success: true,
      source: 'firecrawl',
      articles: allArticles,
      lastFetched: new Date().toISOString(),
      cachedUntil: new Date(Date.now() + CACHE_TTL).toISOString(),
    });
  } catch (error) {
    console.error('News scrape error:', error);
    return NextResponse.json({
      success: true,
      source: 'mock',
      articles: propertyNews,
      lastFetched: new Date().toISOString(),
    });
  }
}

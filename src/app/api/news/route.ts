import { NextResponse } from 'next/server';
import { propertyNews } from '@/data/mockData';

export const revalidate = 259200; // 3 days

export async function GET() {
  try {
    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        source: 'mock',
        articles: propertyNews,
        lastFetched: new Date().toISOString(),
      });
    }

    const query = 'real estate property market housing';
    const url = new URL('https://gnews.io/api/v4/search');
    url.searchParams.append('q', query);
    url.searchParams.append('lang', 'en');
    url.searchParams.append('max', '10');
    url.searchParams.append('sortby', 'publishedAt');
    url.searchParams.append('apikey', apiKey);

    const response = await fetch(url.toString(), {
      next: { revalidate: 259200 },
    });

    if (!response.ok) {
      return NextResponse.json({
        success: true,
        source: 'mock',
        articles: propertyNews,
        lastFetched: new Date().toISOString(),
      });
    }

    const data = await response.json();

    // GNews returns: title, description, content, url, publishedAt, source.name
    const articles = (data.articles || []).map((a: {
      title: string;
      description?: string;
      content?: string;
      url: string;
      publishedAt: string;
      source?: { name?: string };
    }, i: number) => ({
      id: `gnews-${i}`,
      headline: a.title,
      summary: a.description || a.content?.slice(0, 250) || '',
      url: a.url,
      source: a.source?.name || 'GNews',
      timestamp: new Date(a.publishedAt),
      sentiment: 'neutral' as const,
      region: 'Global',
      aiAnalysis: {
        whatHappened: a.description || a.title,
        whyItMatters: 'Live news — AI analysis not yet generated.',
        propertyImpact: 'Monitor for impact on property markets.',
        sriLankaImplication: 'Assess relevance to Sri Lanka property strategy.',
      },
    }));

    return NextResponse.json({
      success: true,
      source: 'gnews',
      articles: articles.length > 0 ? articles : propertyNews,
      lastFetched: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({
      success: true,
      source: 'mock',
      articles: propertyNews,
      lastFetched: new Date().toISOString(),
    });
  }
}

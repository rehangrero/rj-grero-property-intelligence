import { NextResponse } from 'next/server';
import { propertyNews } from '@/data/mockData';

export async function GET() {
  try {
    const apiKey = process.env.NEWSAPI_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        source: 'mock',
        articles: propertyNews,
      });
    }

    const query = 'real estate OR property market OR housing market OR mortgage market OR construction sector';
    const url = new URL('https://newsapi.org/v2/everything');
    url.searchParams.append('q', query);
    url.searchParams.append('sortBy', 'publishedAt');
    url.searchParams.append('language', 'en');
    url.searchParams.append('apiKey', apiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      return NextResponse.json({
        success: true,
        source: 'mock',
        articles: propertyNews,
      });
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      source: 'newsapi',
      articles: data.articles || [],
      totalResults: data.totalResults || 0,
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({
      success: true,
      source: 'mock',
      articles: propertyNews,
    });
  }
}

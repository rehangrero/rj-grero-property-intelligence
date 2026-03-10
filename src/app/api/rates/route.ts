import { NextResponse } from 'next/server';
import { interestRates } from '@/data/mockData';

export async function GET() {
  try {
    const apiKey = process.env.FRED_API_KEY;

    if (!apiKey) {
      console.warn('FRED_API_KEY not configured, using mock data');
      return NextResponse.json({
        success: true,
        source: 'mock',
        rates: interestRates || {},
      });
    }

    const series = ['FEDFUNDS', 'BOEBR', 'ECBMR'];

    const fetchSeries = async (seriesId: string): Promise<number | null> => {
      try {
        const url = new URL('https://api.stlouisfed.org/fred/series/observations');
        url.searchParams.append('series_id', seriesId);
        url.searchParams.append('api_key', apiKey);
        url.searchParams.append('limit', '1');
        url.searchParams.append('sort_order', 'desc');

        const response = await fetch(url.toString());

        if (!response.ok) {
          console.warn(`FRED API error for ${seriesId}: ${response.status}`);
          return null;
        }

        const data = await response.json();
        const observation = data.observations?.[0];
        return observation ? parseFloat(observation.value) : null;
      } catch (error) {
        console.error(`Error fetching ${seriesId}:`, error);
        return null;
      }
    };

    const [fedfunds, boebr, ecbmr] = await Promise.all(series.map(fetchSeries));
    const ratesData = { FEDFUNDS: fedfunds, BOEBR: boebr, ECBMR: ecbmr };

    return NextResponse.json({
      success: true,
      source: 'fred',
      rates: {
        us: ratesData.FEDFUNDS,
        uk: ratesData.BOEBR,
        eu: ratesData.ECBMR,
      },
    });
  } catch (error) {
    console.error('Error fetching interest rates:', error);
    return NextResponse.json({
      success: true,
      source: 'mock',
      rates: interestRates || {},
      error: 'Failed to fetch from FRED API, using mock data',
    });
  }
}

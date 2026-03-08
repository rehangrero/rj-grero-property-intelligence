import { NextRequest, NextResponse } from 'next/server';

interface AnalysisRequest {
  headline: string;
  summary: string;
}

interface AnalysisResponse {
  whatHappened: string;
  whyItMatters: string;
  propertyImpact: string;
  sriLankaImplication: string;
}

const getGenericAnalysis = (headline: string): AnalysisResponse => {
  return {
    whatHappened: `The article discusses: "${headline}". This represents recent developments in the global property market.`,
    whyItMatters: 'Property market developments affect investment decisions, affordability, and economic indicators globally.',
    propertyImpact: 'This news may influence property valuations, rental yields, construction investment, and mortgage demand in affected regions.',
    sriLankaImplication: 'Global property market trends can indirectly affect Sri Lanka through foreign investment patterns, capital flow, and international economic conditions that impact the local real estate market.',
  };
};

export async function POST(request: NextRequest) {
  try {
    const body: AnalysisRequest = await request.json();
    const { headline, summary } = body;

    if (!headline || !summary) {
      return NextResponse.json(
        { error: 'Missing required fields: headline and summary' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.warn('OPENAI_API_KEY not configured, using generic analysis');
      return NextResponse.json({
        success: true,
        source: 'generic',
        analysis: getGenericAnalysis(headline),
      });
    }

    const analysisPrompt = `Analyze this property news: ${headline}. ${summary}. Explain: 1) What happened 2) Why it matters for property markets 3) Potential impact on global real estate 4) Possible implications for Sri Lanka real estate market. Be concise and professional.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a property market analyst. Provide clear, concise, and professional analysis of property news.',
          },
          {
            role: 'user',
            content: analysisPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.status} ${response.statusText}`);
      return NextResponse.json({
        success: true,
        source: 'generic',
        analysis: getGenericAnalysis(headline),
      });
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content || '';

    // Parse the response into structured format
    const analysis = parseAnalysis(responseText, headline);

    return NextResponse.json({
      success: true,
      source: 'openai',
      analysis,
    });
  } catch (error) {
    console.error('Error analyzing news:', error);
    return NextResponse.json(
      { error: 'Failed to analyze news' },
      { status: 500 }
    );
  }
}

function parseAnalysis(responseText: string, headline: string): AnalysisResponse {
  // Attempt to extract structured information from OpenAI response
  const sections = responseText.split(/\d+\)\s+/);

  const whatHappened = sections[1]?.split('\n')[0]?.trim() || 'Property market development analyzed.';
  const whyItMatters = sections[2]?.split('\n')[0]?.trim() || 'Important for market understanding.';
  const propertyImpact = sections[3]?.split('\n')[0]?.trim() || 'Will affect property market dynamics.';
  const sriLankaImplication = sections[4]?.trim() || 'May have implications for local market.';

  return {
    whatHappened,
    whyItMatters,
    propertyImpact,
    sriLankaImplication,
  };
}

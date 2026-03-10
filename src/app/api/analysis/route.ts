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

    const analysisPrompt = `Analyze this property news article and respond with a JSON object only (no markdown, no extra text):
Headline: ${headline}
Summary: ${summary}

Return exactly this JSON structure:
{
  "whatHappened": "...",
  "whyItMatters": "...",
  "propertyImpact": "...",
  "sriLankaImplication": "..."
}
Each field should be 1-2 concise sentences.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
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

    // Parse JSON response; fall back to text-based parsing if needed
    let analysis: AnalysisResponse;
    try {
      const parsed = JSON.parse(responseText.trim());
      analysis = {
        whatHappened: parsed.whatHappened || '',
        whyItMatters: parsed.whyItMatters || '',
        propertyImpact: parsed.propertyImpact || '',
        sriLankaImplication: parsed.sriLankaImplication || '',
      };
    } catch {
      analysis = parseAnalysis(responseText, headline);
    }

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
  // Extract each labelled section using keyword anchors, tolerating varied formatting
  const extract = (label: string, nextLabel?: string): string => {
    // Match the label followed by any separator (colon, dash, newline, digits+punct)
    const start = new RegExp(`${label}[:\\-\\s]*`, 'i');
    const startMatch = responseText.search(start);
    if (startMatch === -1) return '';

    const afterLabel = responseText.slice(startMatch).replace(start, '');

    if (nextLabel) {
      const end = new RegExp(`${nextLabel}[:\\-\\s]*`, 'i');
      const endMatch = afterLabel.search(end);
      return endMatch !== -1 ? afterLabel.slice(0, endMatch).trim() : afterLabel.split('\n\n')[0].trim();
    }
    return afterLabel.split('\n\n')[0].trim();
  };

  const whatHappened =
    extract('What Happened', 'Why It Matters') ||
    extract('1[.)\\s]', '2[.)\\s]') ||
    'Property market development analyzed.';

  const whyItMatters =
    extract('Why It Matters', 'Potential Impact|Property Impact') ||
    extract('2[.)\\s]', '3[.)\\s]') ||
    'Important for market understanding.';

  const propertyImpact =
    extract('Potential Impact|Property Impact', 'Sri Lanka|Implications') ||
    extract('3[.)\\s]', '4[.)\\s]') ||
    'Will affect property market dynamics.';

  const sriLankaImplication =
    extract('Sri Lanka|Implications') ||
    extract('4[.)\\s]') ||
    'May have implications for local market.';

  // Final fallback: if nothing was parsed, use generic
  return {
    whatHappened: whatHappened || `The article discusses: "${headline}".`,
    whyItMatters: whyItMatters || 'Property market developments affect investment decisions globally.',
    propertyImpact: propertyImpact || 'This news may influence property valuations and rental yields.',
    sriLankaImplication: sriLankaImplication || 'Global trends can indirectly affect Sri Lanka through capital flows.',
  };
}

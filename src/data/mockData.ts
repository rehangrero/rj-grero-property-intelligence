export const interestRates = [
  {
    country: "United States",
    rate: 5.50,
    previousRate: 5.50,
    trend: "stable" as const,
    currency: "USD",
    lastUpdated: "2026-03-08",
  },
  {
    country: "United Kingdom",
    rate: 5.25,
    previousRate: 5.50,
    trend: "falling" as const,
    currency: "GBP",
    lastUpdated: "2026-03-08",
  },
  {
    country: "European Union",
    rate: 4.50,
    previousRate: 4.75,
    trend: "falling" as const,
    currency: "EUR",
    lastUpdated: "2026-03-08",
  },
  {
    country: "Australia",
    rate: 4.35,
    previousRate: 4.35,
    trend: "stable" as const,
    currency: "AUD",
    lastUpdated: "2026-03-08",
  },
  {
    country: "Singapore",
    rate: 3.68,
    previousRate: 3.72,
    trend: "falling" as const,
    currency: "SGD",
    lastUpdated: "2026-03-08",
  },
  {
    country: "Sri Lanka",
    rate: 9.50,
    previousRate: 10.00,
    trend: "falling" as const,
    currency: "LKR",
    lastUpdated: "2026-03-08",
  },
];

export const propertyNews = [
  {
    id: "news-001",
    headline: "UK Property Market Shows Signs of Recovery as Interest Rates Decline",
    source: "Financial Times",
    region: "United Kingdom",
    summary:
      "Property sales in London accelerated in February following the Bank of England's rate cut, with prime central London seeing increased foreign investor interest.",
    timestamp: new Date("2026-03-07"),
    sentiment: "positive" as const,
    aiAnalysis: {
      whatHappened:
        "UK property market activity increased following interest rate reduction to 5.25%",
      whyItMatters:
        "Lower mortgage costs improve affordability and purchasing power for international buyers",
      propertyImpact:
        "Prime London properties expected to see 5-7% appreciation over next 12 months",
      sriLankaImplication:
        "UK market recovery may attract Sri Lankan investors seeking stable diversified portfolios",
    },
  },
  {
    id: "news-002",
    headline: "US Commercial Real Estate Faces Structural Headwinds",
    source: "Reuters",
    region: "United States",
    summary:
      "Major office REITs report declining occupancy rates and rental growth concerns amid remote work trends continuing to reshape the commercial landscape.",
    timestamp: new Date("2026-03-06"),
    sentiment: "negative" as const,
    aiAnalysis: {
      whatHappened:
        "US office vacancy rates reached 15-year highs at 13.2% in major metros",
      whyItMatters:
        "Commercial property valuations under pressure; refinancing risk for overleveraged assets",
      propertyImpact:
        "Mixed signals - residential remains strong but office conversions are costly",
      sriLankaImplication:
        "Sri Lankan investors should focus on residential and mixed-use developments, avoid pure office exposure",
    },
  },
  {
    id: "news-003",
    headline: "Dubai Real Estate Market Reaches Record Transaction Values",
    source: "Gulf News",
    region: "Dubai",
    summary:
      "Dubai's property market recorded AED 178 billion in transactions in Q1 2026, with increased demand from Asian investors including those from India and Southeast Asia.",
    timestamp: new Date("2026-03-07"),
    sentiment: "positive" as const,
    aiAnalysis: {
      whatHappened:
        "Dubai transactions hit record levels with strong Asian investor participation",
      whyItMatters:
        "Regional hub status strengthens; tax-efficient jurisdiction attracting global capital",
      propertyImpact:
        "Prime waterfront properties appreciating 8-10% annually; investment visa programs driving demand",
      sriLankaImplication:
        "Dubai presents gateway opportunity for Sri Lankan investors to access regional real estate markets",
    },
  },
  {
    id: "news-004",
    headline: "China's Property Recovery Gains Momentum in Q1 2026",
    source: "South China Morning Post",
    region: "China",
    summary:
      "Chinese property developers report improved sales trends and steady residential demand in tier-1 cities as government stimulus measures take effect.",
    timestamp: new Date("2026-03-05"),
    sentiment: "positive" as const,
    aiAnalysis: {
      whatHappened:
        "New home sales in Shanghai and Beijing increased 12% quarter-on-quarter",
      whyItMatters:
        "Government support measures boosting consumer confidence; capital flows resuming",
      propertyImpact:
        "Developer share prices recovering; rental yields improving in major cities",
      sriLankaImplication:
        "Chinese market stabilization could influence regional property valuations and capital allocation",
    },
  },
  {
    id: "news-005",
    headline: "Sri Lanka's Tourism Arrivals Surge 35% Year-on-Year",
    source: "Daily Mirror",
    region: "Sri Lanka",
    summary:
      "March 2026 sees unprecedented tourism rebound with 250,000+ monthly arrivals, driving hospitality and residential property demand in coastal regions.",
    timestamp: new Date("2026-03-08"),
    sentiment: "positive" as const,
    aiAnalysis: {
      whatHappened:
        "Tourism arrivals reached 250,000 in March 2026, highest since pre-pandemic levels",
      whyItMatters:
        "Strong tourism recovery supports economic growth and foreign currency earnings",
      propertyImpact:
        "Beachfront and boutique hotel properties in high demand; short-term rental yields 8-12%",
      sriLankaImplication:
        "Critical signal: Tourism recovery validates Sri Lanka's reopening narrative and supports property valuations",
    },
  },
  {
    id: "news-006",
    headline: "Australian Property Market Cooling as Rate Expectations Stabilize",
    source: "ABC News",
    region: "Australia",
    summary:
      "Auction clearance rates in Sydney and Melbourne declining slightly as buyers adjust to stable rate environment and digest recent price gains.",
    timestamp: new Date("2026-03-04"),
    sentiment: "neutral" as const,
    aiAnalysis: {
      whatHappened:
        "Sydney auction clearance fell to 68% from 72% as market normalizes",
      whyItMatters:
        "Stabilization expected after rapid price appreciation; healthy market correction underway",
      propertyImpact:
        "Price growth moderating to 3-4% annually; strong fundamentals remain intact",
      sriLankaImplication:
        "Australian market maturity shows sustainable long-term investment potential for Sri Lankan capital",
    },
  },
  {
    id: "news-007",
    headline: "Singapore Launches $2.8B Housing Development Initiative",
    source: "Straits Times",
    region: "Singapore",
    summary:
      "Singapore government announces major urban regeneration and public housing enhancement program, supporting property sector growth and attracting regional investment.",
    timestamp: new Date("2026-03-07"),
    sentiment: "positive" as const,
    aiAnalysis: {
      whatHappened:
        "Singapore commits SGD 3.8B to housing and infrastructure development",
      whyItMatters:
        "Government investment signals long-term property market confidence; attracts foreign capital",
      propertyImpact:
        "Private residential projects benefit from infrastructure improvements; rental demand increases",
      sriLankaImplication:
        "Singapore's stability and government backing make it attractive for Sri Lankan institutional investors",
    },
  },
  {
    id: "news-008",
    headline: "European Property Markets Show Divergence as Rate Cuts Proceed",
    source: "Financial Times",
    region: "European Union",
    summary:
      "ECB cuts rates to 4.5% as inflation moderates; Northern European markets strengthen while Southern European properties remain attractive for value investors.",
    timestamp: new Date("2026-03-06"),
    sentiment: "positive" as const,
    aiAnalysis: {
      whatHappened:
        "ECB reduced rates 25bps to 4.5%; mortgage lending conditions improving",
      whyItMatters:
        "Lower rates support property valuations; different regional dynamics emerging",
      propertyImpact:
        "German residential rentals stable at 4.5% yields; Spanish markets seeing appreciation",
      sriLankaImplication:
        "European diversification offers stable, yield-generating properties for conservative Sri Lankan investors",
    },
  },
  {
    id: "news-009",
    headline: "Sri Lanka's Fiscal Stability Attracts International Development Investment",
    source: "Bloomberg",
    region: "Sri Lanka",
    summary:
      "IMF and World Bank praise Sri Lanka's economic reforms; infrastructure projects attracting Japanese and Chinese development finance, boosting property sector confidence.",
    timestamp: new Date("2026-03-07"),
    sentiment: "positive" as const,
    aiAnalysis: {
      whatHappened:
        "International financial institutions confirm Sri Lanka's economic stabilization progress",
      whyItMatters:
        "Credit rating improvements and project finance increasing; foreign investor confidence rising",
      propertyImpact:
        "Infrastructure development zones creating new investment opportunities; urban property values appreciating",
      sriLankaImplication:
        "This validates the domestic investment case and attracts diaspora capital back to Sri Lanka",
    },
  },
  {
    id: "news-010",
    headline: "Asian Property Prices Surge Amid Growing Wealth Migration",
    source: "CNBC",
    region: "Asia-Pacific",
    summary:
      "High-net-worth individuals from China and India increasingly allocating capital to Singapore, Bangkok, and Kuala Lumpur properties as part of diversification strategies.",
    timestamp: new Date("2026-03-05"),
    sentiment: "positive" as const,
    aiAnalysis: {
      whatHappened:
        "Asian property transactions increased 28% with strong UHNWI participation",
      whyItMatters:
        "Wealth diversification trends supporting sustained demand for premium Asian properties",
      propertyImpact:
        "Luxury segment strong; supply-constrained premium markets appreciating 7-9% annually",
      sriLankaImplication:
        "Asian wealth migration presents opportunity for Sri Lanka to capture premium market segment",
    },
  },
  {
    id: "news-011",
    headline: "UK to Launch New Fast-Track Visa for High-Net-Worth Property Investors",
    source: "BBC News",
    region: "United Kingdom",
    summary:
      "UK government introduces accelerated residency pathway for property investors committing GBP 2M+ to UK real estate, targeting international capital inflows.",
    timestamp: new Date("2026-03-08"),
    sentiment: "positive" as const,
    aiAnalysis: {
      whatHappened:
        "UK launches investor visa for GBP 2M+ property commitments with expedited processing",
      whyItMatters:
        "Regulatory support for property investment; strategic competition for global capital",
      propertyImpact:
        "Expected increase in luxury and prime property demand; London trophy assets benefiting",
      sriLankaImplication:
        "UK market becoming more accessible to Sri Lankan investors seeking residency pathways",
    },
  },
  {
    id: "news-012",
    headline: "Climate Risk Assessment Drives Insurance and Property Valuation Changes",
    source: "The Guardian",
    region: "Global",
    summary:
      "New climate risk frameworks from financial regulators reshape property insurance costs and valuations, particularly impacting coastal and flood-prone regions globally.",
    timestamp: new Date("2026-03-06"),
    sentiment: "negative" as const,
    aiAnalysis: {
      whatHappened:
        "Climate risk models integrated into property valuations; insurance costs rising in exposed areas",
      whyItMatters:
        "Financial regulators mandating climate disclosure; impact on coastal property economics",
      propertyImpact:
        "Inland and elevated properties gaining relative value; flood-prone areas facing 10-15% valuation pressure",
      sriLankaImplication:
        "Sri Lanka's vulnerability requires focus on climate-resilient properties; elevated island locations more attractive",
    },
  },
];

export const sriLankaData = {
  tourismArrivals: [
    { month: "March", arrivals: 250000, year: 2026 },
    { month: "February", arrivals: 195000, year: 2026 },
    { month: "January", arrivals: 220000, year: 2026 },
    { month: "December", arrivals: 185000, year: 2025 },
    { month: "November", arrivals: 165000, year: 2025 },
    { month: "October", arrivals: 150000, year: 2025 },
    { month: "September", arrivals: 95000, year: 2025 },
    { month: "August", arrivals: 110000, year: 2025 },
    { month: "July", arrivals: 125000, year: 2025 },
    { month: "June", arrivals: 105000, year: 2025 },
    { month: "May", arrivals: 145000, year: 2025 },
    { month: "April", arrivals: 168000, year: 2025 },
  ],
  constructionIndex: [
    { month: "March", value: 68 },
    { month: "February", value: 65 },
    { month: "January", value: 62 },
    { month: "December", value: 60 },
    { month: "November", value: 58 },
    { month: "October", value: 55 },
    { month: "September", value: 52 },
    { month: "August", value: 50 },
    { month: "July", value: 48 },
    { month: "June", value: 45 },
    { month: "May", value: 42 },
    { month: "April", value: 40 },
  ],
  mortgageRates: [
    { month: "March", rate: 9.50 },
    { month: "February", rate: 9.65 },
    { month: "January", rate: 9.80 },
    { month: "December", rate: 9.95 },
    { month: "November", rate: 10.10 },
    { month: "October", rate: 10.05 },
    { month: "September", rate: 10.15 },
    { month: "August", rate: 10.20 },
    { month: "July", rate: 10.25 },
    { month: "June", rate: 10.30 },
    { month: "May", rate: 10.35 },
    { month: "April", rate: 10.40 },
  ],
  foreignBuyerSignals: [
    { month: "March", score: 78 },
    { month: "February", score: 72 },
    { month: "January", score: 68 },
    { month: "December", score: 65 },
    { month: "November", score: 60 },
    { month: "October", score: 55 },
    { month: "September", score: 50 },
    { month: "August", score: 48 },
    { month: "July", score: 45 },
    { month: "June", score: 42 },
    { month: "May", score: 40 },
    { month: "April", score: 38 },
  ],
};

export const capitalFlows = [
  {
    id: "cf-001",
    signal: "Institutional allocation to Asian emerging markets",
    region: "Asia-Pacific",
    direction: "inflow" as const,
    magnitude: "high" as const,
    description:
      "Major pension funds increasing emerging market real estate exposure",
  },
  {
    id: "cf-002",
    signal: "Japanese development finance to Sri Lanka infrastructure",
    region: "Sri Lanka",
    direction: "inflow" as const,
    magnitude: "high" as const,
    description: "JICA and private Japanese investors expanding project finance",
  },
  {
    id: "cf-003",
    signal: "Chinese outbound real estate investment moderating",
    region: "Global",
    direction: "outflow" as const,
    magnitude: "medium" as const,
    description:
      "Domestic focus overtaking international expansion for some developers",
  },
  {
    id: "cf-004",
    signal: "Gulf sovereign wealth buying UK and European prime assets",
    region: "United Kingdom, Europe",
    direction: "inflow" as const,
    magnitude: "high" as const,
    description: "Diversification away from regional focus; stable currency appeal",
  },
  {
    id: "cf-005",
    signal: "Indian UHNWI property purchases accelerating",
    region: "Singapore, Dubai, Australia",
    direction: "inflow" as const,
    magnitude: "high" as const,
    description: "Wealth growth driving offshore residential and commercial acquisition",
  },
  {
    id: "cf-006",
    signal: "European diaspora returning capital to Sri Lanka",
    region: "Sri Lanka",
    direction: "inflow" as const,
    magnitude: "medium" as const,
    description: "Improved security and economic outlook attracting diaspora investment",
  },
  {
    id: "cf-007",
    signal: "US commercial real estate debt distress triggering sales",
    region: "United States",
    direction: "outflow" as const,
    magnitude: "high" as const,
    description: "Forced liquidations of overleveraged office and retail properties",
  },
  {
    id: "cf-008",
    signal: "Tourism recovery driving hospitality investment to Sri Lanka",
    region: "Sri Lanka",
    direction: "inflow" as const,
    magnitude: "medium" as const,
    description: "Hotel and resort developers expanding; boutique property demand rising",
  },
];

export const opportunities = [
  {
    id: "opp-001",
    title: "Sri Lanka Beachfront Hospitality Development",
    description:
      "High-demand boutique hotel and serviced apartment development in Mirissa targeting tourism rebound",
    region: "Sri Lanka",
    confidence: 88,
    category: "Hospitality",
  },
  {
    id: "opp-002",
    title: "Colombo Mixed-Use Urban Development",
    description:
      "Central Business District regeneration project combining office, residential, and retail",
    region: "Sri Lanka",
    confidence: 82,
    category: "Mixed-Use",
  },
  {
    id: "opp-003",
    title: "UK Prime London Investment",
    description:
      "Acquisition of Grade-A office space in Mayfair/Knightsbridge benefiting from rate cuts",
    region: "United Kingdom",
    confidence: 75,
    category: "Commercial",
  },
  {
    id: "opp-004",
    title: "Singapore Residential Development Fund",
    description:
      "Co-investment in government-backed urban regeneration residential projects",
    region: "Singapore",
    confidence: 79,
    category: "Residential",
  },
  {
    id: "opp-005",
    title: "Australian Regional Expansion",
    description:
      "Acquisition of residential portfolios in Brisbane and Perth benefiting from interstate migration",
    region: "Australia",
    confidence: 76,
    category: "Residential",
  },
  {
    id: "opp-006",
    title: "Dubai Port-Adjacent Mixed Development",
    description:
      "Premium residential and office space in developing Dubai maritime zones",
    region: "Dubai",
    confidence: 81,
    category: "Mixed-Use",
  },
  {
    id: "opp-007",
    title: "Sri Lanka Climate-Resilient Resort Corridor",
    description:
      "Elevated coastal resorts with climate adaptation features in emerging Unawatuna region",
    region: "Sri Lanka",
    confidence: 85,
    category: "Hospitality",
  },
  {
    id: "opp-008",
    title: "European Residential Rental Portfolio",
    description:
      "Multi-country buy-to-let strategy across Amsterdam, Berlin, and Barcelona",
    region: "European Union",
    confidence: 72,
    category: "Residential",
  },
  {
    id: "opp-009",
    title: "Sri Lanka Tech Park Development",
    description:
      "Premium office space near Colombo IT hubs capitalizing on digital sector growth",
    region: "Sri Lanka",
    confidence: 80,
    category: "Commercial",
  },
];

export const risks = [
  {
    id: "risk-001",
    title: "US Commercial Real Estate Credit Risk",
    description:
      "Potential cascading defaults in office REITs and commercial mortgage-backed securities",
    severity: "high" as const,
    region: "United States",
    category: "Credit Risk",
  },
  {
    id: "risk-002",
    title: "Global Interest Rate Volatility",
    description:
      "Unexpected rate increases could compress property valuations and refinancing capability",
    severity: "high" as const,
    region: "Global",
    category: "Market Risk",
  },
  {
    id: "risk-003",
    title: "Climate and Natural Disaster Exposure",
    description:
      "Coastal properties vulnerable to cyclones; elevated insurance and valuation pressures",
    severity: "high" as const,
    region: "Sri Lanka, Australia, Singapore",
    category: "Environmental Risk",
  },
  {
    id: "risk-004",
    title: "Sri Lanka Political and Policy Stability",
    description:
      "Regulatory changes or political transitions could impact investment climate and returns",
    severity: "medium" as const,
    region: "Sri Lanka",
    category: "Political Risk",
  },
  {
    id: "risk-005",
    title: "Currency Fluctuation Impact",
    description:
      "LKR volatility could reduce returns for foreign currency-denominated investments",
    severity: "medium" as const,
    region: "Sri Lanka",
    category: "Currency Risk",
  },
  {
    id: "risk-006",
    title: "China Economic Slowdown Spillover",
    description:
      "Continued Chinese slowdown could reduce capital flows to regional Asian markets",
    severity: "medium" as const,
    region: "Asia-Pacific",
    category: "Economic Risk",
  },
  {
    id: "risk-007",
    title: "London Prime Market Saturation",
    description:
      "Oversupply of luxury developments could pressure price appreciation in Ultra-Prime segment",
    severity: "low" as const,
    region: "United Kingdom",
    category: "Market Risk",
  },
  {
    id: "risk-008",
    title: "Dubai Geopolitical Tensions",
    description:
      "Regional political instability could impact GCC property market sentiment and capital flows",
    severity: "medium" as const,
    region: "Dubai",
    category: "Political Risk",
  },
];

export const globalSentiment = 68;

export const dailySummary = {
  date: new Date("2026-03-08"),
  keySignals: [
    "Sri Lankan tourism arrivals hit 250,000 in March - strongest monthly performance",
    "ECB rate cut to 4.5% supporting European property demand",
    "UK launches investor visa program targeting GBP 2M+ property commitments",
    "Asian UHNWI capital flows accelerating to Singapore and Dubai",
    "US office vacancy rates remain elevated at 13.2% in major metros",
    "Sri Lanka fiscal reforms attracting international development finance",
  ],
  sriLankaOpportunity:
    "Tourism surge combined with fiscal stability and falling mortgage rates creates optimal window for beachfront hospitality and mixed-use development investments",
};

export const marketMapData = [
  {
    country: "United Kingdom",
    lat: 55.3781,
    lng: -3.436,
    sentiment: "positive",
    headline: "New investor visa attracts GBP 2M+ commitments",
    capitalFlow: "inflow",
  },
  {
    country: "United States",
    lat: 37.0902,
    lng: -95.7129,
    sentiment: "negative",
    headline: "Office vacancy crisis pressures commercial valuations",
    capitalFlow: "outflow",
  },
  {
    country: "European Union",
    lat: 54.5973,
    lng: 15.2551,
    sentiment: "positive",
    headline: "ECB cuts to 4.5% as mortgage demand strengthens",
    capitalFlow: "inflow",
  },
  {
    country: "Australia",
    lat: -25.2744,
    lng: 133.7751,
    sentiment: "neutral",
    headline: "Market normalizing with sustainable 3-4% annual growth",
    capitalFlow: "inflow",
  },
  {
    country: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    sentiment: "positive",
    headline: "SGD 3.8B housing initiative supporting market growth",
    capitalFlow: "inflow",
  },
  {
    country: "Sri Lanka",
    lat: 7.8731,
    lng: 80.7718,
    sentiment: "positive",
    headline: "250K monthly arrivals + falling rates driving investment boom",
    capitalFlow: "inflow",
  },
  {
    country: "Dubai",
    lat: 25.2048,
    lng: 55.2708,
    sentiment: "positive",
    headline: "Record AED 178B transactions with strong Asian buyer participation",
    capitalFlow: "inflow",
  },
  {
    country: "China",
    lat: 35.8617,
    lng: 104.1954,
    sentiment: "positive",
    headline: "Q1 2026 sales recovery gains momentum in tier-1 cities",
    capitalFlow: "inflow",
  },
];

import type { StockAnalysis } from '@/types'

const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-20250514'

function buildPrompt(ticker: string): string {
  return `You are a senior financial analyst. Analyze the stock ${ticker} and return ONLY a valid JSON object — no markdown, no explanation, no backticks.

Structure:
{
  "companyName": "Full company name",
  "ticker": "${ticker}",
  "price": 0.00,
  "priceChange": 0.00,
  "priceChangePct": 0.00,
  "marketCap": "string like 2.4T or 450B",
  "sector": "sector name",
  "per": 0.0,
  "cper": 0.0,
  "peg": 0.00,
  "beta": 0.00,
  "dividendYield": 0.00,
  "per_status": "undervalued|fair|overvalued",
  "cper_status": "undervalued|fair|overvalued",
  "peg_status": "undervalued|fair|overvalued",
  "per_interp": "2-sentence PER interpretation for this specific company",
  "cper_interp": "2-sentence CAPE/CPER interpretation",
  "peg_interp": "2-sentence PEG interpretation",
  "short": {
    "sentiment": "bullish|neutral|bearish",
    "score": 0,
    "summary": "2-3 sentence analysis for 1-3 month horizon",
    "points": ["point 1", "point 2", "point 3"]
  },
  "medium": {
    "sentiment": "bullish|neutral|bearish",
    "score": 0,
    "summary": "2-3 sentence analysis for 6-18 month horizon",
    "points": ["point 1", "point 2", "point 3"]
  },
  "long": {
    "sentiment": "bullish|neutral|bearish",
    "score": 0,
    "summary": "2-3 sentence analysis for 3-10 year horizon",
    "points": ["point 1", "point 2", "point 3"]
  },
  "overallScore": 0,
  "verdict": "BUY|HOLD|SELL",
  "verdictReason": "2-sentence overall recommendation"
}

Use realistic approximate data for ${ticker}. Scores are integers 0-100. All text in Spanish.`
}

export async function analyzeStock(ticker: string): Promise<StockAnalysis> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey) {
    console.warn('No Anthropic API key found — using mock data')
    return getMockData(ticker)
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1200,
      messages: [{ role: 'user', content: buildPrompt(ticker) }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`API error ${response.status}: ${err}`)
  }

  const data = await response.json()
  const text: string = data.content
    ?.map((b: { type: string; text?: string }) => b.text ?? '')
    .join('') ?? ''

  const clean = text.replace(/```json|```/g, '').trim()

  try {
    return JSON.parse(clean) as StockAnalysis
  } catch {
    throw new Error('Failed to parse AI response as JSON')
  }
}

// ─── Mock fallback ───────────────────────────────────────────────────────────

export function getMockData(ticker: string): StockAnalysis {
  const mocks: Record<string, StockAnalysis> = {
    AAPL: {
      companyName: 'Apple Inc.',
      ticker: 'AAPL',
      price: 213.49,
      priceChange: 3.21,
      priceChangePct: 1.53,
      marketCap: '3.3T',
      sector: 'Tecnología',
      per: 33.2, cper: 28.7, peg: 2.1, beta: 1.19, dividendYield: 0.51,
      per_status: 'overvalued', cper_status: 'overvalued', peg_status: 'fair',
      per_interp: 'El PER de Apple refleja la prima de marca y ecosistema cerrado. Históricamente cotiza con prima frente al mercado.',
      cper_interp: 'El CAPE ajustado sugiere cotización por encima de media histórica, si bien sus márgenes justifican parte de la prima.',
      peg_interp: 'Con PEG de 2.1 el mercado ya descuenta el crecimiento esperado. La acción no es barata en términos relativos.',
      short: { sentiment: 'bullish', score: 68, summary: 'El ciclo de reemplazo del iPhone 16 y la adopción de Apple Intelligence ofrecen catalizador inmediato. Los resultados del próximo trimestre serán clave.', points: ['Ciclo iPhone 16 en pleno despliegue', 'Apple Intelligence impulsa upgrades', 'Servicios crecen a doble dígito'] },
      medium: { sentiment: 'neutral', score: 55, summary: 'La saturación del mercado de smartphones y presión regulatoria en Europa añaden incertidumbre. La expansión de servicios mitiga parte del riesgo.', points: ['Regulación europea DMA presiona App Store', 'Expansión de Apple TV+ e iCloud', 'Alta dependencia de China'] },
      long: { sentiment: 'bullish', score: 78, summary: 'El ecosistema Apple y su integración hardware-software crean ventaja competitiva duradera. La financiera sólida permite recompras continuadas.', points: ['Recompras de acciones sistemáticas', 'Potencial en AR/VR con Vision Pro', 'Servicios como motor de crecimiento secular'] },
      overallScore: 67, verdict: 'HOLD', verdictReason: 'Apple es una empresa de calidad excepcional, pero el precio actual ya descuenta gran parte del crecimiento esperado. Esperar correcciones para añadir posición.',
    },
    NVDA: {
      companyName: 'NVIDIA Corporation',
      ticker: 'NVDA',
      price: 875.39,
      priceChange: 18.65,
      priceChangePct: 2.18,
      marketCap: '2.1T',
      sector: 'Semiconductores',
      per: 68.1, cper: 55.3, peg: 0.9, beta: 1.71, dividendYield: 0.04,
      per_status: 'overvalued', cper_status: 'overvalued', peg_status: 'undervalued',
      per_interp: 'El PER elevado refleja expectativas de crecimiento explosivo en IA. Para empresas en hipercrecimiento el PER tradicional es menos relevante.',
      cper_interp: 'El CAPE alto señala que NVIDIA cotiza lejos de sus medias históricas, impulsado por la revolución de la IA generativa.',
      peg_interp: 'El PEG por debajo de 1 es la métrica más atractiva: el mercado no estaría pagando en exceso considerando las tasas de crecimiento proyectadas.',
      short: { sentiment: 'bullish', score: 82, summary: 'La demanda de GPUs H100 y H200 supera ampliamente la oferta. Los data centers de hyperscalers siguen expandiendo capacidad IA.', points: ['Demanda GPU supera oferta en 2025', 'Blackwell architecture en despliegue masivo', 'Hyperscalers son grandes clientes'] },
      medium: { sentiment: 'bullish', score: 73, summary: 'El ecosistema CUDA crea un moat defensivo difícil de replicar. La competencia de AMD e Intel es real pero limitada por la ventaja de software.', points: ['Ecosistema CUDA: 15M+ desarrolladores', 'NIM microservices amplía TAM', 'AMD MI300X crece pero rezagado'] },
      long: { sentiment: 'bullish', score: 85, summary: 'NVIDIA está posicionada como infraestructura fundamental de la era IA, análoga a lo que fue Intel en la era del PC.', points: ['Infraestructura crítica para IA global', 'Diversificación a robotics y automotriz', 'Ventaja sostenible en software IA'] },
      overallScore: 80, verdict: 'BUY', verdictReason: 'A pesar del PER elevado, el PEG < 1 y el liderazgo indiscutible en infraestructura IA justifican la valoración actual para inversores con horizonte 3+ años.',
    },
  }

  if (mocks[ticker.toUpperCase()]) return mocks[ticker.toUpperCase()]

  return {
    companyName: `${ticker} Corp.`,
    ticker: ticker.toUpperCase(),
    price: 142.80,
    priceChange: -1.20,
    priceChangePct: -0.83,
    marketCap: '450B',
    sector: 'Tecnología',
    per: 22.4, cper: 19.8, peg: 1.6, beta: 0.95, dividendYield: 1.2,
    per_status: 'fair', cper_status: 'fair', peg_status: 'fair',
    per_interp: 'La valoración actual parece razonable para el sector. El PER refleja expectativas de crecimiento moderado del consenso de analistas.',
    cper_interp: 'El CPER sugiere que la empresa cotiza en línea con su valoración histórica ajustada por ciclo económico.',
    peg_interp: 'Un PEG de 1.6 indica que el crecimiento esperado está parcialmente descontado. No es una ganga, pero tampoco excesivamente cara.',
    short: { sentiment: 'neutral', score: 52, summary: 'El mercado está en fase de consolidación y la acción podría mantenerse lateral. Los próximos resultados trimestrales darán dirección.', points: ['Soporte técnico en medias móviles', 'Volumen de trading en niveles normales', 'Catalizador próximo: resultados Q2'] },
    medium: { sentiment: 'bullish', score: 61, summary: 'Fundamentales sólidos y diversificación de ingresos ofrecen visibilidad. La expansión de márgenes es el factor a seguir.', points: ['Expansión de márgenes operativos', 'Pipeline de producto robusto', 'Reducción de deuda mejora balance'] },
    long: { sentiment: 'bullish', score: 70, summary: 'La posición de mercado consolidada y el flujo de caja libre sostenido hacen de esta empresa una candidata sólida para carteras de largo plazo.', points: ['Flujo de caja libre creciente', 'Dividendo sostenible y creciente', 'Ventaja competitiva en su nicho'] },
    overallScore: 61, verdict: 'HOLD', verdictReason: 'La empresa presenta fundamentales sólidos a un precio razonable. Recomendamos mantener posiciones y considerar añadir en correcciones superiores al 10%.',
  }
}

# StockIQ — Analizador de Acciones con IA

Aplicación web de análisis de acciones con inteligencia artificial. Analiza cualquier ticker con horizontes corto, mediano y largo plazo, incluyendo métricas de valoración PER, CPER y PEG.

## Stack tecnológico

- **React 18** + **TypeScript** + **Vite**
- **Zustand** — estado global (auth + análisis)
- **TanStack Query** — gestión de datos asíncronos
- **Firebase Auth** — autenticación con Google
- **Anthropic API** — análisis IA con Claude Sonnet
- **CSS Modules** — estilos encapsulados por componente
- **Lucide React** — iconos

## Estructura del proyecto

```
stockiq/
├── src/
│   ├── components/
│   │   ├── analysis/         # Componentes de análisis
│   │   │   ├── SearchBar       # Buscador + accesos rápidos
│   │   │   ├── LoadingState    # Animación de carga con pasos
│   │   │   ├── AnalysisResults # Orquestador de resultados
│   │   │   ├── HorizonCard     # Tarjeta corto/medio/largo plazo
│   │   │   ├── ValuationSection# Métricas PER, CPER, PEG
│   │   │   ├── VerdictBox      # Veredicto IA final
│   │   │   └── HistoryPanel    # Historial de búsquedas
│   │   ├── layout/
│   │   │   └── Navbar          # Barra de navegación sticky
│   │   └── ui/
│   │       ├── Button          # Botón reutilizable con variantes
│   │       ├── MetricCard      # Tarjeta de métrica numérica
│   │       └── Badge           # Etiqueta de estado/categoría
│   ├── hooks/
│   │   ├── useAuth.ts          # Hook de autenticación Firebase
│   │   └── useAnalysis.ts      # Hook de análisis IA
│   ├── pages/
│   │   ├── LoginPage.tsx       # Pantalla de login con Google
│   │   └── DashboardPage.tsx   # Panel principal
│   ├── services/
│   │   ├── firebase.ts         # Configuración + helpers Firebase
│   │   └── anthropic.ts        # Llamadas a API Claude + mock data
│   ├── store/
│   │   ├── authStore.ts        # Store Zustand de autenticación
│   │   └── analysisStore.ts    # Store Zustand de análisis
│   ├── types/
│   │   └── index.ts            # Tipos TypeScript globales
│   ├── utils/
│   │   └── index.ts            # cn(), formatPrice(), formatPct()
│   ├── styles/
│   │   └── globals.css         # Variables CSS + reset global
│   ├── App.tsx                 # Guard de autenticación + router
│   ├── main.tsx                # Entry point
│   └── vite-env.d.ts           # Tipos de variables de entorno
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .env.example
```

## Instalación y configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
# Anthropic — obtén tu clave en https://console.anthropic.com
VITE_ANTHROPIC_API_KEY=sk-ant-...

# Firebase — crea un proyecto en https://console.firebase.google.com
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 3. Configurar Firebase Auth (Google)

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Crea un proyecto nuevo
3. Ve a **Authentication → Sign-in method**
4. Activa **Google**
5. En **Project settings**, copia la configuración web a tu `.env`
6. En **Authentication → Settings → Authorized domains**, añade `localhost`

### 4. Iniciar en desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`

## Modo demo

Si no tienes credenciales de Firebase o Anthropic, la app funciona en **modo demo**:

- El botón "Probar demo sin cuenta" omite la autenticación de Google
- Sin `VITE_ANTHROPIC_API_KEY`, se usan datos mock realistas para AAPL, NVDA y otros tickers

## Scripts disponibles

```bash
npm run dev        # Servidor de desarrollo con HMR
npm run build      # Build de producción (tsc + vite build)
npm run preview    # Preview del build de producción
npm run lint       # ESLint con reglas TypeScript estrictas
npm run type-check # Verificación de tipos sin emit
```

## Métricas de valoración

| Métrica | Descripción | Referencia |
|---------|-------------|------------|
| **PER** | Price/Earnings ratio actual | < 15 barato · > 25 caro (depende del sector) |
| **CPER** | CAPE (Shiller) — PER ajustado cíclicamente con 10 años de beneficios | < 15 infravalorado · > 30 sobrevalorado |
| **PEG** | PER / tasa de crecimiento esperada | < 1 potencialmente infravalorado · > 2 caro |
| **Beta** | Volatilidad relativa al mercado | 1 = mercado · > 1 más volátil |

## Nota de seguridad

> La API key de Anthropic se expone en el cliente (prefijo `VITE_`). Para producción,
> implementa un backend proxy (Express/Next.js) que gestione las llamadas a la API
> sin exponer la clave. Firebase Auth es seguro ya que usa OAuth con tokens de corta vida.

## Licencia

MIT

# Implementación de Fuentes Personalizadas EUFÓRICA

Este archivo contiene toda la configuración necesaria para implementar las fuentes personalizadas TAN Pearl y PP Monument Extended en el proyecto.

## Fuentes Disponibles

Las fuentes están ubicadas en: `public/fonts/`

- **TAN Pearl** (`tan-pearl.woff`) - Elegante y sofisticada para títulos
- **PP Monument Extended Light** (`PPMonumentExtended-Light.otf`) - Geométrica moderna
- **PP Monument Extended Regular** (`PPMonumentExtended-Regular.otf`) - Geométrica moderna

## Configuración

### 1. app/layout.tsx

Reemplazar las importaciones de fuentes de Google por fuentes locales:

```typescript
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { GoogleAnalytics } from '@next/third-parties/google';

// TAN Pearl - Fuente elegante y sofisticada para títulos principales
const tanPearl = localFont({
  src: "../public/fonts/tan-pearl.woff",
  variable: "--font-tan-pearl",
  display: "swap",
});

// PP Monument Extended - Fuente geométrica moderna para textos
const monumentExtended = localFont({
  src: [
    {
      path: "../public/fonts/PPMonumentExtended-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/PPMonumentExtended-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-monument",
  display: "swap",
});
```

Y en el return del Layout:

```typescript
<body className={`${tanPearl.variable} ${monumentExtended.variable} font-sans antialiased`}>
```

### 2. tailwind.config.ts

En la sección `fontFamily` dentro de `extend`:

```typescript
fontFamily: {
  serif: ['var(--font-tan-pearl)', 'serif'],
  sans: ['var(--font-monument)', 'system-ui', 'sans-serif'],
},
```

### 3. Ajustes de Tamaño en Componentes

#### components/sections/hero-section.tsx

```typescript
// Eyebrow text
className="mb-6 text-xs font-normal uppercase tracking-[0.35em] text-neutral-300"

// Main headline (h1)
className="font-serif text-5xl font-normal leading-[1.15] tracking-tight text-white md:text-6xl lg:text-7xl"

// Subtitle
className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-neutral-300 md:text-lg"
```

#### components/layout/header.tsx

```typescript
// Logo EUFÓRICA
className={`font-serif text-xl font-normal tracking-tight transition-colors ${...}`}
```

#### components/sections/lead-wizard.tsx

```typescript
// Eyebrow
className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-400"

// Título h2
className="font-serif text-4xl font-normal tracking-tight md:text-5xl"
```

## Configuración Original (Google Fonts)

Para volver a las fuentes originales:

### app/layout.tsx

```typescript
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { GoogleAnalytics } from '@next/third-parties/google';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});
```

Body:
```typescript
<body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
```

### tailwind.config.ts

```typescript
fontFamily: {
  serif: ['var(--font-playfair)', 'serif'],
  sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
},
```

### Tamaños Originales de Componentes

#### hero-section.tsx

```typescript
// Eyebrow
className="mb-6 text-sm font-light uppercase tracking-[0.3em] text-neutral-300"

// Main headline
className="font-serif text-6xl font-light leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl"

// Subtitle
className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl"
```

#### header.tsx

```typescript
// Logo
className={`font-serif text-2xl font-light tracking-tight transition-colors ${...}`}
```

#### lead-wizard.tsx

```typescript
// Eyebrow
className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400"

// Título
className="font-serif text-5xl font-light tracking-tight md:text-6xl"
```

## Cómo Implementar

Para implementar las fuentes personalizadas, simplemente copia y pega las configuraciones de la sección "Configuración" en sus respectivos archivos.

Para volver a las originales, usa las configuraciones de la sección "Configuración Original".

## Notas

- Las fuentes personalizadas están optimizadas para WOFF y OTF
- TAN Pearl funciona mejor en títulos grandes (h1, h2)
- Monument Extended es ideal para navegación y cuerpo de texto
- Los ajustes de tamaño fueron calibrados para mejor legibilidad con estas fuentes específicas

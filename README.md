# Euforica — Landing Page Premium

Landing page de lujo para Euforica, empresa de producción de eventos de alto nivel.

## 🎯 Stack Tecnológico

- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes:** Shadcn/UI (Radix Primitives)
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Formularios:** React Hook Form + Zod
- **Fuentes:** Playfair Display (serif) + Inter
- **CMS:** Sanity.io (Headless CMS integrado) ✨

## 🚀 Instalación

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Configurar Sanity (ver SANITY_SETUP.md)
# 1. Crea proyecto en sanity.io
# 2. Copia .env.local.template a .env.local
# 3. Agrega tu SANITY_PROJECT_ID

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

**Sanity Studio:** [http://localhost:3000/studio](http://localhost:3000/studio)

## 📁 Estructura del Proyecto

```
euforica/
├── app/
│   ├── actions/          # Server Actions (submit-lead.ts)
│   ├── blog/
│   │   ├── [slug]/       # Páginas dinámicas de artículos
│   │   └── page.tsx      # Listado completo del blog
│   ├── layout.tsx        # Layout principal con fuentes + Footer
│   ├── page.tsx          # Homepage
│   └── globals.css       # Estilos globales
├── components/
│   ├── blog/            # Componentes del blog
│   │   └── blog-post-content.tsx
│   ├── layout/          # Componentes de layout
│   │   └── footer.tsx
│   ├── sections/         # Secciones de la página
│   │   ├── hero-section.tsx
│   │   ├── social-proof.tsx
│   │   ├── blog-grid.tsx
│   │   └── lead-wizard.tsx
│   └── ui/              # Componentes base Shadcn/UI
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── slider.tsx
├── lib/
│   ├── blog-data.ts     # Data helper para blog posts
│   ├── utils.ts         # Utilidades
│   └── validations/     # Esquemas de validación Zod
├── types/
│   └── blog.ts          # Interfaces TypeScript para Sanity.io
└── public/
    └── videos/          # Coloca aquí hero-background.mp4
```

## 🎨 Secciones Implementadas

### 1. Hero Section Cinemático

- Video de fondo con overlay elegante
- Animaciones Framer Motion (fade-in suave)
- CTA con efecto hover refinado
- Scroll indicator animado

### 2. Social Proof

- Marquee infinito con testimonios
- Animación fluida y continua

### 3. Blog Grid Editorial

- Diseño asimétrico tipo revista de moda
- Interfaz TypeScript preparada para Sanity.io
- Dummy data incluido para demo
- Animaciones on-scroll
- **✨ Rutas dinámicas funcionando** (`/blog` y `/blog/[slug]`)

### 4. Lead Wizard Interactivo

- Formulario multi-paso (3 steps)
- Validación con Zod
- Selección visual de tipo de evento
- Slider para cantidad de invitados
- Server Action preparado para n8n

### 5. Footer Premium ✨ NUEVO

- Diseño elegante y minimalista
- Links organizados (Servicios, Empresa, Legal)
- Información de contacto con iconos
- Redes sociales con animaciones hover
- Newsletter signup
- Copyright y enlaces legales
- Slider para cantidad de invitados
- Server Action preparado para n8n

## 🎨 Sanity.io CMS ✨ INTEGRADO

### ✅ Ya Configurado:

- Sanity Studio embedded en `/studio`
- Schemas completos (Post, Author, Category)
- Queries GROQ optimizadas con ISR
- Portable Text renderer con estilos personalizados
- Image optimization con hotspot

### 🚀 Para Activarlo:

Lee la guía completa en **[SANITY_SETUP.md](SANITY_SETUP.md)**

**Pasos rápidos:**

1. Crea proyecto en [sanity.io](https://sanity.io)
2. Copia tu Project ID
3. Crea `.env.local` con tu configuración
4. Reinicia el servidor
5. Accede a `/studio` para crear contenido

### n8n (Automation)

1. Configurar webhook en n8n
2. Actualizar URL en `app/actions/submit-lead.ts`
3. Descomentar código de fetch

## 📹 Asset Requerido

Coloca un video llamado `hero-background.mp4` en la carpeta `public/videos/`

**Características recomendadas:**

- Formato: MP4 (H.264)
- Resolución: 1920x1080 mínimo
- Duración: 10-30 segundos
- Peso: Optimizado (< 5MB)
- Contenido: Eventos elegantes, detalles de decoración, ambientes sofisticados

## 🎨 Paleta de Colores

El diseño usa una paleta **monocromática estricta**:

- **Fondo claro:** `#FFFFFF` (Blanco puro)
- **Fondo oscuro:** `#050505` (Negro profundo)
- **Escala de grises:** Neutral 100-900
- **Sin colores chillones** — La elegancia está en el espacio en blanco

## ⚡ Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## 🔮 Próximos Pasos

1. **Agregar video de hero** en `public/videos/hero-background.mp4`
2. **Integrar Sanity.io** para el blog dinámico
3. **Conectar n8n webhook** para captura de leads
4. **Optimizar imágenes** del blog con Next.js Image
5. **Implementar página `/blog/[slug]`** para artículos individuales
6. **Agregar navegación** (header/footer)
7. **Tests E2E** con Playwright

## 📄 Licencia

Privado — Euforica Events

---

**Desarrollado con ❤️ por tu Senior Frontend Architect**

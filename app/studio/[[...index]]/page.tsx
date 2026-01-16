'use client';

/**
 * Ruta dinámica para renderizar Sanity Studio dentro de Next.js
 * Accede a /studio para administrar tu contenido
 */

import { NextStudio } from 'next-sanity/studio';

import config from '@/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}

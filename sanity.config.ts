/**
 * Configuración principal de Sanity Studio
 * Este archivo define cómo se ve y funciona el CMS en /studio
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schema';

export default defineConfig({
  basePath: '/studio', // Ruta donde vivirá el Studio dentro de Next.js
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(), // Editor visual
    visionTool({ defaultApiVersion: apiVersion }), // Testing de queries GROQ
  ],
  // Personalización del Studio
  title: 'Euforica CMS',
  icon: () => '✨',
});

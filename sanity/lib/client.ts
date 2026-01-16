import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, readToken } from '../env';

/**
 * Cliente de Sanity configurado para fetching de datos
 * Usa este cliente para queries GROQ desde el frontend
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Deshabilitado para ISR - obtiene datos frescos
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
});

/**
 * Cliente con token de lectura para contenido en draft (preview mode)
 */
export const clientWithToken = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
  perspective: 'previewDrafts',
});

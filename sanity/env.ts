/**
 * Validación de variables de entorno de Sanity
 * Estas variables deben estar definidas en .env.local
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'NEXT_PUBLIC_SANITY_DATASET no está definido en las variables de entorno'
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_PROJECT_ID no está definido en las variables de entorno'
);

// Token de lectura (opcional, solo si necesitas contenido en draft)
export const readToken = process.env.SANITY_API_READ_TOKEN || '';

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

import { client } from './client';

/**
 * Helper para generar URLs optimizadas de imágenes desde Sanity
 * También maneja URLs directas de los datos de ejemplo
 * 
 * Uso:
 * ```tsx
 * <img src={urlForImage(post.mainImage)?.width(800).height(600).url()} />
 * ```
 */
const builder = imageUrlBuilder(client);

export function urlForImage(source: any) {
  // Si no hay source, retornar undefined
  if (!source) {
    return undefined;
  }

  // Si es una URL directa (datos de ejemplo), crear objeto mock con método url()
  if (source.asset?.url) {
    return {
      width: () => ({ height: () => ({ url: () => source.asset.url }) }),
      height: () => ({ url: () => source.asset.url }),
      url: () => source.asset.url,
    };
  }

  // Si es referencia de Sanity, usar el builder normal
  if (source.asset?._ref) {
    return builder.image(source).auto('format').fit('max');
  }

  return undefined;
}

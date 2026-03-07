import { groq } from 'next-sanity';
import { client } from './client';
import { getExamplePosts, getExamplePostBySlug } from '@/lib/blog-data';

/**
 * Queries GROQ para obtener posts del blog
 * Incluye fallback a datos de ejemplo si no hay posts en Sanity
 */

// Query para obtener todos los posts publicados (para la landing)
const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  },
  excerpt,
  publishedAt,
  readTime,
  "author": author->{
    name,
    image {
      asset->{
        _id,
        url
      }
    }
  },
  "categories": categories[]->{
    _id,
    title
  }
}`;

// Query para obtener un post individual por slug
const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  },
  excerpt,
  publishedAt,
  readTime,
  body,
  "author": author->{
    name,
    bio,
    image {
      asset->{
        _id,
        url
      }
    }
  },
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current
  }
}`;

/**
 * Obtener todos los posts publicados
 * Usa revalidate para ISR (Incremental Static Regeneration)
 * Si no hay posts en Sanity, devuelve datos de ejemplo
 */
export async function getPosts() {
  try {
    const posts = await client.fetch(postsQuery, {}, {
      next: {
        revalidate: 60, // Revalidar cada 60 segundos
      },
    });
    
    // Si hay posts en Sanity, úsalos
    if (posts && posts.length > 0) {
      return posts;
    }
    
    // Fallback a datos de ejemplo
    console.log('📝 Usando datos de ejemplo del blog (no hay posts en Sanity)');
    return getExamplePosts();
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error);
    // En caso de error, usar datos de ejemplo
    return getExamplePosts();
  }
}

/**
 * Obtener un post individual por su slug
 * @param slug - El slug del post (ej: "tendencias-2026")
 * Si no se encuentra en Sanity, busca en datos de ejemplo
 */
export async function getPostBySlug(slug: string) {
  try {
    const post = await client.fetch(postBySlugQuery, { slug }, {
      next: {
        revalidate: 60,
      },
    });
    
    // Si encontramos el post en Sanity, devolverlo
    if (post) {
      return post;
    }
    
    // Fallback a datos de ejemplo
    console.log(`📝 Usando post de ejemplo: ${slug}`);
    return getExamplePostBySlug(slug);
  } catch (error) {
    console.error('Error fetching post from Sanity:', error);
    // En caso de error, buscar en datos de ejemplo
    return getExamplePostBySlug(slug);
  }
}

/**
 * Obtener todos los slugs de posts (para generateStaticParams)
 * Combina slugs de Sanity con slugs de ejemplo
 */
export async function getPostSlugs() {
  try {
    const slugsQuery = groq`*[_type == "post" && defined(slug.current)].slug.current`;
    const sanitySlugs = await client.fetch<string[]>(slugsQuery, {}, {
      next: {
        revalidate: 3600, // Revalidar cada hora
      },
    });
    
    // Combinar slugs de Sanity con slugs de ejemplo
    const exampleSlugs = getExamplePosts().map(post => post.slug);
    
    // Remover duplicados
    const allSlugs = [...new Set([...sanitySlugs, ...exampleSlugs])];
    
    return allSlugs;
  } catch (error) {
    console.error('Error fetching slugs from Sanity:', error);
    // En caso de error, usar solo slugs de ejemplo
    return getExamplePosts().map(post => post.slug);
  }
}

/**
 * GALERÍA DE EVENTOS
 */

// Query para obtener una galería por eventId
const galleryByEventIdQuery = groq`*[_type == "gallery" && eventId.current == $eventId][0] {
  _id,
  "eventId": eventId.current,
  eventName,
  eventType,
  coverImage {
    asset->{
      _id,
      url
    }
  },
  photos[] {
    asset->{
      _id,
      url
    },
    caption,
    order
  },
  expirationDate,
  isActive,
  allowDownload,
  viewCount,
  createdAt
}`;

/**
 * Obtener una galería por su eventId
 * Valida que la galería esté activa y no haya expirado
 * @param eventId - El ID único del evento
 * @returns Galería si está disponible, null si expiró o está inactiva
 */
export async function getGalleryByEventId(eventId: string) {
  try {
    const gallery = await client.fetch(galleryByEventIdQuery, { eventId }, {
      next: {
        revalidate: 60, // Reducido a 1 minuto para debugging
      },
    });

    if (!gallery) {
      console.log(`❌ Galería no encontrada: ${eventId}`);
      return null;
    }

    // Validar que la galería esté activa
    if (!gallery.isActive) {
      console.log(`🔴 Galería inactiva: ${eventId}`);
      return null;
    }

    // Validar que no haya expirado - MEJORADO CON LOGS DETALLADOS
    const now = new Date();
    const expirationDate = new Date(gallery.expirationDate);
    
    // Log detallado para debugging
    console.log('🔍 DEBUG Comparación de fechas:');
    console.log(`   Galería: ${eventId}`);
    console.log(`   Ahora (servidor): ${now.toISOString()} (${now.toLocaleString('es-CL', { timeZone: 'America/Santiago' })})`);
    console.log(`   Expira el: ${expirationDate.toISOString()} (${expirationDate.toLocaleString('es-CL', { timeZone: 'America/Santiago' })})`);
    console.log(`   Diferencia: ${Math.floor((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} días`);
    
    // Comparar usando timestamps para evitar problemas de zona horaria
    if (expirationDate.getTime() < now.getTime()) {
      console.log(`⏰ Galería expirada: ${eventId}`);
      console.log(`   Expiró hace ${Math.abs(Math.floor((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))} días`);
      return null;
    }

    // Ordenar fotos por el campo 'order' si existe
    if (gallery.photos) {
      gallery.photos.sort((a: any, b: any) => {
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;
        return orderA - orderB;
      });
    }

    const daysRemaining = Math.floor((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    console.log(`✅ Galería cargada: ${gallery.eventName} (${gallery.photos?.length || 0} fotos, expira en ${daysRemaining} días)`);
    return gallery;
  } catch (error) {
    console.error('❌ Error fetching gallery from Sanity:', error);
    return null;
  }
}

/**
 * Incrementar el contador de visitas de una galería
 * Se llama cada vez que alguien accede a la galería
 * @param eventId - El ID único del evento
 */
export async function incrementGalleryViewCount(eventId: string) {
  try {
    // Nota: Esta función requiere un token de escritura
    // Por ahora solo registra el intento
    console.log(`📊 Vista registrada para: ${eventId}`);
    
    // Para implementar contador real:
    // await client.patch(galleryId).inc({ viewCount: 1 }).commit();
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
}


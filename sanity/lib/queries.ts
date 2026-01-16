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

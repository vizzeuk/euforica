/**
 * Tipos TypeScript para los datos que vienen de Sanity
 * Estos tipos coinciden con lo que devuelven las queries GROQ
 */

export interface SanityImageAsset {
  _id: string;
  url: string;
}

export interface SanityImage {
  asset: SanityImageAsset;
  alt?: string;
}

export interface SanityAuthor {
  name: string;
  bio?: string;
  image?: SanityImage;
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug?: string;
}

// Tipo para el body (Portable Text)
export interface PortableTextBlock {
  _type: string;
  _key: string;
  [key: string]: any;
}

/**
 * Post completo con body (para página individual)
 */
export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  mainImage: SanityImage;
  excerpt: string;
  publishedAt: string;
  readTime?: number;
  body?: PortableTextBlock[];
  author?: SanityAuthor;
  categories?: SanityCategory[];
}

/**
 * Post resumido (para listados)
 */
export interface SanityPostSummary {
  _id: string;
  title: string;
  slug: string;
  mainImage: SanityImage;
  excerpt: string;
  publishedAt: string;
  readTime?: number;
  author?: SanityAuthor;
  categories?: SanityCategory[];
}

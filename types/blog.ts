// Interfaces TypeScript para integración futura con Sanity.io

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface BlogPost {
  _id: string;
  _type: "post";
  title: string;
  slug: {
    current: string;
  };
  mainImage: SanityImage;
  excerpt: string;
  publishedAt: string;
  author?: {
    name: string;
    image?: SanityImage;
  };
  categories?: Array<{
    _id: string;
    title: string;
  }>;
  readTime?: number;
}

export interface BlogGridProps {
  posts?: BlogPost[];
}

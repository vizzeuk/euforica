/**
 * Datos de ejemplo para el blog
 * Compatible con la estructura de Sanity - Úsalos como fallback o para desarrollo
 */

export const EXAMPLE_POSTS = [
  {
    _id: "example-1",
    title: "La Elegancia en los Detalles: Tendencias 2026",
    slug: "tendencias-2026",
    mainImage: {
      asset: {
        _id: "image-1",
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop",
      },
      alt: "Elegancia en eventos premium",
    },
    excerpt: "Descubre cómo los pequeños detalles transforman una celebración ordinaria en una experiencia memorable que tus invitados recordarán por siempre.",
    publishedAt: "2026-01-10",
    readTime: 5,
    author: {
      name: "María González",
      image: {
        asset: {
          _id: "author-1",
          url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
        },
      },
    },
    categories: [
      { _id: "cat-1", title: "Tendencias" },
      { _id: "cat-2", title: "Diseño" },
    ],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "El mundo de los eventos premium está experimentando una transformación hacia lo auténtico y lo minimalista. En 2026, las tendencias apuntan a crear experiencias memorables a través de la sutileza y la elegancia.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "Minimalismo con Impacto",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Menos es más. Esta premisa define la nueva era de los eventos de lujo, donde cada elemento cuenta una historia y tiene un propósito.",
          },
        ],
      },
    ],
  },
  {
    _id: "example-2",
    title: "Bodas de Ensueño: Del Concepto a la Realidad",
    slug: "bodas-de-ensueno",
    mainImage: {
      asset: {
        _id: "image-2",
        url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&h=800&fit=crop",
      },
      alt: "Boda premium con diseño sofisticado",
    },
    excerpt: "Un viaje visual por nuestras bodas más icónicas, donde cada momento cuenta una historia única de amor y celebración.",
    publishedAt: "2026-01-05",
    readTime: 8,
    author: {
      name: "Carlos Mendoza",
      image: {
        asset: {
          _id: "author-2",
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        },
      },
    },
    categories: [
      { _id: "cat-3", title: "Bodas" },
      { _id: "cat-4", title: "Inspiración" },
    ],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Una boda es más que un evento: es la materialización de un sueño compartido. Desde la primera lluvia de ideas hasta el último brindis, cada paso del proceso es una oportunidad para crear algo extraordinario.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "La Magia de los Detalles",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Desde la selección de flores hasta la iluminación perfecta, cada detalle contribuye a crear momentos inolvidables.",
          },
        ],
      },
    ],
  },
  {
    _id: "example-3",
    title: "Eventos Corporativos que Inspiran",
    slug: "eventos-corporativos",
    mainImage: {
      asset: {
        _id: "image-3",
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop",
      },
      alt: "Evento corporativo moderno y elegante",
    },
    excerpt: "Cómo crear experiencias corporativas que reflejen la identidad de tu marca y generen conexiones auténticas entre los asistentes.",
    publishedAt: "2025-12-28",
    readTime: 6,
    author: {
      name: "Ana Rodríguez",
      image: {
        asset: {
          _id: "author-3",
          url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
        },
      },
    },
    categories: [
      { _id: "cat-5", title: "Corporativos" },
      { _id: "cat-6", title: "Estrategia" },
    ],
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Los eventos corporativos han evolucionado de ser simples reuniones a convertirse en poderosas herramientas de branding y conexión humana. En el mundo post-pandemia, la calidad supera a la cantidad.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "Estrategia y Ejecución",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Un evento corporativo exitoso comienza con una estrategia clara y se ejecuta con precisión impecable.",
          },
        ],
      },
    ],
  },
];

/**
 * Usar estos datos como fallback cuando no hay posts en Sanity
 * o para desarrollo/preview
 */
export function getExamplePosts() {
  return EXAMPLE_POSTS;
}

export function getExamplePostBySlug(slug: string) {
  return EXAMPLE_POSTS.find((post) => post.slug === slug);
}

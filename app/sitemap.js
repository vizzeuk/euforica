/**
 * Sitemap para EUFÓRICA
 * Next.js genera automáticamente el sitemap.xml desde este archivo
 * Accesible en: https://euforica.cl/sitemap.xml
 */

export default function sitemap() {
  const baseUrl = 'https://euforica.cl';
  const currentDate = new Date();

  return [
    // Home - Máxima prioridad
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },

    // Páginas principales - Descomentar cuando estén activas
    {
      url: `${baseUrl}/servicios`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Páginas estáticas adicionales - Descomentar cuando se creen
    // {
    //   url: `${baseUrl}/nosotros`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },
    // {
    //   url: `${baseUrl}/contacto`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },
    // {
    //   url: `${baseUrl}/portafolio`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // },

    // Páginas legales - Descomentar cuando se creen
    // {
    //   url: `${baseUrl}/privacidad`,
    //   lastModified: currentDate,
    //   changeFrequency: 'yearly',
    //   priority: 0.3,
    // },
    // {
    //   url: `${baseUrl}/terminos`,
    //   lastModified: currentDate,
    //   changeFrequency: 'yearly',
    //   priority: 0.3,
    // },
  ];
}

/**
 * NOTAS:
 * 
 * Priority (0.0 - 1.0):
 * - 1.0: Páginas más importantes (Home)
 * - 0.8: Páginas principales (Servicios, Blog)
 * - 0.7: Páginas secundarias (Nosotros, Contacto)
 * - 0.5: Contenido estándar (Posts individuales)
 * - 0.3: Páginas legales
 * 
 * Change Frequency:
 * - always: Cambia en cada acceso
 * - hourly: Cada hora
 * - daily: Diariamente
 * - weekly: Semanalmente
 * - monthly: Mensualmente
 * - yearly: Anualmente
 * - never: Archivado/Nunca cambia
 * 
 * Para agregar rutas dinámicas (ej: posts de blog):
 * 1. Importa tu función de queries de Sanity
 * 2. Haz fetch de los datos
 * 3. Map sobre los resultados y agrega al array
 * 
 * Ejemplo:
 * const posts = await getPosts();
 * const blogUrls = posts.map(post => ({
 *   url: `${baseUrl}/blog/${post.slug.current}`,
 *   lastModified: new Date(post.publishedAt),
 *   changeFrequency: 'monthly',
 *   priority: 0.5,
 * }));
 * return [...staticUrls, ...blogUrls];
 */

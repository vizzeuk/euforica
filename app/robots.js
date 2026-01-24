/**
 * Robots.txt para EUFÓRICA
 * Next.js genera automáticamente el robots.txt desde este archivo
 * Accesible en: https://euforica.cl/robots.txt
 */

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/admin/', // Descomentar si necesitas bloquear rutas privadas
    },
    sitemap: 'https://euforica.cl/sitemap.xml',
  };
}

/**
 * NOTAS:
 * 
 * Este archivo permite a todos los bots rastrear todo el sitio.
 * 
 * Para bloquear rutas específicas:
 * rules: {
 *   userAgent: '*',
 *   allow: '/',
 *   disallow: ['/admin/', '/api/'],
 * }
 * 
 * Para configurar diferentes reglas por bot:
 * rules: [
 *   {
 *     userAgent: 'Googlebot',
 *     allow: ['/'],
 *     disallow: ['/admin/'],
 *   },
 *   {
 *     userAgent: 'Bingbot',
 *     allow: ['/'],
 *     disallow: ['/admin/'],
 *   },
 * ]
 */

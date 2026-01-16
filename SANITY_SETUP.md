# 📚 Guía de Integración Sanity.io - Euforica

Esta guía te ayudará a configurar y usar Sanity.io como CMS para el blog de Euforica.

## ✅ 1. Dependencias Instaladas

```bash
npm install --legacy-peer-deps sanity next-sanity @sanity/vision @sanity/image-url @portabletext/react
```

**Paquetes instalados:**

- `sanity` - Studio CMS
- `next-sanity` - Integración con Next.js
- `@sanity/vision` - Query testing tool
- `@sanity/image-url` - Helper para imágenes optimizadas
- `@portabletext/react` - Renderizado de contenido rico

---

## 🚀 2. Crear Proyecto en Sanity.io

### Paso 1: Regístrate/Inicia sesión

1. Ve a https://sanity.io
2. Crea una cuenta o inicia sesión
3. Click en **"Create new project"**

### Paso 2: Configura tu proyecto

1. **Project name:** Euforica Blog
2. **Dataset:** production
3. **Template:** Blank (empezar desde cero)
4. Copia el **Project ID** que te aparece

---

## 🔐 3. Configurar Variables de Entorno

### Crear archivo `.env.local`

Crea un archivo `.env.local` en la raíz del proyecto con estas variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id_de_sanity
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**⚠️ Importante:** Reemplaza `tu_project_id_de_sanity` con el Project ID que copiaste.

---

## 📁 4. Estructura de Archivos Creada

```
euforica/
├── sanity/
│   ├── env.ts                    # Validación de variables de entorno
│   ├── schema.ts                 # Exportación de schemas
│   ├── schemas/
│   │   ├── post.ts              # Schema de artículos
│   │   ├── category.ts          # Schema de categorías
│   │   └── author.ts            # Schema de autores
│   └── lib/
│       ├── client.ts            # Cliente de Sanity
│       ├── image.ts             # Helper para imágenes
│       ├── queries.ts           # Queries GROQ
│       └── types.ts             # Tipos TypeScript
├── app/
│   └── studio/
│       └── [[...index]]/
│           └── page.tsx         # Ruta de Sanity Studio
├── components/
│   └── blog/
│       └── portable-text-renderer.tsx
└── sanity.config.ts             # Configuración del Studio
```

---

## 🎨 5. Acceder a Sanity Studio

Una vez configuradas las variables de entorno:

1. **Reinicia el servidor** de desarrollo:

   ```bash
   npm run dev
   ```

2. **Accede al Studio**:

   ```
   http://localhost:3000/studio
   ```

3. **Primera vez:**
   - Te pedirá iniciar sesión con tu cuenta de Sanity
   - Autoriza la aplicación
   - Ya podrás crear contenido

---

## ✍️ 6. Crear tu Primer Artículo

En el Studio (`/studio`):

1. Click en **"Post"** (Artículo de Blog)
2. Click en **"Create new"**
3. Completa los campos:
   - **Título**: "Mi primer artículo"
   - **Slug**: Click en "Generate" para auto-generar
   - **Imagen Principal**: Sube una imagen
   - **Fecha de Publicación**: Deja la fecha actual
   - **Resumen**: Un texto breve (50-200 caracteres)
   - **Contenido**: Escribe el artículo usando el editor rico
4. Click en **"Publish"**

---

## 🔄 7. Integrar Sanity con tu Frontend

### Actualizar `components/sections/blog-grid.tsx`

Reemplaza el import y la función de datos:

```tsx
// ❌ ANTES (datos mock)
import { getAllBlogPosts } from "@/lib/blog-data";

export function BlogGrid() {
  const posts = getAllBlogPosts();
  // ...
}
```

```tsx
// ✅ DESPUÉS (datos de Sanity)
import { getPosts } from "@/sanity/lib/queries";
import type { SanityPostSummary } from "@/sanity/lib/types";

export async function BlogGrid() {
  const posts: SanityPostSummary[] = await getPosts();
  // ...
}
```

### Actualizar `app/blog/[slug]/page.tsx`

```tsx
import { getPostBySlug, getPostSlugs } from "@/sanity/lib/queries";
import type { SanityPost } from "@/sanity/lib/types";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post: SanityPost = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
```

### Actualizar `components/blog/blog-post-content.tsx`

Para renderizar el body desde Sanity:

```tsx
import { PortableTextRenderer } from "@/components/blog/portable-text-renderer";

// En lugar de usar contenido hardcodeado:
{
  post.body && <PortableTextRenderer value={post.body} />;
}
```

---

## 🖼️ 8. Usar Imágenes de Sanity

Para mostrar imágenes optimizadas:

```tsx
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

// En el componente:
{
  post.mainImage && (
    <Image
      src={urlForImage(post.mainImage)?.width(800).height(600).url() || ""}
      alt={post.mainImage.alt || post.title}
      width={800}
      height={600}
      className="rounded-lg"
    />
  );
}
```

---

## 🔄 9. Revalidación (ISR)

Los posts se revalidan automáticamente cada 60 segundos:

```tsx
// En sanity/lib/queries.ts
export async function getPosts() {
  return client.fetch(
    postsQuery,
    {},
    {
      next: {
        revalidate: 60, // 60 segundos
      },
    }
  );
}
```

**Cambiar el tiempo:**

- `revalidate: 30` - Cada 30 segundos (más frecuente)
- `revalidate: 3600` - Cada hora (menos frecuente)
- `revalidate: false` - Sin revalidación (contenido estático)

---

## 📝 10. Schemas Disponibles

### Post (Artículo)

- `title` - Título del artículo
- `slug` - URL amigable
- `mainImage` - Imagen principal con hotspot
- `publishedAt` - Fecha de publicación
- `excerpt` - Resumen corto
- `body` - Contenido rico (Portable Text)
- `author` - Referencia a autor
- `categories` - Referencias a categorías
- `readTime` - Tiempo estimado de lectura

### Category (Categoría)

- `title` - Nombre de la categoría
- `slug` - URL amigable
- `description` - Descripción

### Author (Autor)

- `name` - Nombre del autor
- `slug` - URL amigable
- `image` - Foto de perfil
- `bio` - Biografía

---

## 🎯 11. Queries GROQ Disponibles

```tsx
import { getPosts, getPostBySlug, getPostSlugs } from "@/sanity/lib/queries";

// Obtener todos los posts
const posts = await getPosts();

// Obtener un post específico
const post = await getPostBySlug("mi-slug");

// Obtener solo los slugs (para generateStaticParams)
const slugs = await getPostSlugs();
```

---

## 🚨 12. Troubleshooting

### Error: "Unknown font `Geist`"

✅ Ya resuelto - usamos Inter en su lugar

### Error: Variables de entorno no definidas

- Verifica que `.env.local` existe
- Reinicia el servidor después de crear el archivo
- Las variables deben empezar con `NEXT_PUBLIC_` para usarse en cliente

### Studio no carga en /studio

- Verifica que el Project ID sea correcto
- Revisa la consola del navegador para errores
- Intenta limpiar caché: `rm -rf .next` y reinicia

### Imágenes no se muestran

- Verifica que la imagen tenga el campo `alt` en Sanity
- Asegúrate de usar `urlForImage()` helper
- Revisa que Next.js tenga configurado `cdn.sanity.io` en `next.config.mjs`

---

## 🎉 13. ¡Listo!

Tu integración con Sanity está completa. Ahora puedes:

✅ Acceder al Studio en `/studio`
✅ Crear/editar artículos de blog
✅ Gestionar categorías y autores
✅ Ver los cambios reflejados en el frontend
✅ Imágenes optimizadas automáticamente
✅ ISR para performance óptima

---

## 📚 Recursos Adicionales

- [Documentación de Sanity](https://www.sanity.io/docs)
- [GROQ Query Reference](https://www.sanity.io/docs/groq)
- [Portable Text Guide](https://www.sanity.io/docs/presenting-block-text)
- [Next.js + Sanity](https://www.sanity.io/docs/next-js)

---

**¿Necesitas ayuda?** Consulta la documentación oficial o contacta al equipo de desarrollo.

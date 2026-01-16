import { defineField, defineType } from 'sanity';

/**
 * Schema para el tipo de documento "post" (Artículo de Blog)
 * Define la estructura de los posts en Sanity Studio
 */
export default defineType({
  name: 'post',
  title: 'Artículo de Blog',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(100),
      description: 'El título del artículo que se mostrará en la landing y en la página del post',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Genera la URL del artículo. Click en "Generate" para crear automáticamente desde el título',
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true, // Permite seleccionar punto focal para recortes responsivos
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          description: 'Importante para SEO y accesibilidad',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumen',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(50).max(200),
      description: 'Resumen corto que se mostrará en la landing page (máximo 200 caracteres)',
    }),
    defineField({
      name: 'body',
      title: 'Contenido del Artículo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de foto',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      description: 'Opcional: Asigna categorías al artículo',
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'Opcional: Asigna un autor al artículo',
    }),
    defineField({
      name: 'readTime',
      title: 'Tiempo de Lectura (minutos)',
      type: 'number',
      description: 'Estimación manual del tiempo de lectura',
      validation: (Rule) => Rule.min(1).max(60),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { title, author, media, publishedAt } = selection;
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : 'Sin fecha';
      return {
        title,
        subtitle: author ? `${author} · ${date}` : date,
        media,
      };
    },
  },
});

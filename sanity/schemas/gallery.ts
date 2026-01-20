import { defineType, defineField } from 'sanity';
import { Images } from 'lucide-react';

export default defineType({
  name: 'gallery',
  title: 'Galería de Eventos',
  type: 'document',
  icon: Images,
  fields: [
    defineField({
      name: 'eventId',
      title: 'ID del Evento',
      type: 'slug',
      description: 'ID único para acceder a la galería (ej: boda-juan-maria-2026)',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'eventName',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'eventName',
      title: 'Nombre del Evento',
      type: 'string',
      description: 'Nombre descriptivo del evento',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Tipo de Evento',
      type: 'string',
      options: {
        list: [
          { title: 'Boda', value: 'boda' },
          { title: 'Cumpleaños', value: 'cumpleanos' },
          { title: 'Corporativo', value: 'corporativo' },
          { title: 'Otro', value: 'otro' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de Portada',
      type: 'image',
      description: 'Imagen principal que se muestra al abrir la galería',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Fotos del Evento',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              title: 'Descripción',
              type: 'string',
              description: 'Descripción opcional de la foto',
            },
            {
              name: 'order',
              title: 'Orden',
              type: 'number',
              description: 'Orden de aparición en el carrusel',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(500),
    }),
    defineField({
      name: 'expirationDate',
      title: 'Fecha de Expiración',
      type: 'datetime',
      description: 'Fecha en la que la galería dejará de estar disponible',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Galería Activa',
      type: 'boolean',
      description: 'Desactiva manualmente la galería sin esperar la fecha de expiración',
      initialValue: true,
    }),
    defineField({
      name: 'allowDownload',
      title: 'Permitir Descargas',
      type: 'boolean',
      description: 'Permite que los invitados descarguen las fotos',
      initialValue: true,
    }),
    defineField({
      name: 'viewCount',
      title: 'Contador de Visitas',
      type: 'number',
      description: 'Número de veces que se ha accedido a la galería',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Fecha de Creación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'eventName',
      subtitle: 'eventType',
      media: 'coverImage',
      isActive: 'isActive',
      expirationDate: 'expirationDate',
    },
    prepare({ title, subtitle, media, isActive, expirationDate }) {
      const expired = new Date(expirationDate) < new Date();
      const status = !isActive ? '🔴 Inactiva' : expired ? '⏰ Expirada' : '✅ Activa';
      return {
        title: `${title} (${status})`,
        subtitle: subtitle || 'Tipo no especificado',
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Fecha de Creación (Más Reciente)',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Fecha de Expiración (Próxima)',
      name: 'expirationDateAsc',
      by: [{ field: 'expirationDate', direction: 'asc' }],
    },
    {
      title: 'Nombre del Evento',
      name: 'eventNameAsc',
      by: [{ field: 'eventName', direction: 'asc' }],
    },
  ],
});

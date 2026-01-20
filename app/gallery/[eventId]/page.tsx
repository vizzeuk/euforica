import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getGalleryByEventId } from '@/sanity/lib/queries';
import { GalleryCarousel } from '@/components/gallery/gallery-carousel';
import { GalleryGrid } from '@/components/gallery/gallery-grid';
import { Calendar, Camera, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    eventId: string;
  }>;
}

// Generar metadata dinámico para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eventId } = await params;
  const gallery = await getGalleryByEventId(eventId);

  if (!gallery) {
    return {
      title: 'Galería no disponible | Euforica',
      description: 'Esta galería no está disponible o ha expirado.',
    };
  }

  return {
    title: `${gallery.eventName} - Galería de Fotos | Euforica`,
    description: `Revive los mejores momentos de ${gallery.eventName}. Descarga tus fotos favoritas del evento.`,
    openGraph: {
      title: `${gallery.eventName} - Galería | Euforica`,
      description: `${gallery.photos?.length || 0} fotos del evento`,
      images: gallery.coverImage?.asset?.url ? [gallery.coverImage.asset.url] : [],
    },
  };
}

export default async function GalleryPage({ params }: PageProps) {
  const { eventId } = await params;
  const gallery = await getGalleryByEventId(eventId);

  // Si la galería no existe, está inactiva o expiró, redirigir a página de expirado
  if (!gallery) {
    redirect('/gallery/expired');
  }

  const eventDate = gallery.createdAt 
    ? new Date(gallery.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const expirationDate = new Date(gallery.expirationDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link 
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="font-serif text-4xl font-light tracking-tight md:text-5xl">
                {gallery.eventName}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                {eventDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {eventDate}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  {gallery.photos?.length || 0} fotos
                </div>
              </div>
            </div>

            {/* Badge del tipo de evento */}
            <div className="inline-flex items-center rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium capitalize">
              {gallery.eventType === 'boda' && 'Boda'}
              {gallery.eventType === 'cumpleanos' && 'Cumpleaños'}
              {gallery.eventType === 'corporativo' && 'Corporativo'}
              {gallery.eventType === 'otro' && 'Evento'}
            </div>
          </div>
        </div>
      </header>

      {/* Carrusel */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-light tracking-tight">
              Momentos destacados
            </h2>
            <p className="text-sm text-neutral-600">
              Navegá por las mejores fotos del evento
            </p>
          </div>
          <GalleryCarousel 
            photos={gallery.photos || []}
            eventName={gallery.eventName}
            allowDownload={gallery.allowDownload}
          />
        </div>
      </section>

      {/* Información adicional */}
      <section className="bg-neutral-50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-neutral-600">
                  Disponible hasta
                </h3>
                <p className="text-lg font-medium">
                  {expirationDate}
                </p>
              </div>

              {gallery.allowDownload && (
                <div className="text-sm text-neutral-600">
                  <p className="mb-2">
                    <span className="font-medium">Tip:</span> Haz clic en cualquier foto para verla en pantalla completa
                  </p>
                  <p>
                    Descarga tus fotos favoritas antes de la fecha de expiración
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Galería completa - Todas las fotos */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <GalleryGrid 
            photos={gallery.photos || []}
            eventName={gallery.eventName}
            allowDownload={gallery.allowDownload}
          />
        </div>
      </section>

      {/* CTA para crear su propio evento */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 text-center text-white md:p-12">
          <h2 className="mb-4 font-serif text-3xl font-light md:text-4xl">
            ¿Te gustaría una galería para tu evento?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-neutral-300">
            Capturamos y compartimos los mejores momentos de tu celebración con elegancia y estilo.
          </p>
          <Link
            href="/#contacto"
            className="inline-block rounded-md bg-white px-8 py-3 font-medium text-neutral-900 transition-transform hover:scale-105"
          >
            Solicita tu cotización
          </Link>
        </div>
        </div>
      </section>

      {/* Footer simplificado */}
      <footer className="border-t border-neutral-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Link href="/" className="inline-block">
            <h3 className="font-serif text-2xl font-light tracking-tight">
              EUFÓRICA
            </h3>
          </Link>
          <p className="mt-2 text-sm text-neutral-600">
            © {new Date().getFullYear()} EUFÓRICA. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

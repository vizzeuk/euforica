import Link from 'next/link';
import { Metadata } from 'next';
import { Clock, Home, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Galería no disponible | Euforica',
  description: 'Esta galería de fotos no está disponible o ha expirado.',
};

export default function ExpiredGalleryPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-6">
      <div className="w-full max-w-lg text-center">
        {/* Icono */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-neutral-200 p-6">
            <Clock className="h-12 w-12 text-neutral-600" />
          </div>
        </div>

        {/* Título */}
        <h1 className="mb-4 font-serif text-4xl font-light tracking-tight md:text-5xl">
          Galería no disponible
        </h1>

        {/* Descripción */}
        <p className="mb-8 text-lg leading-relaxed text-neutral-600">
          Lo sentimos, esta galería de fotos no está disponible. Puede que haya expirado, 
          esté inactiva o el enlace sea incorrecto.
        </p>

        {/* Mensaje informativo */}
        <div className="mb-8 rounded-lg border border-neutral-200 bg-white p-6 text-left">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-neutral-900">
            ¿Por qué no puedo ver las fotos?
          </h2>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex gap-2">
              <span className="text-neutral-400">•</span>
              <span>La galería puede haber alcanzado su fecha de expiración</span>
            </li>
            <li className="flex gap-2">
              <span className="text-neutral-400">•</span>
              <span>El enlace puede estar incompleto o incorrecto</span>
            </li>
            <li className="flex gap-2">
              <span className="text-neutral-400">•</span>
              <span>La galería puede haber sido desactivada por el organizador</span>
            </li>
          </ul>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-900 px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <Home className="h-4 w-4" />
            Ir al inicio
          </Link>
          
          <a
            href="mailto:contacto@euforica.com?subject=Consulta sobre galería de fotos"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-6 py-3 font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
          >
            <Mail className="h-4 w-4" />
            Contactar soporte
          </a>
        </div>

        {/* Información adicional */}
        <p className="mt-8 text-sm text-neutral-500">
          Si crees que esto es un error, por favor contacta al organizador del evento 
          o escríbenos a{' '}
          <a 
            href="mailto:contacto@euforica.com" 
            className="font-medium text-neutral-900 hover:underline"
          >
            contacto@euforica.com
          </a>
        </p>
      </div>

      {/* Decoración de fondo */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-neutral-200/50 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-neutral-200/50 blur-3xl" />
      </div>
    </div>
  );
}

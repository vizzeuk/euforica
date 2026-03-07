import { getGalleryByEventId } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import Link from 'next/link';
import { ArrowLeft, Check, X, Clock, Calendar, Database } from 'lucide-react';

interface PageProps {
  params: Promise<{
    eventId: string;
  }>;
}

export default async function GalleryDebugPage({ params }: PageProps) {
  const { eventId } = await params;
  
  // Obtener datos raw de Sanity sin validaciones
  const rawGalleryQuery = groq`*[_type == "gallery" && eventId.current == $eventId][0] {
    _id,
    _createdAt,
    _updatedAt,
    eventId,
    eventName,
    eventType,
    isActive,
    expirationDate,
    "photosCount": count(photos),
    viewCount,
    allowDownload,
    createdAt
  }`;
  
  const rawGallery = await client.fetch(rawGalleryQuery, { eventId });
  const processedGallery = await getGalleryByEventId(eventId);
  
  // Información de tiempo
  const now = new Date();
  const serverTime = now.toISOString();
  const chileTime = now.toLocaleString('es-CL', { timeZone: 'America/Santiago', dateStyle: 'full', timeStyle: 'long' });
  
  let expirationInfo = null;
  if (rawGallery?.expirationDate) {
    const expDate = new Date(rawGallery.expirationDate);
    const diffMs = expDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    expirationInfo = {
      raw: rawGallery.expirationDate,
      iso: expDate.toISOString(),
      chile: expDate.toLocaleString('es-CL', { timeZone: 'America/Santiago', dateStyle: 'full', timeStyle: 'long' }),
      timestamp: expDate.getTime(),
      isExpired: diffMs < 0,
      diffMs,
      diffDays,
      diffHours,
      diffMinutes,
    };
  }

  return (
    <div className="min-h-screen bg-neutral-900 py-12 text-white">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <Link 
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 font-mono text-3xl font-bold text-yellow-400">
            🔍 DEBUG: Galería {eventId}
          </h1>
          <p className="text-neutral-400">
            Información detallada para diagnosticar problemas
          </p>
        </div>

        {/* Estado General */}
        <div className="mb-6 rounded-lg border border-neutral-700 bg-neutral-800 p-6">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Database className="h-5 w-5 text-blue-400" />
            Estado General
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <span className="text-neutral-400">ID del Evento:</span>
              <span className="font-mono text-white">{eventId}</span>
            </div>
            
            <div className="flex items-start justify-between">
              <span className="text-neutral-400">Existe en Sanity:</span>
              <span className="flex items-center gap-2">
                {rawGallery ? (
                  <>
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">Sí</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-400" />
                    <span className="text-red-400">No encontrada</span>
                  </>
                )}
              </span>
            </div>

            {rawGallery && (
              <>
                <div className="flex items-start justify-between">
                  <span className="text-neutral-400">Nombre del Evento:</span>
                  <span className="text-white">{rawGallery.eventName}</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-neutral-400">Galería Activa:</span>
                  <span className="flex items-center gap-2">
                    {rawGallery.isActive ? (
                      <>
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="text-green-400">Activa</span>
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4 text-red-400" />
                        <span className="text-red-400">Inactiva</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-neutral-400">Cantidad de Fotos:</span>
                  <span className="text-white">{rawGallery.photosCount || 0}</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-neutral-400">Pasa Validación:</span>
                  <span className="flex items-center gap-2">
                    {processedGallery ? (
                      <>
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="text-green-400">Sí - Se muestra OK</span>
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4 text-red-400" />
                        <span className="text-red-400">No - Se redirige a expired</span>
                      </>
                    )}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Información de Tiempo */}
        <div className="mb-6 rounded-lg border border-neutral-700 bg-neutral-800 p-6">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Clock className="h-5 w-5 text-purple-400" />
            Información de Tiempo
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="mb-1 text-sm text-neutral-400">Hora del Servidor (UTC)</div>
              <div className="font-mono text-white">{serverTime}</div>
            </div>

            <div>
              <div className="mb-1 text-sm text-neutral-400">Hora en Chile</div>
              <div className="font-mono text-white">{chileTime}</div>
            </div>

            <div>
              <div className="mb-1 text-sm text-neutral-400">Timestamp del Servidor</div>
              <div className="font-mono text-white">{now.getTime()}</div>
            </div>
          </div>
        </div>

        {/* Información de Expiración */}
        {expirationInfo && (
          <div className={`mb-6 rounded-lg border p-6 ${
            expirationInfo.isExpired 
              ? 'border-red-700 bg-red-900/20' 
              : 'border-green-700 bg-green-900/20'
          }`}>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Calendar className="h-5 w-5" />
              Análisis de Expiración
            </h2>
            
            <div className="space-y-4">
              <div className={`rounded-lg p-4 ${
                expirationInfo.isExpired 
                  ? 'bg-red-800/30 text-red-200' 
                  : 'bg-green-800/30 text-green-200'
              }`}>
                <div className="text-lg font-bold">
                  {expirationInfo.isExpired ? '❌ EXPIRADA' : '✅ VÁLIDA'}
                </div>
                <div className="mt-1 text-sm">
                  {expirationInfo.isExpired 
                    ? `Expiró hace ${Math.abs(expirationInfo.diffDays)} días, ${Math.abs(expirationInfo.diffHours)} horas`
                    : `Expira en ${expirationInfo.diffDays} días, ${expirationInfo.diffHours} horas, ${expirationInfo.diffMinutes} minutos`
                  }
                </div>
              </div>

              <div>
                <div className="mb-1 text-sm text-neutral-400">Fecha Raw en Sanity</div>
                <div className="font-mono text-white">{expirationInfo.raw}</div>
              </div>

              <div>
                <div className="mb-1 text-sm text-neutral-400">Fecha en ISO 8601 (UTC)</div>
                <div className="font-mono text-white">{expirationInfo.iso}</div>
              </div>

              <div>
                <div className="mb-1 text-sm text-neutral-400">Fecha en Chile</div>
                <div className="font-mono text-white">{expirationInfo.chile}</div>
              </div>

              <div>
                <div className="mb-1 text-sm text-neutral-400">Timestamp de Expiración</div>
                <div className="font-mono text-white">{expirationInfo.timestamp}</div>
              </div>

              <div>
                <div className="mb-1 text-sm text-neutral-400">Diferencia en Milisegundos</div>
                <div className="font-mono text-white">{expirationInfo.diffMs.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}

        {/* Datos Raw de Sanity */}
        {rawGallery && (
          <div className="mb-6 rounded-lg border border-neutral-700 bg-neutral-800 p-6">
            <h2 className="mb-4 text-xl font-semibold">Datos Raw de Sanity</h2>
            <pre className="overflow-x-auto rounded bg-black p-4 text-xs text-green-400">
              {JSON.stringify(rawGallery, null, 2)}
            </pre>
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-4">
          <Link
            href={`/gallery/${eventId}`}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium transition-colors hover:bg-blue-700"
          >
            Ver Galería Normal
          </Link>
          
          <a
            href="/studio"
            target="_blank"
            className="rounded-lg bg-purple-600 px-6 py-3 font-medium transition-colors hover:bg-purple-700"
          >
            Abrir en Sanity Studio
          </a>
        </div>

        {/* Nota */}
        <div className="mt-8 rounded-lg border border-yellow-700 bg-yellow-900/20 p-4 text-sm text-yellow-200">
          <strong>💡 Tip:</strong> Esta página muestra información en tiempo real. Si la galería aparece como EXPIRADA pero configuraste la fecha correctamente, puede ser un problema de:
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li>Zona horaria incorrecta en Sanity (debería estar en UTC)</li>
            <li>Cache del navegador (prueba en modo incógnito)</li>
            <li>Cache de Next.js (revalidación cada 60 segundos)</li>
            <li>Fecha configurada en hora local pero comparada en UTC</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

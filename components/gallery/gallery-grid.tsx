"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Grid3x3, PackageOpen } from 'lucide-react';

interface Photo {
  asset: {
    _id: string;
    url: string;
  };
  caption?: string;
  order?: number;
}

interface GalleryGridProps {
  photos: Photo[];
  eventName: string;
  allowDownload?: boolean;
}

export function GalleryGrid({ 
  photos, 
  eventName, 
  allowDownload = true 
}: GalleryGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  // Descargar imagen individual
  const handleDownloadSingle = async (photoUrl: string, index: number) => {
    if (!allowDownload) return;
    
    try {
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${eventName.replace(/\s+/g, '-').toLowerCase()}-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error descargando imagen:', error);
    }
  };

  // Descargar todas las fotos
  const handleDownloadAll = async () => {
    if (!allowDownload || isDownloadingAll) return;
    
    setIsDownloadingAll(true);
    
    try {
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        await handleDownloadSingle(photo.asset.url, i);
        // Pequeña pausa entre descargas para no saturar el navegador
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Error descargando todas las fotos:', error);
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const openLightbox = (index: number) => setSelectedPhoto(index);
  const closeLightbox = () => setSelectedPhoto(null);

  const goToPrevious = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length);
    }
  };

  const goToNext = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhoto === null) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <>
      {/* Header de la sección */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Grid3x3 className="h-5 w-5 text-neutral-600" />
            <h2 className="text-2xl font-light tracking-tight">
              Todas las fotos
            </h2>
          </div>
          <p className="text-sm text-neutral-600">
            {photos.length} {photos.length === 1 ? 'foto disponible' : 'fotos disponibles'}
          </p>
        </div>

        {allowDownload && (
          <button
            onClick={handleDownloadAll}
            disabled={isDownloadingAll}
            className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloadingAll ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Descargando...
              </>
            ) : (
              <>
                <PackageOpen className="h-4 w-4" />
                Descargar todas
              </>
            )}
          </button>
        )}
      </div>

      {/* Grid de fotos */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.asset._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-neutral-100"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={photo.asset.url}
              alt={photo.caption || `Foto ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            
            {/* Overlay al hacer hover */}
            <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40">
              <div className="flex h-full items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {allowDownload && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadSingle(photo.asset.url, index);
                    }}
                    className="rounded-full bg-white/90 p-3 backdrop-blur-sm transition-transform hover:scale-110"
                    aria-label="Descargar foto"
                  >
                    <Download className="h-4 w-4 text-neutral-900" />
                  </button>
                )}
              </div>
            </div>

            {/* Número de foto */}
            <div className="absolute left-2 top-2 rounded bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
            onClick={closeLightbox}
          >
            {/* Header */}
            <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4">
              <p className="text-sm text-white/80">
                {selectedPhoto + 1} / {photos.length}
              </p>
              
              <div className="flex items-center gap-4">
                {allowDownload && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadSingle(photos[selectedPhoto].asset.url, selectedPhoto);
                    }}
                    className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                  >
                    <Download className="h-4 w-4" />
                    Descargar
                  </button>
                )}
                
                <button
                  onClick={closeLightbox}
                  className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Imagen */}
            <div
              className="flex h-full w-full items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full w-full max-w-7xl">
                <Image
                  src={photos[selectedPhoto].asset.url}
                  alt={photos[selectedPhoto].caption || `Foto ${selectedPhoto + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            {/* Caption */}
            {photos[selectedPhoto].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-center text-white">
                  {photos[selectedPhoto].caption}
                </p>
              </div>
            )}

            {/* Navegación */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-colors hover:bg-white/30"
              aria-label="Foto anterior"
            >
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-colors hover:bg-white/30"
              aria-label="Siguiente foto"
            >
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

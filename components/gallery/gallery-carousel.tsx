"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  X, 
  ZoomIn,
  Maximize2
} from 'lucide-react';

interface Photo {
  asset: {
    _id: string;
    url: string;
  };
  caption?: string;
  order?: number;
}

interface GalleryCarouselProps {
  photos: Photo[];
  eventName: string;
  allowDownload?: boolean;
}

export function GalleryCarousel({ 
  photos, 
  eventName, 
  allowDownload = true 
}: GalleryCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Descargar imagen
  const handleDownload = async (photoUrl: string, index: number) => {
    if (!allowDownload) return;
    
    setIsDownloading(true);
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
    } finally {
      setIsDownloading(false);
    }
  };

  // Fullscreen handlers
  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = () => setIsFullscreen(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen();
    };
    
    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const currentPhoto = photos[selectedIndex];

  return (
    <>
      {/* Carrusel Principal */}
      <div className="relative w-full">
        {/* Carrusel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {photos.map((photo, index) => (
              <div
                key={photo.asset._id}
                className="relative min-w-0 flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_70%] px-2 md:px-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
                  <Image
                    src={photo.asset.url}
                    alt={photo.caption || `Foto ${index + 1} de ${eventName}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    priority={index === 0}
                  />
                  
                  {/* Overlay con controles */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity hover:opacity-100">
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      {/* Caption */}
                      {photo.caption && (
                        <p className="text-sm text-white/90 drop-shadow-lg">
                          {photo.caption}
                        </p>
                      )}
                      
                      {/* Botones de acción */}
                      <div className="flex gap-2">
                        <button
                          onClick={openFullscreen}
                          className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
                          aria-label="Ver en pantalla completa"
                        >
                          <Maximize2 className="h-4 w-4 text-white" />
                        </button>
                        
                        {allowDownload && (
                          <button
                            onClick={() => handleDownload(photo.asset.url, index)}
                            disabled={isDownloading}
                            className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30 disabled:opacity-50"
                            aria-label="Descargar foto"
                          >
                            <Download className="h-4 w-4 text-white" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de navegación */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="h-5 w-5 text-neutral-900" />
        </button>
        
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
          aria-label="Siguiente foto"
        >
          <ChevronRight className="h-5 w-5 text-neutral-900" />
        </button>

        {/* Indicadores */}
        <div className="mt-6 flex justify-center gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'w-8 bg-neutral-900'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Ir a foto ${index + 1}`}
            />
          ))}
        </div>

        {/* Contador */}
        <p className="mt-4 text-center text-sm text-neutral-600">
          {selectedIndex + 1} / {photos.length}
        </p>
      </div>

      {/* Vista Fullscreen */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
            onClick={closeFullscreen}
          >
            {/* Barra superior */}
            <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4">
              <p className="font-serif text-lg text-white">
                {eventName}
              </p>
              
              <div className="flex items-center gap-4">
                {allowDownload && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(currentPhoto.asset.url, selectedIndex);
                    }}
                    disabled={isDownloading}
                    className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/30 disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" />
                    Descargar
                  </button>
                )}
                
                <button
                  onClick={closeFullscreen}
                  className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Imagen fullscreen */}
            <div
              className="flex h-full w-full items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full w-full max-w-7xl">
                <Image
                  src={currentPhoto.asset.url}
                  alt={currentPhoto.caption || `Foto ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Caption en fullscreen */}
            {currentPhoto.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-center text-white">
                  {currentPhoto.caption}
                </p>
              </div>
            )}

            {/* Navegación en fullscreen */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-colors hover:bg-white/30"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-colors hover:bg-white/30"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Contador en fullscreen */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <p className="text-sm text-white/80">
                {selectedIndex + 1} / {photos.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

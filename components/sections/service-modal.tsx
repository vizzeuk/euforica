"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceModalProps {
  service: any;
  currentImageIndex: number;
  onClose: () => void;
  onNextImage: () => void;
  onPrevImage: () => void;
}

export function ServiceModal({
  service,
  currentImageIndex,
  onClose,
  onNextImage,
  onPrevImage,
}: ServiceModalProps) {
  const Icon = service.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-neutral-100"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <Icon className="h-8 w-8 text-neutral-800" />
          </div>

          <h3 className="mb-4 font-serif text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
            {service.title}
          </h3>

          <p className="mb-6 text-base leading-relaxed text-neutral-600">
            {service.details}
          </p>

          {/* Gallery */}
          <div className="relative mb-8 aspect-[16/10] overflow-hidden bg-neutral-100">
            <Image
              src={service.gallery[currentImageIndex]}
              alt={service.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, calc(100vw - 2rem)"
            />

            {/* Navigation Arrows - only show if multiple images */}
            {service.gallery.length > 1 && (
              <>
                <button
                  onClick={onPrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={onNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                  {currentImageIndex + 1} / {service.gallery.length}
                </div>
              </>
            )}
          </div>

          {/* Features */}
          <div className="mb-8">
            <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-neutral-900">
              Incluye
            </h4>
            <ul className="grid gap-3 md:grid-cols-2">
              {service.features.map((feature: string) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-neutral-700">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <Link
            href="/#contacto"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center bg-black px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-neutral-800 md:w-auto"
          >
            Solicitar Cotización
          </Link>
        </div>
      </div>
    </div>
  );
}

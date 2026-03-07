"use client";

import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

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

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal centrado */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div className="relative flex w-full max-w-5xl flex-col bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 md:flex-row md:max-h-[88vh]">

        {/*  COLUMNA IZQUIERDA: imagen  */}
        <div className="relative flex-1 bg-neutral-950 md:max-w-[45%]">
          <Image
            src={service.gallery[currentImageIndex]}
            alt={service.imageAlt}
            fill
            className="object-cover opacity-90"
            sizes="(min-width: 768px) 45vw, 100vw"
          />

          {/* Número watermark */}
          <div className="absolute bottom-6 left-6 select-none font-serif text-[100px] font-bold leading-none text-white/10">
            {service.number}
          </div>

          {/* Navegación entre fotos */}
          {service.gallery.length > 1 && (
            <div className="absolute bottom-6 right-6 flex items-center gap-2">
              <button
                onClick={onPrevImage}
                className="flex h-9 w-9 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="min-w-[3ch] text-center text-xs font-light tabular-nums text-white/60">
                {currentImageIndex + 1}/{service.gallery.length}
              </span>
              <button
                onClick={onNextImage}
                className="flex h-9 w-9 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/*  COLUMNA DERECHA: contenido  */}
        <div className="flex flex-col overflow-y-auto md:flex-1">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 px-8 py-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-neutral-400">{service.number}</span>
              <span className="h-px w-6 bg-neutral-200" />
              <span className="text-xs uppercase tracking-widest text-neutral-400">{service.tagline}</span>
            </div>
            <button
              onClick={onClose}
              className="group flex h-9 w-9 items-center justify-center border border-neutral-200 transition-colors hover:border-neutral-900 hover:bg-neutral-900"
            >
              <X className="h-4 w-4 text-neutral-500 transition-colors group-hover:text-white" />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col px-8 py-10">
            <h3 className="mb-5 font-serif text-3xl font-light leading-tight tracking-tight text-neutral-900 md:text-4xl">
              {service.title}
            </h3>

            <p className="mb-8 text-sm leading-loose text-neutral-500">
              {service.details}
            </p>

            {/* Separador */}
            <div className="mb-8 flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">Incluye</span>
              <span className="h-px flex-1 bg-neutral-100" />
            </div>

            {/* Features */}
            <ul className="mb-10 space-y-4">
              {service.features.map((feature: string, i: number) => (
                <li key={feature} className="flex items-start gap-4 text-sm text-neutral-700">
                  <span className="mt-0.5 font-mono text-xs text-neutral-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer CTA */}
          <div className="border-t border-neutral-100 px-8 py-6">
            <Link
              href="/#contacto"
              onClick={onClose}
              className="group/cta flex w-full items-center justify-between bg-neutral-950 px-7 py-4 text-white transition-colors hover:bg-neutral-800"
            >
              <span className="text-xs font-medium uppercase tracking-[0.2em]">Solicitar cotización</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
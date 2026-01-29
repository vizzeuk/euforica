"use client";

import { Sparkles, Camera, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

const featuredServices = [
  {
    icon: Zap,
    title: "Máquina de Chispas Frías",
    tagline: "Efectos espectaculares sin humo ni riesgos",
    hook: "Transforma momentos ordinarios en explosiones de luz y magia",
    number: "01"
  },
  {
    icon: Sparkles,
    title: "Glitter Bar Premium",
    description: "Glamour biodegradable para todos",
    hook: "Cada invitado se convierte en una obra de arte brillante",
    number: "02"
  },
  {
    icon: Camera,
    title: "Photo Estudio Editorial",
    description: "Sesiones de fotos de nivel profesional",
    hook: "Captura la esencia del evento con estilo editorial único",
    number: "03"
  }
];

export function ServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-neutral-400">
            Nuestros Servicios
          </p>
          <h2 className="mb-6 font-serif text-4xl font-light tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            Experiencias que
            <span className="block font-medium italic">Transforman</span>
          </h2>
        </div>

        {/* Services Grid - Compact Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <Link
                key={service.title}
                href="/servicios"
                className="group relative overflow-hidden border border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-neutral-900 hover:shadow-xl"
              >
                {/* Number watermark */}
                <div className="absolute -right-6 -top-6 font-serif text-8xl font-light leading-none text-neutral-100 transition-colors group-hover:text-neutral-200">
                  {service.number}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 inline-flex rounded-full bg-neutral-100 p-3 transition-all group-hover:bg-neutral-900">
                    <Icon className="h-6 w-6 text-neutral-800 transition-colors group-hover:text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 font-serif text-xl font-light tracking-tight text-neutral-900 lg:text-2xl">
                    {service.title}
                  </h3>

                  {/* Hook */}
                  <p className="mb-6 text-sm leading-relaxed text-neutral-600">
                    {service.hook}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-400 transition-all group-hover:gap-3 group-hover:text-neutral-900">
                    Explorar
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href="/servicios"
            className="group inline-flex items-center gap-3 border-b-2 border-neutral-900 pb-2 font-serif text-lg font-light tracking-tight text-neutral-900 transition-all hover:border-neutral-600 hover:text-neutral-600"
          >
            Ver todos los servicios
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Memoize ServicesPreview component to prevent unnecessary re-renders
export const MemoizedServicesPreview = memo(ServicesPreview);
MemoizedServicesPreview.displayName = "ServicesPreview";

"use client";

import { Sparkles, Camera, Phone, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";

const services = [
  {
    icon: Zap,
    title: "Máquina de Chispas Frías",
    description: "Efectos visuales espectaculares y seguros que añaden magia a los momentos más importantes de tu celebración. Perfecta para entradas triunfales y el primer baile.",
    features: [
      "Sin humo ni olor molesto",
      "Completamente seguras para interiores",
      "Efectos personalizables según tu evento",
      "Operador profesional incluido"
    ],
    image: "/images/services/chispas-frias.jpg",
    imageAlt: "Máquina de chispas frías en evento"
  },
  {
    icon: Sparkles,
    title: "Glitter Bar Premium",
    description: "Estación de glamour donde tus invitados pueden brillar con glitter biodegradable y productos de alta calidad. Una experiencia única que dejará a todos deslumbrados.",
    features: [
      "Glitter 100% biodegradable",
      "Amplia variedad de colores y estilos",
      "Asistente profesional dedicado",
      "Setup personalizado según tu evento"
    ],
    image: "/images/services/glitter-bar.jpg",
    imageAlt: "Glitter Bar con maquillaje profesional"
  },
  {
    icon: Camera,
    title: "Photo Estudio Editorial",
    description: "Lleva la fotografía de eventos al próximo nivel. Una sesión de fotos estilo editorial en blanco y negro que quedará impresa en tu galería digital exclusiva.",
    features: [
      "Fotos 'Blanco & Negro' de alta calidad",
      "Galería digital privada con tu código único",
      "Iluminación de estudio profesional",
      "Descarga digital privada sin marca de agua"
    ],
    image: "/images/services/photo-studio.jpg",
    imageAlt: "Sesión de fotos profesional"
  },
  {
    icon: Phone,
    title: "Audio Guest Books",
    description: "Captura la emoción y los mejores deseos en un formato más personal y emotivo. El clásico teléfono donde tus invitados dejan mensajes inolvidables.",
    features: [
      "Teléfono vintage auténtico y funcional",
      "Grabación de audio de alta fidelidad",
      "Mensajes ilimitados de tus invitados",
      "Entrega digital después del evento"
    ],
    image: "/images/services/audio-guestbook.jpg",
    imageAlt: "Teléfono vintage para mensajes de audio"
  }
];

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black px-6 pb-20 pt-40 md:pb-24 md:pt-48">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black opacity-90" />
          
          <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-neutral-400">
              Nuestros Servicios
            </p>
            <h1 className="mb-6 font-serif text-4xl font-light tracking-tight md:text-6xl lg:text-7xl">
              Experiencias que
              <span className="block font-medium italic">Transforman</span>
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
              Cada servicio está diseñado meticulosamente para añadir ese toque especial que hace de tu evento algo verdaderamente memorable.
            </p>
          </div>
        </section>

        {/* Services Grid - Alternating Layout */}
        <section className="px-6 py-20 md:py-32">
          <div className="mx-auto max-w-7xl space-y-32">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isReversed = index % 2 !== 0;
              
              return (
                <div
                  key={service.title}
                  className={`grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center ${
                    isReversed ? 'md:grid-flow-dense' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative aspect-[4/5] overflow-hidden bg-neutral-100 ${
                    isReversed ? 'md:col-start-2' : ''
                  }`}>
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>

                  {/* Content */}
                  <div className={`space-y-6 ${isReversed ? 'md:col-start-1 md:row-start-1' : ''}`}>
                    {/* Icon */}
                    <div className="inline-flex rounded-lg bg-neutral-100 p-3">
                      <Icon className="h-6 w-6 text-neutral-800" />
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-3xl font-light tracking-tight text-neutral-900 lg:text-4xl">
                      {service.title}
                    </h2>

                    {/* Description */}
                    <p className="text-base leading-relaxed text-neutral-600">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-neutral-700">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                      href="/#contacto"
                      className="inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-sm font-medium uppercase tracking-wider text-neutral-900 transition-colors hover:border-neutral-600 hover:text-neutral-600"
                    >
                      Cotizar Servicio
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-neutral-50 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-serif text-4xl font-light tracking-tight text-neutral-900 md:text-5xl">
              ¿Listo para crear
              <span className="block font-medium italic">magia?</span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-600">
              Permite que nuestro equipo haga realidad tus ideas más ambiciosas y diseñemos juntos un evento que nadie olvidará.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/#contacto"
                className="inline-flex items-center justify-center rounded-none bg-black px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-neutral-800"
              >
                Reserva Inmediata
              </Link>
              <Link
                href="/portafolio"
                className="inline-flex items-center justify-center rounded-none border border-neutral-900 bg-transparent px-8 py-4 text-sm font-medium uppercase tracking-wider text-neutral-900 transition-all hover:bg-neutral-100"
              >
                Ver Portafolio
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

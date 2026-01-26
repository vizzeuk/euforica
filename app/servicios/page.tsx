"use client";

import { Sparkles, Camera, Phone, Zap, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { useState } from "react";

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
    image: "/images/services/chispas-frias.webp",
    imageAlt: "Máquina de chispas frías en evento",
    gallery: [
      "/images/services/chispas-frias.webp",
      "/images/services/chispas-frias-2.webp"
    ],
    details: "Las chispas frías crean un efecto visual impresionante sin los riesgos del fuego tradicional. Ideales para momentos clave como la entrada de novios, primer baile, o corte de torta."
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
    image: "/images/services/glitter-bar.webp",
    imageAlt: "Glitter Bar con maquillaje profesional",
    gallery: [
      "/images/services/glitter-bar.webp",
      "/images/services/glitter-bar-1.webp",
      "/images/services/glitter-bar-2.webp"
    ],
    details: "Nuestra Glitter Bar ofrece una experiencia interactiva donde los invitados pueden personalizar su look con glitter profesional aplicado por nuestros expertos. Todo el material es eco-friendly."
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
    imageAlt: "Sesión de fotos profesional",
    gallery: [
      "/images/services/photo-studio.jpg"
    ],
    details: "Un mini estudio fotográfico profesional en tu evento. Setup completo con iluminación de nivel editorial, fondo personalizado y fotógrafo dedicado. Las fotos se entregan en galería privada accesible con código único."
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
    imageAlt: "Teléfono vintage para mensajes de audio",
    gallery: [
      "/images/services/audio-guestbook.jpg"
    ],
    details: "Un teléfono vintage restaurado que permite a tus invitados dejar mensajes de voz emotivos. Mucho más personal que un libro de firmas tradicional. Los audios se entregan editados y listos para conservar."
  }
];

export default function ServiciosPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedService(index);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedService(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedService !== null) {
      const gallery = services[selectedService].gallery;
      setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    }
  };

  const prevImage = () => {
    if (selectedService !== null) {
      const gallery = services[selectedService].gallery;
      setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black px-6 pb-20 pt-40 md:pb-24 md:pt-48">
          {/* Gradient difuminado (comentado temporalmente - usar para efecto visual sofisticado) */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black opacity-90" /> */}
          
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
                  <div 
                    className={`group relative aspect-[4/5] cursor-pointer overflow-hidden bg-neutral-100 ${
                      isReversed ? 'md:col-start-2' : ''
                    }`}
                    onClick={() => openModal(index)}
                  >
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    
                    {/* Overlay sutil al hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
                      <span className="translate-y-4 text-sm font-medium uppercase tracking-wider text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        Ver detalles
                      </span>
                    </div>
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

        {/* Modal */}
        {selectedService !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  {(() => {
                    const Icon = services[selectedService].icon;
                    return <Icon className="h-8 w-8 text-neutral-800" />;
                  })()}
                </div>

                <h3 className="mb-4 font-serif text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
                  {services[selectedService].title}
                </h3>

                <p className="mb-6 text-base leading-relaxed text-neutral-600">
                  {services[selectedService].details}
                </p>

                {/* Gallery */}
                <div className="relative mb-8 aspect-[16/10] overflow-hidden bg-neutral-100">
                  <Image
                    src={services[selectedService].gallery[currentImageIndex]}
                    alt={services[selectedService].imageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 896px, calc(100vw - 2rem)"
                  />

                  {/* Navigation Arrows - only show if multiple images */}
                  {services[selectedService].gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                        {currentImageIndex + 1} / {services[selectedService].gallery.length}
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
                    {services[selectedService].features.map((feature) => (
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
                  onClick={closeModal}
                  className="inline-flex w-full items-center justify-center bg-black px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-neutral-800 md:w-auto"
                >
                  Solicitar Cotización
                </Link>
              </div>
            </div>
          </div>
        )}

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

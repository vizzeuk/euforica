"use client";

import { Sparkles, Camera, Phone, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { useState, lazy, Suspense } from "react";

// Lazy load del modal (solo se carga cuando se abre)
const ServiceModal = lazy(() => import("@/components/sections/service-modal").then(mod => ({ default: mod.ServiceModal })));

const services = [
  {
    icon: Zap,
    number: "01",
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
    number: "02",
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
    number: "03",
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
    number: "04",
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
        <section className="relative overflow-hidden bg-black px-6 pb-16 pt-40 md:pb-20 md:pt-48">
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

        {/* Services Grid - Card Layout */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                
                return (
                  <div
                    key={service.title}
                    onClick={() => openModal(index)}
                    className="group relative cursor-pointer overflow-hidden border border-neutral-200 bg-white transition-all duration-300 hover:border-neutral-900 hover:shadow-2xl"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      
                      {/* Overlay al hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      
                      {/* "Ver más" badge */}
                      <div className="absolute bottom-3 right-3 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-neutral-900">
                          Ver más
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Number */}
                      <div className="mb-4 flex items-center justify-between">
                        <span className="font-serif text-5xl font-light text-neutral-200 transition-colors group-hover:text-neutral-900">
                          {service.number}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="mb-3 font-serif text-2xl font-light tracking-tight text-neutral-900 lg:text-3xl">
                        {service.title}
                      </h2>

                      {/* Description */}
                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                        {service.description}
                      </p>

                      {/* Quick features (primeros 2) */}
                      <ul className="space-y-2">
                        {service.features.slice(0, 2).map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-xs text-neutral-500">
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-neutral-400" />
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Modal - Lazy loaded */}
        {selectedService !== null && (
          <Suspense fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          }>
            <ServiceModal
              service={services[selectedService]}
              currentImageIndex={currentImageIndex}
              onClose={closeModal}
              onNextImage={nextImage}
              onPrevImage={prevImage}
            />
          </Suspense>
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
              <a
                href="https://instagram.com/euforica_cl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-none border border-neutral-900 bg-transparent px-8 py-4 text-sm font-medium uppercase tracking-wider text-neutral-900 transition-all hover:bg-neutral-100"
              >
                Ver Portafolio
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

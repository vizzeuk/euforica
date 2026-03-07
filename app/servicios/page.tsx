"use client";

import { Sparkles, Camera, Phone, Zap, ArrowRight } from "lucide-react";
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
    tagline: "Efectos de luz sin riesgos",
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
    tagline: "Glamour biodegradable para todos",
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
    tagline: "Fotografía de nivel profesional",
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
    tagline: "Mensajes de voz para el recuerdo",
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

        {/* HERO */}
        <section className="relative flex min-h-[70vh] flex-col justify-end bg-neutral-950 px-6 pb-16 pt-40 md:px-12 lg:px-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/5" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-white/30" />
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
                Nuestros Servicios
              </p>
            </div>

            <h1 className="font-serif text-5xl font-light leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl">
              Cada detalle,
              <br />
              <em className="font-medium not-italic text-neutral-300">diseñado</em>
              <br />
              para recordar.
            </h1>

            <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-base leading-relaxed text-neutral-400">
                Cuatro experiencias únicas que transforman cualquier celebración en un momento que nadie olvidará.
              </p>
              <div className="flex gap-8">
                {services.map((s) => (
                  <button
                    key={s.number}
                    onClick={() => {
                      const el = document.getElementById(`service-${s.number}`);
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs font-light text-neutral-500 transition-colors hover:text-white"
                  >
                    {s.number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <div>
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <article
                key={service.title}
                id={`service-${service.number}`}
                className="group relative border-b border-neutral-100"
              >
                <div className="mx-auto grid max-w-7xl px-0 lg:grid-cols-2">

                  {/* Imagen */}
                  <div className={`relative h-[55vw] max-h-[680px] min-h-[300px] overflow-hidden bg-neutral-100 lg:h-auto lg:min-h-[560px] ${isEven ? "lg:order-last" : ""}`}>
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority={index < 2}
                    />
                    {/* Número watermark */}
                    <div className="absolute bottom-4 left-4 select-none font-serif text-[80px] font-bold leading-none text-white/20 md:text-[120px]">
                      {service.number}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-col justify-center px-8 py-14 md:px-12 lg:px-16 xl:px-20">
                    {/* Número + tagline */}
                    <div className="mb-6 flex items-center gap-4">
                      <span className="font-mono text-xs text-neutral-400">{service.number}</span>
                      <span className="h-px flex-1 bg-neutral-200" />
                      <span className="text-xs uppercase tracking-widest text-neutral-400">{service.tagline}</span>
                    </div>

                    {/* Título */}
                    <h2 className="mb-6 font-serif text-3xl font-light leading-tight tracking-tight text-neutral-900 md:text-4xl xl:text-5xl">
                      {service.title}
                    </h2>

                    {/* Descripción */}
                    <p className="mb-8 text-sm leading-relaxed text-neutral-500 md:text-base">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="mb-10 space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-neutral-600">
                          <span className="h-1 w-4 flex-shrink-0 bg-neutral-300" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA - Ver detalle */}
                    <button
                      onClick={() => openModal(index)}
                      className="group/btn relative self-start overflow-hidden border border-neutral-900 px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-900 transition-all duration-300 hover:text-white"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-neutral-900 transition-transform duration-300 ease-out group-hover/btn:translate-x-0" />
                      <span className="relative flex items-center gap-3">
                        Ver detalle
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* MODAL */}
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

        {/* CTA FINAL */}
        <section className="bg-neutral-950 px-6 py-28 md:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="mb-6 text-xs uppercase tracking-[0.4em] text-neutral-500">
                  ¿Tienes un evento en mente?
                </p>
                <h2 className="font-serif text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
                  Diseñemos juntos
                  <br />
                  <em className="font-medium not-italic">algo único.</em>
                </h2>
              </div>
              <div className="flex flex-col items-start gap-6 lg:items-end">
                <p className="max-w-sm text-base leading-relaxed text-neutral-400 lg:text-right">
                  Cuéntanos tu idea y te mostraremos cómo convertirla en la experiencia que siempre imaginaste.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/#contacto"
                    className="inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-medium uppercase tracking-widest text-neutral-900 transition-all hover:bg-neutral-100"
                  >
                    Cotizar Evento
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://instagram.com/euforica_cl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all hover:border-white/50"
                  >
                    Ver Portafolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
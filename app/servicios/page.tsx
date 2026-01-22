"use client";

import { Sparkles, Camera, Phone, Zap } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";

const services = [
  {
    icon: Zap,
    title: "Máquina de Chispas Frías",
    description: "Efectos visuales espectaculares y seguros que añaden magia a los momentos más importantes de tu celebración.",
    features: [
      "Sin humo ni olor",
      "Completamente seguras",
      "Efectos personalizables",
      "Operador profesional incluido"
    ],
    gradient: "from-neutral-500/10 to-neutral-600/10",
    iconColor: "text-neutral-800"
  },
  {
    icon: Sparkles,
    title: "Glitter Bar",
    description: "Estación de glamour donde tus invitados pueden brillar con glitter biodegradable y productos de alta calidad.",
    features: [
      "Glitter biodegradable",
      "Variedad de colores",
      "Asistente profesional",
      "Setup personalizado"
    ],
    gradient: "from-neutral-500/10 to-neutral-600/10",
    iconColor: "text-neutral-800"
  },
  {
    icon: Camera,
    title: "Photo Estudio Profesional",
    description: "Sesión de fotos en blanco y negro estilo profesional dentro de tu evento. Las imágenes se suben al carrusel para que las descargues después.",
    features: [
      "Fotos blanco y negro profesionales",
      "Galería digital exclusiva",
      "Descarga ilimitada",
      "Setup de iluminación profesional"
    ],
    gradient: "from-neutral-500/10 to-neutral-600/10",
    iconColor: "text-neutral-800"
  },
  {
    icon: Phone,
    title: "Audio Guest Books",
    description: "Teléfono vintage donde tus invitados dejan mensajes de voz. Perfectos para matrimonios y eventos especiales que querrás recordar siempre.",
    features: [
      "Teléfono vintage elegante",
      "Grabación de alta calidad",
      "Archivo digital entregado",
      "Instrucciones personalizadas"
    ],
    gradient: "from-neutral-500/10 to-neutral-600/10",
    iconColor: "text-neutral-800"
  }
];

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black px-6 pb-32 pt-40 md:pb-40 md:pt-48">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black opacity-90" />
        
        <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-neutral-400">
            Nuestros Servicios
          </p>
          <h1 className="mb-6 font-serif text-5xl font-light tracking-tight md:text-7xl">
            Experiencias que
            <span className="block font-medium italic">Transforman</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300">
            Cada servicio está diseñado para añadir ese toque especial que hace de tu evento algo verdaderamente memorable.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 transition-all duration-500 hover:border-neutral-300 hover:shadow-2xl md:p-10"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6 inline-flex rounded-xl bg-neutral-50 p-4 transition-all duration-500 group-hover:scale-110 group-hover:bg-white">
                      <Icon className={`h-8 w-8 ${service.iconColor}`} />
                    </div>

                    {/* Content */}
                    <h3 className="mb-4 font-serif text-3xl font-light tracking-tight text-neutral-900">
                      {service.title}
                    </h3>
                    <p className="mb-6 text-neutral-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-neutral-700">
                          <div className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                          {feature}
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

      {/* CTA Section */}
      <section className="bg-black px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-serif text-4xl font-light tracking-tight text-white md:text-5xl">
            ¿Listo para crear algo
            <span className="block font-medium italic">Extraordinario?</span>
          </h2>
          <p className="mb-10 text-lg text-neutral-300">
            Combina nuestros servicios para diseñar la experiencia perfecta para tu evento.
          </p>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
          >
            Cotizar mi Evento
            <Sparkles className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}

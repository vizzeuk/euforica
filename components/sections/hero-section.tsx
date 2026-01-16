"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById("cotizador");
    quoteSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-40"
        >
          <source
            src="/videos/hero-background.mp4"
            type="video/mp4"
          />
          {/* Fallback gradient si no hay video */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black" />
        </video>
        
        {/* Overlay gradient sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-5xl"
        >
          {/* Eyebrow text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6 text-sm font-light uppercase tracking-[0.3em] text-neutral-300"
          >
            Producción de Eventos Premium
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-serif text-6xl font-light leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Creamos
            <br />
            <span className="font-medium italic">Momentos</span>
            <br />
            Inolvidables
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-neutral-300 md:text-xl"
          >
            Transformamos tus celebraciones en experiencias extraordinarias.
            <br />
            Cada detalle, cada momento, diseñado a la perfección.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-12"
          >
            <Button
              onClick={scrollToQuote}
              size="lg"
              className="group relative overflow-hidden bg-white px-8 py-6 text-base font-medium text-black transition-all hover:bg-white hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Diseña tu Experiencia
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-neutral-100 to-white opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-neutral-400"
          >
            <span className="text-xs uppercase tracking-widest">Descubre</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-neutral-400 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

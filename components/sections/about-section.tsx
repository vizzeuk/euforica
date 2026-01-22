"use client";

import { motion } from "framer-motion";
import { Award, Heart, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Pasión por la perfección",
    description: "Cada detalle importa en la creación de momentos inolvidables",
  },
  {
    icon: Award,
    title: "Experiencia comprobada",
    description: "Años creando experiencias que superan expectativas",
  },
  {
    icon: Users,
    title: "Equipo especializado",
    description: "Profesionales dedicados a hacer realidad tu visión",
  },
  {
    icon: Sparkles,
    title: "Diseño único",
    description: "Cada evento es una obra maestra personalizada",
  },
];

export function AboutSection() {
  return (
    <section id="nosotros" className="bg-neutral-50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Sobre Nosotros
          </p>
          <h2 className="mb-6 font-serif text-5xl font-light tracking-tight md:text-6xl">
            Creamos experiencias
            <span className="block font-medium italic">excepcionales</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-600">
            En EUFÓRICA transformamos celebraciones en momentos extraordinarios. 
            Cada evento que diseñamos refleja la esencia única de nuestros clientes, 
            combinando elegancia, creatividad y atención meticulosa a cada detalle.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex rounded-full bg-neutral-100 p-3 transition-colors group-hover:bg-black">
                  <Icon className="h-6 w-6 text-neutral-600 transition-colors group-hover:text-white" />
                </div>

                {/* Content */}
                <h3 className="mb-3 font-serif text-xl font-light">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-neutral-50 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

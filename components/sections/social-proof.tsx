"use client";

import { motion } from "framer-motion";

const testimonials = [
  "Euforica convirtió nuestra boda en un cuento de hadas",
  "Profesionalismo y elegancia en cada detalle",
  "La mejor inversión para nuestro evento corporativo",
  "Superaron todas nuestras expectativas",
  "Cada momento fue perfecto, mágico e inolvidable",
];

export function SocialProof() {
  return (
    <section id="eventos" className="relative overflow-hidden bg-neutral-50 py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-neutral-500">
          Lo que dicen de nosotros
        </p>

        {/* Infinite Marquee */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex shrink-0 gap-8"
          >
            {[...testimonials, ...testimonials].map((text, index) => (
              <div
                key={index}
                className="flex min-w-[400px] items-center justify-center rounded-lg bg-white px-8 py-6 shadow-sm"
              >
                <p className="font-serif text-lg italic text-neutral-800">
                  {text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

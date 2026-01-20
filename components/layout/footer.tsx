"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  servicios: [
    { label: "Bodas", href: "/servicios/bodas" },
    { label: "Eventos Corporativos", href: "/servicios/corporativos" },
    { label: "Celebraciones", href: "/servicios/celebraciones" },
    { label: "Producción Integral", href: "/servicios/produccion" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Portafolio", href: "/portafolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contacto" },
  ],
  legal: [
    { label: "Política de Privacidad", href: "/privacidad" },
    { label: "Términos y Condiciones", href: "/terminos" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/euforica_cl", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/euforica", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <h3 className="font-serif text-3xl font-light tracking-tight">
                Euforica
              </h3>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">
              Creamos experiencias inolvidables que transforman celebraciones en
              momentos extraordinarios. Cada detalle diseñado a la perfección.
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3 text-sm text-neutral-600">
              <a
                href="mailto:contacto@euforica.com"
                className="flex items-center gap-2 transition-colors hover:text-black"
              >
                <Mail className="h-4 w-4" />
                contacto@euforica.com
              </a>
              <a
                href="tel:+56912345678"
                className="flex items-center gap-2 transition-colors hover:text-black"
              >
                <Phone className="h-4 w-4" />
                +56 9 1234 5678
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Santiago, Chile
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 transition-colors hover:border-black hover:bg-black hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:col-start-6">
            {/* Servicios */}
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider">
                Servicios
              </h4>
              <ul className="space-y-3">
                {footerLinks.servicios.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 transition-colors hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider">
                Empresa
              </h4>
              <ul className="space-y-3">
                {footerLinks.empresa.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 transition-colors hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 md:flex-row">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} Euforica. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-600 transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

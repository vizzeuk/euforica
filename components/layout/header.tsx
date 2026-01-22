"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Eventos', href: '#eventos' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Blog', href: '/blog' },
  { name: 'Sobre Nosotros', href: '#nosotros' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInContactSection, setIsInContactSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar si estamos en la página de blog (fondo blanco)
  const isBlogPage = pathname?.startsWith('/blog');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Detectar si estamos en la sección de contacto
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        const contactTop = contactSection.offsetTop;
        const contactBottom = contactTop + contactSection.offsetHeight;
        setIsInContactSection(scrollY >= contactTop - 100 && scrollY < contactBottom);
      }
    };

    handleScroll(); // Ejecutar al montar
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determinar estilos basados en el estado
  // En blog: siempre blanco
  // En home y servicios: negro en hero/contacto, blanco en otras secciones
  const isDarkHeader = isBlogPage ? false : (!isScrolled || isInContactSection);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isDarkHeader
          ? 'border-b border-white/10 bg-black/50 backdrop-blur-sm'
          : 'border-b border-neutral-200 bg-white/95 backdrop-blur-sm shadow-sm'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`font-serif text-2xl font-light tracking-tight transition-colors ${
              isDarkHeader 
                ? 'text-white hover:text-white/80' 
                : 'text-neutral-900 hover:text-neutral-600'
            }`}
          >
            EUFÓRICA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${
                  isDarkHeader 
                    ? 'text-white/90 hover:text-white' 
                    : 'text-neutral-700 hover:text-black'
                } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all hover:after:w-full`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Link
              href="#contacto"
              className={`inline-flex items-center rounded-md px-6 py-2.5 text-sm font-medium transition-all ${
                isDarkHeader
                  ? 'border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
                  : 'bg-black text-white hover:scale-105'
              }`}
            >
              Cotizar Evento
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`rounded-md p-2 transition-colors md:hidden ${
              isDarkHeader
                ? 'text-white hover:bg-white/10'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
            aria-label="Menú"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-neutral-200 bg-white md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-md px-4 py-3 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-black"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 block rounded-md bg-black px-4 py-3 text-center text-base font-medium text-white"
              >
                Cotizar Evento
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

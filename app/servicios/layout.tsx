import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios - EUFÓRICA | Experiencias Únicas para tu Evento",
  description: "Descubre nuestros servicios premium: Máquina de Chispas Frías, Glitter Bar Premium, Photo Estudio Editorial y Audio Guest Books. Experiencias que transforman tus celebraciones.",
  keywords: "servicios eventos, chispas frías, glitter bar, photo estudio, audio guestbook, bodas Santiago, eventos corporativos",
  openGraph: {
    title: "Servicios - EUFÓRICA",
    description: "Experiencias únicas que transforman tus celebraciones. Chispas Frías, Glitter Bar, Photo Estudio y más.",
    url: "https://euforica.cl/servicios",
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

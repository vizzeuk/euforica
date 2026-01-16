import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";
import { PortableTextRenderer } from "./portable-text-renderer";

interface BlogPostContentProps {
  post: any;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const imageUrl = post.mainImage 
    ? urlForImage(post.mainImage)?.width(1200).height(800).url()
    : null;

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-neutral-100">
        {/* Image background */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-300 via-neutral-200 to-neutral-100" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-4xl px-6 pb-16">
            <div>
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="mb-4 flex gap-2">
                  {post.categories.map((category: any) => (
                    <span
                      key={category._id}
                      className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-neutral-900"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="font-serif text-4xl font-light leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              {/* Meta info */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/90">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {post.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min de lectura</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        {/* Back Button */}
        <div className="mb-12">
          <Link href="/#blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al Blog
            </Button>
          </Link>
        </div>

        {/* Excerpt/Introduction */}
        {post.excerpt && (
          <div className="mb-12">
            <p className="text-xl leading-relaxed text-neutral-700">
              {post.excerpt}
            </p>
          </div>
        )}

        {/* Portable Text Content */}
        {post.body && (
          <div className="prose prose-lg max-w-none">
            <PortableTextRenderer value={post.body} />
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 rounded-lg bg-neutral-50 p-8 text-center">
          <h3 className="mb-4 font-serif text-2xl font-light">
            ¿Listo para crear tu experiencia?
          </h3>
          <p className="mb-6 text-neutral-600">
            Conversemos sobre cómo podemos hacer realidad tu evento soñado.
          </p>
          <Link href="/#cotizador">
            <Button size="lg" className="bg-black text-white hover:bg-neutral-800">
              Solicitar Cotización
            </Button>
          </Link>
        </div>
      </article>
    </main>
  );
}

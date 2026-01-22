import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

interface BlogCardProps {
  post: any;
  index: number;
  featured?: boolean;
}

function BlogCard({ post, index, featured = false }: BlogCardProps) {
  // Generar URL de imagen optimizada
  const imageUrl = post.mainImage 
    ? urlForImage(post.mainImage)?.width(800).height(600).url()
    : null;

  // Manejar slug como string o objeto Sanity
  const slug = typeof post.slug === 'string' ? post.slug : post.slug?.current;

  return (
    <article
      className={`group relative overflow-hidden ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <Link href={`/blog/${slug}`} className="block">
        {/* Image Container */}
        <div className={`relative overflow-hidden bg-neutral-100 ${
          featured ? "h-[500px] md:h-[600px]" : "h-[400px]"
        }`}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
              priority={featured}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-50" />
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="mb-4 flex items-center gap-4 text-xs uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime} min
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-6 space-y-3">
          <h3 className={`font-serif font-medium leading-tight tracking-tight transition-colors group-hover:text-neutral-600 ${
            featured ? "text-3xl md:text-4xl" : "text-2xl"
          }`}>
            {post.title}
          </h3>

          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-2 pt-2 text-sm font-medium">
            <span className="transition-all group-hover:translate-x-1">
              Leer más
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}

export async function BlogGrid() {
  // Obtener posts de Sanity (Server Component)
  let posts = [];
  
  try {
    posts = await getPosts();
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Si hay error, no mostramos la sección
    return null;
  }

  // Si no hay posts, no mostramos la sección
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section id="servicios" className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Inspiración & Ideas
          </p>
          <h2 className="font-serif text-5xl font-light tracking-tight md:text-6xl">
            El Arte de Crear
            <span className="block font-medium italic">Experiencias</span>
          </h2>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any, index: number) => (
            <BlogCard
              key={post._id}
              post={post}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors hover:text-neutral-600"
          >
            Ver todos los artículos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

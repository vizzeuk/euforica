import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

interface BlogCardProps {
  post: any;
  index: number;
}

function BlogCard({ post, index }: BlogCardProps) {
  const imageUrl = post.mainImage 
    ? urlForImage(post.mainImage)?.width(800).height(600).url()
    : null;

  // Manejar slug como string o objeto Sanity
  const slug = typeof post.slug === 'string' ? post.slug : post.slug?.current;

  return (
    <article className="group relative overflow-hidden">
      <Link href={`/blog/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative h-[400px] overflow-hidden bg-neutral-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {post.categories.map((category: any) => (
                <span
                  key={category._id}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium uppercase tracking-wider text-neutral-700"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-serif text-2xl font-medium leading-tight tracking-tight transition-colors group-hover:text-neutral-600">
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

export default async function BlogPage() {
  const posts = await getPosts();

  // Si no hay posts, mostrar mensaje
  if (!posts || posts.length === 0) {
    return (
      <main className="bg-white">
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="font-serif text-5xl font-light tracking-tight md:text-6xl">
              Blog
              <span className="block font-medium italic">Euforica</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600">
              Próximamente contenido inspirador para tus eventos.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
              Inspiración & Ideas
            </p>
            <h1 className="font-serif text-5xl font-light tracking-tight md:text-6xl lg:text-7xl">
              Blog
              <span className="block font-medium italic">Euforica</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600">
              Tendencias, consejos e inspiración para crear eventos
              extraordinarios.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any, index: number) => (
              <BlogCard key={post._id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { blogPosts } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return { title: post?.title ?? "Article", description: post?.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article>
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <Image src={post.image} alt={post.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <div className="container-px relative flex h-full flex-col justify-end pb-12">
          <Link href="/blog" className="mb-6 inline-flex w-fit items-center gap-2 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <span className="w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand">{post.category}</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold text-white sm:text-5xl">{post.title}</h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-white/70">
            <span>{post.author}</span>
            <span>·</span>
            <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readingTime}</span>
          </div>
        </div>
      </section>

      <section className="section bg-canvas">
        <div className="container-px mx-auto max-w-3xl text-lg leading-relaxed text-ink/75">
          <p className="font-display text-2xl font-medium text-ink">{post.excerpt}</p>
          <p className="mt-6">
            When dawn broke over Sonitpur, the volunteers were already in motion. Sacks
            of rice, crates of vegetables, and boxes of books moved hand to hand in a
            quiet rhythm that has become familiar across the villages we serve.
          </p>
          <p className="mt-5">
            This is the part outsiders rarely see — the ordinary, repeated acts of care
            that, stacked together, become extraordinary. A meal here. A textbook there.
            A health screening for a grandmother who hasn&apos;t seen a doctor in years.
          </p>
          <blockquote className="my-8 border-l-4 border-brand pl-6 font-display text-2xl font-medium text-ink">
            &ldquo;Hope isn&apos;t something we wait for. It&apos;s something we deliver.&rdquo;
          </blockquote>
          <p>
            The story doesn&apos;t end when our vans drive away. It continues in a child
            who can now read, a family that no longer goes hungry, and a community that
            knows it has not been forgotten. That continuity is the whole point.
          </p>

          <div className="mt-12 rounded-4xl bg-gradient-to-br from-brand to-mint p-8 text-white">
            <p className="font-display text-2xl font-semibold">Want to be part of the next story?</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/volunteer" className="btn-light">Volunteer</Link>
              <Link href="/contact" className="btn-gold">Get Involved</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

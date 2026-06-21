import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { blogPosts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories, impact reports, and volunteer experiences from First Hope NGO in Assam.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        eyebrow="Our Journal"
        title="Stories from"
        highlight="the field."
        subtitle="Impact reports, community updates, and the human moments behind the numbers."
      />

      <section className="section bg-canvas">
        <div className="container-px">
          {/* Featured */}
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-5xl border border-ink/5 bg-white shadow-soft lg:grid-cols-2">
              <div className="relative h-72 overflow-hidden lg:h-auto">
                <Image src={featured.image} alt={featured.title} fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="eyebrow w-fit">{featured.category}</span>
                <h2 className="mt-5 font-display text-3xl font-semibold leading-snug sm:text-4xl">{featured.title}</h2>
                <p className="mt-4 text-ink/60">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-sm text-ink/50">
                  <span>{featured.author}</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {featured.readingTime}</span>
                </div>
                <span className="mt-6 inline-flex w-fit items-center gap-1.5 font-semibold text-brand">
                  Read story <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-4xl border border-ink/5 bg-white shadow-soft card-hover">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold leading-snug">{post.title}</h3>
                    <p className="mt-3 flex-1 text-sm text-ink/60">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-ink/45">
                      <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readingTime}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

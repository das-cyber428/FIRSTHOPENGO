import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Countdown } from "@/components/ui/countdown";
import { Reveal } from "@/components/ui/reveal";
import { events } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming First Hope NGO events — food drives, education fairs, and health camps. Register today.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "long", year: "numeric",
  });
}

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Show up."
        highlight="Change everything."
        subtitle="Join an upcoming drive, fair, or camp — and be part of the change in person."
      />

      <section className="section bg-canvas">
        <div className="container-px space-y-8">
          {events.map((event, i) => (
            <Reveal key={event.slug} delay={i * 0.08}>
              <article className="group grid overflow-hidden rounded-5xl border border-ink/5 bg-white shadow-soft md:grid-cols-2">
                <div className="relative h-64 overflow-hidden md:h-auto">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent md:bg-gradient-to-r" />
                  <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
                    {event.category}
                  </span>
                  <div className="absolute bottom-5 left-5 md:hidden">
                    <Countdown date={event.date} />
                  </div>
                </div>

                <div className="flex flex-col p-7 sm:p-9">
                  <div className="hidden md:mb-5 md:block">
                    <div className="inline-block rounded-3xl bg-ink p-4">
                      <Countdown date={event.date} />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-semibold sm:text-3xl">{event.title}</h3>
                  <p className="mt-3 text-ink/60">{event.excerpt}</p>
                  <div className="mt-5 space-y-2 text-sm text-ink/70">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-brand" /> {formatDate(event.date)}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-brand" /> {event.location}
                    </p>
                  </div>
                  <div className="mt-7 flex gap-3">
                    <Link href={`/events/${event.slug}`} className="btn-primary">
                      Register <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href={`/events/${event.slug}`} className="btn-ghost">
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

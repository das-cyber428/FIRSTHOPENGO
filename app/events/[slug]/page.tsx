import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Clock, ArrowLeft } from "lucide-react";
import { Countdown } from "@/components/ui/countdown";
import { EventRegisterForm } from "@/components/sections/event-register-form";
import { events } from "@/lib/site";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  return {
    title: event?.title ?? "Event",
    description: event?.excerpt,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const dateLabel = new Date(event.date).toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const timeLabel = new Date(event.date).toLocaleTimeString("en-IN", {
    hour: "numeric", minute: "2-digit",
  });

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image src={event.image} alt={event.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="container-px relative flex h-full flex-col justify-end pb-12">
          <Link href="/events" className="mb-6 inline-flex w-fit items-center gap-2 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All events
          </Link>
          <span className="w-fit rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
            {event.category}
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold text-white sm:text-6xl">
            {event.title}
          </h1>
        </div>
      </section>

      <section className="section bg-canvas">
        <div className="container-px grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="mb-8 inline-block rounded-3xl bg-ink p-5">
              <p className="mb-3 text-xs uppercase tracking-widest text-white/50">Starts in</p>
              <Countdown date={event.date} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <DetailCard icon={<CalendarDays className="h-5 w-5" />} label="Date" value={dateLabel} />
              <DetailCard icon={<Clock className="h-5 w-5" />} label="Time" value={timeLabel} />
              <DetailCard icon={<MapPin className="h-5 w-5" />} label="Location" value={event.location} />
            </div>

            <div className="prose mt-10 max-w-none text-ink/70">
              <h2 className="font-display text-2xl font-semibold text-ink">About this event</h2>
              <p className="mt-3">{event.excerpt}</p>
              <p className="mt-4">
                Bring your energy and your heart. Volunteers will be briefed on arrival,
                provided refreshments, and grouped into teams. Whether you can stay for an
                hour or the whole day, your presence makes the difference between a good
                day and a transformed community.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5">
                <li>Free entry · all ages welcome</li>
                <li>Volunteer certificates provided</li>
                <li>Transport available from the town centre</li>
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:h-fit">
            <EventRegisterForm eventTitle={event.title} />
          </div>
        </div>
      </section>
    </>
  );
}

function DetailCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-ink/5 bg-white p-5 shadow-soft">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        {icon}
      </span>
      <p className="mt-3 text-xs uppercase tracking-widest text-ink/40">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

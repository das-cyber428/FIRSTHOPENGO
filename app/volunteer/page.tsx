import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { VolunteerForm } from "@/components/sections/volunteer-form";

export const metadata: Metadata = {
  title: "Become a Volunteer",
  description:
    "Join 500+ volunteers creating hope across Assam. Register in minutes and we'll match you to a program near you.",
};

const perks = [
  { title: "Certified Hours", body: "Earn verifiable certificates for every program you complete." },
  { title: "Real Impact", body: "Work directly with communities — see the change you create." },
  { title: "A Second Family", body: "Join a warm network of changemakers across the North East." },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer With Us"
        title="Give an hour."
        highlight="Change a life."
        subtitle="It takes two minutes to register and a lifetime to forget the difference you'll make."
      />

      <section className="section bg-canvas">
        <div className="container-px">
          <div className="mb-16 grid gap-5 md:grid-cols-3">
            {perks.map((p) => (
              <div key={p.title} className="rounded-4xl border border-ink/5 bg-white p-7 shadow-soft">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{p.body}</p>
              </div>
            ))}
          </div>
          <VolunteerForm />
        </div>
      </section>
    </>
  );
}

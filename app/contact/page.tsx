import type { Metadata } from "next";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach First Hope NGO in Dhekiajuli, Sonitpur, Assam. Call, email, or WhatsApp us anytime.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's talk"
        highlight="hope."
        subtitle="Questions, partnerships, or press — we'd love to hear from you."
      />

      <section className="section bg-canvas">
        <div className="container-px grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Details */}
          <div className="space-y-4">
            <ContactCard
              icon={<MapPin className="h-5 w-5" />}
              title="Visit Us"
              value={site.location}
            />
            <ContactCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <ContactCard
              icon={<Phone className="h-5 w-5" />}
              title="Call"
              value={site.phone}
              href={`tel:${site.phone}`}
            />
            <ContactCard
              icon={<MessageCircle className="h-5 w-5" />}
              title="WhatsApp"
              value="Chat with us instantly"
              href={`https://wa.me/${site.whatsapp}`}
              accent
            />

            {/* Map */}
            <div className="overflow-hidden rounded-4xl border border-ink/5 shadow-soft">
              <iframe
                title="First Hope NGO location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=92.40%2C26.65%2C92.55%2C26.75&layer=mapnik&marker=26.70%2C92.48"
                className="h-72 w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon, title, value, href, accent,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  accent?: boolean;
}) {
  const inner = (
    <div className={`flex items-center gap-4 rounded-4xl border p-5 shadow-soft transition hover:-translate-y-0.5 ${accent ? "border-mint/30 bg-mint/5" : "border-ink/5 bg-white"}`}>
      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent ? "bg-mint text-white" : "bg-brand/10 text-brand"}`}>
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-widest text-ink/40">{title}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a> : inner;
}

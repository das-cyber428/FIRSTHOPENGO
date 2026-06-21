import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { GalleryMasonry } from "@/components/sections/gallery-masonry";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments of hope — food drives, classrooms, health camps, and community service across Assam.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Photo Gallery"
        title="Moments of"
        highlight="hope."
        subtitle="Every frame is a life touched. Browse our work across communities in Sonitpur and beyond."
      />
      <section className="section bg-canvas">
        <div className="container-px">
          <GalleryMasonry />
        </div>
      </section>
    </>
  );
}

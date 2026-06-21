import { Hero } from "@/components/sections/hero";
import { Storytelling } from "@/components/sections/storytelling";
import { Impact } from "@/components/sections/impact";
import { Programs } from "@/components/sections/programs";
import { Stories } from "@/components/sections/stories";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Storytelling />
      <Impact />
      <Programs />
      <Stories />
      <CTA />
    </>
  );
}

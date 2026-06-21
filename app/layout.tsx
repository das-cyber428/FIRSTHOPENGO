import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Loader } from "@/components/ui/loader";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { FloatingActions } from "@/components/ui/floating-actions";
import { I18nProvider } from "@/components/i18n-provider";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://firsthopengo.org"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.mission,
  keywords: [
    "NGO", "Assam", "Sonitpur", "Dhekiajuli", "charity",
    "volunteer", "food distribution", "education support", "First Hope",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.mission,
    type: "website",
    locale: "en_IN",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B5FFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <I18nProvider>
          <Loader />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
        </I18nProvider>
      </body>
    </html>
  );
}

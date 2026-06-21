# First Hope NGO — *Hope Changes Everything*

A premium, award-inspired website for **First Hope NGO** (Dhekiajuli, Sonitpur, Assam, India), built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Cinematic storytelling, glassmorphism, scroll-triggered animations, a multi-step volunteer flow, events with live countdowns, a blog, a masonry gallery, and an admin dashboard.

---

## ✨ Features

| Area | What's included |
| --- | --- |
| **Homepage** | Full-screen video hero, animated stats, horizontal-scroll storytelling, parallax impact dashboard, program cards, success-story carousel, CTA |
| **Volunteer** | 4-step animated registration form → `POST /api/volunteer` |
| **Events** | Event cards with live countdown timers, detail pages, registration form |
| **Blog** | Featured + grid layout, SEO metadata, dynamic article pages |
| **Gallery** | Filterable Pinterest-style masonry + full-screen lightbox |
| **Contact** | Form, embedded map, WhatsApp / email / phone, social links |
| **Admin** | Dashboard with KPIs, animated charts, recent-volunteer feed (`/admin`) |
| **Global** | Sticky glass navbar, multi-language switcher (EN/हिं/অস), loader, scroll progress, floating WhatsApp + AI chatbot, premium footer with newsletter |

## 🧱 Tech Stack

- **Next.js 16** (App Router, React 19, Server Components, Turbopack) — pinned to the security-patched release
- **TypeScript** (strict)
- **Tailwind CSS 3** with a custom brand design system
- **Framer Motion** for all animations
- **lucide-react** icons
- **Supabase** (Postgres + Auth + Storage) — schema included
- **Cloudinary** (media) — env + image domains configured

> Cloudinary and Supabase are wired as **optional**: the site builds and runs with no keys, then activates automatically once you add them.

## 🎨 Design System

| Token | Value |
| --- | --- |
| Primary | `#0B5FFF` |
| Secondary | `#F5A623` |
| Accent | `#00C48C` |
| Background | `#FAFAFA` |
| Text | `#111827` |

Fonts: **Inter** (UI) + **Fraunces** (display). Utilities live in `app/globals.css` (`.glass`, `.btn-primary`, `.text-gradient`, `.input`, …) and `tailwind.config.ts`.

---

## 🚀 Getting Started

```bash
# 1. Install
npm install

# 2. Configure (optional for first run)
cp .env.example .env.local      # then fill in keys

# 3. Develop
npm run dev                     # http://localhost:3000

# 4. Production build
npm run build && npm start
```

The site runs **without any environment variables** — integrations gracefully no-op until configured.

## 🗂 Project Structure

```
app/
  layout.tsx            Root layout: fonts, metadata, nav, footer, loader
  page.tsx              Homepage (composes section components)
  volunteer/            Multi-step volunteer registration
  events/               List + [slug] detail pages
  blog/                 List + [slug] article pages
  gallery/              Masonry gallery + lightbox
  contact/              Contact form + map
  admin/                Admin dashboard
  api/                  Route handlers (volunteer, contact, events)
components/
  layout/               Navbar, Footer
  sections/             Hero, Storytelling, Impact, Programs, Stories, forms…
  ui/                   Reveal, Counter, Loader, Countdown, ScrollProgress…
lib/
  site.ts               ← All editable content (copy, stats, programs, events…)
  supabase.ts           Optional Supabase client helpers
  utils.ts              cn(), formatINR(), formatNumber()
supabase/
  schema.sql            Full database schema + RLS policies
```

✏️ **Editing content:** almost everything (stats, programs, stories, events, blog, gallery, contact details) lives in [`lib/site.ts`](lib/site.ts).

---

## 🔌 Integrations

### Supabase
1. Create a project at [supabase.com](https://supabase.com).
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor.
3. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`.
4. `npm i @supabase/supabase-js`.

Form submissions then persist automatically via the API routes.

### Cloudinary
Add cloud name + unsigned upload preset for the photo-management workflow. Image domains are already allow-listed in `next.config.mjs`.

### Email & WhatsApp
- Email: set `RESEND_API_KEY` and send from the API routes (see the `TODO` comments).
- WhatsApp: the floating button uses `NEXT_PUBLIC_WHATSAPP_NUMBER`.

---

## ☁️ Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.example` in **Project → Settings → Environment Variables**.
4. Deploy. Vercel auto-detects Next.js — no extra config needed.

```bash
# or from the CLI
npm i -g vercel && vercel
```

---

## 🌍 Multi-language (EN / Hindi / Assamese)

A language switcher is present in the navbar. To make it fully functional, add [`next-intl`](https://next-intl-docs.vercel.app/) (or `next-i18next`), create `messages/{en,hi,as}.json`, and wrap copy in translation keys. Content is centralized in `lib/site.ts` to make this migration straightforward.

## 🛠 Roadmap / Stubs to finish

These are scaffolded with clear extension points but intentionally left as stubs:

- **AI Chatbot** — currently rule-based; swap in the Claude API for live answers.
- **Certificate Generator** — `certificates` table exists; add PDF generation (e.g. `@react-pdf/renderer`).
- **Volunteer / Admin auth** — protect `/admin` with Supabase Auth + middleware.
- **Newsletter** — footer captures emails locally; wire to `newsletter_subscribers`.

## 📜 License

Built for First Hope NGO. Replace imagery and copy with your own before going live (current photos are Unsplash placeholders).

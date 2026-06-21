# First Hope NGO — Mobile App 📱

The companion **iOS + Android app** for First Hope NGO, built with **Expo (React Native) + TypeScript + Expo Router**. It mirrors the website's brand, content, and feel in a native, touch-first experience.

## ✨ Screens

**Tabs**
- **Home** — image hero, animated stat counters, horizontal program carousel, impact grid, story cards, CTA
- **Programs** — all six initiatives as rich cards
- **Events** — cards with **live countdown timers** → tap into detail
- **More** — org hub: stats, links, WhatsApp / call / email, language switcher

**Stack screens**
- **Volunteer** — 4-step animated registration with a success state
- **Gallery** — category filter + two-column masonry + full-screen lightbox
- **Blog** — featured post + article list
- **Contact** — tappable channels (WhatsApp/call/email) + message form
- **Event detail** (`/event/[slug]`) — countdown context, details, registration form

## 🎨 Brand
Same palette as the website — brand `#0B5FFF`, gold `#F5A623`, mint `#00C48C`, ink `#111827`, canvas `#FAFAFA`. Tokens live in [`constants/theme.ts`](constants/theme.ts); all content lives in [`constants/content.ts`](constants/content.ts).

---

## 🚀 Run it

```bash
cd "first hope ngo/mobile"
npm install          # already done once during setup
npx expo start
```

Then:
- **On your phone (easiest):** install **Expo Go** (App Store / Play Store) and scan the QR code in the terminal. Phone and computer must be on the same Wi-Fi. (If the QR won't connect, run `npx expo start --tunnel`.)
- **Android emulator:** press `a` in the Expo terminal (needs Android Studio).
- **iOS simulator:** press `i` (macOS + Xcode only).
- **Web preview:** press `w`.

## ✅ Verified
- `npx tsc --noEmit` — passes (no type errors)
- `npx expo export` — bundles successfully

## 🧱 Tech
- Expo SDK 56 · React Native 0.85 · React 19
- Expo Router (file-based navigation, typed routes)
- expo-linear-gradient · @expo/vector-icons (Ionicons)

## 🛠 Production notes / stubs
Forms (volunteer, contact, event registration) show success states locally. To go live:
- **Backend** — point the form submit handlers at the website's API routes or Supabase directly (reuse the same `supabase/schema.sql`).
- **Push notifications** — add `expo-notifications` for event reminders.
- **App icons / splash** — drop your art in `assets/images/` (referenced from `app.json`).
- **Build for stores** — `npx eas build -p android` / `-p ios` via [EAS Build](https://docs.expo.dev/build/introduction/).

> This app shares the **First Hope** brand and content with the Next.js website in the parent folder. Keep `constants/content.ts` (app) and `lib/site.ts` (web) in sync, or wire both to Supabase as the single source of truth.

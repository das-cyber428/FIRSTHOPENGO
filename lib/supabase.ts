/**
 * Supabase client helpers.
 *
 * Both helpers return `null` when the relevant env vars are missing, so the
 * app builds and runs WITHOUT credentials. Add keys to .env.local and they
 * activate automatically.
 *
 * Browser client -> anon key, safe to expose.
 * Server client  -> service-role key, NEVER import into client components.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedBrowser: SupabaseClient | null | undefined;

export function getSupabaseBrowser(): SupabaseClient | null {
  if (cachedBrowser !== undefined) return cachedBrowser;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  cachedBrowser = url && key ? createClient(url, key) : null;
  return cachedBrowser;
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

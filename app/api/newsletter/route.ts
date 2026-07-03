import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { insert } from "@/lib/db";

/** Subscribes an email to the newsletter. Uses Supabase if configured, else the local DB. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? "").trim();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("newsletter_subscribers").insert({ email });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      await insert("newsletter_subscribers", { email });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

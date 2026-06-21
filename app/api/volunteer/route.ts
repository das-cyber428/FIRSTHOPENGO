import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

/** Accepts a volunteer registration and stores it in Supabase (if configured). */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.name || !body?.email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("volunteers").insert({
        name: body.name,
        phone: body.phone,
        email: body.email,
        state: body.state,
        city: body.city,
        skills: body.skills,
        availability: body.availability,
        motivation: body.motivation,
        resume_url: body.resume ?? null,
      });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.info("[volunteer] (no DB configured):", body.name, body.email);
    }

    // TODO: trigger welcome email + WhatsApp notification here.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

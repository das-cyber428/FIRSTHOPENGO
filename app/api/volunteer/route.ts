import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { insert } from "@/lib/db";

/** Accepts a volunteer registration. Uses Supabase if configured, else the local DB. */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.name || !body?.email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const record = {
      name: body.name,
      phone: body.phone ?? null,
      email: body.email,
      state: body.state ?? null,
      city: body.city ?? null,
      skills: body.skills ?? [],
      availability: body.availability ?? null,
      motivation: body.motivation ?? null,
      resume_url: body.resume ?? null,
    };

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("volunteers").insert(record);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      await insert("volunteers", record);
    }

    // TODO: trigger welcome email + WhatsApp notification here.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

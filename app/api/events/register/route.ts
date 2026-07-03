import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { insert } from "@/lib/db";

/** Registers an attendee for an event. Uses Supabase if configured, else the local DB. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.email || !body?.event) {
      return NextResponse.json({ error: "Event and email are required." }, { status: 400 });
    }

    const record = {
      event_title: body.event,
      name: body.name ?? null,
      email: body.email,
      guests: body.guests ?? "1",
    };

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("event_registrations").insert(record);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      await insert("event_registrations", record);
    }

    // TODO: email an event pass / calendar invite.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

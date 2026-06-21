import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

/** Registers an attendee for an event. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.email || !body?.event) {
      return NextResponse.json({ error: "Event and email are required." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("event_registrations").insert({
        event_title: body.event,
        name: body.name,
        email: body.email,
        guests: body.guests ?? "1",
      });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.info("[event] (no DB configured):", body.event, body.email);
    }

    // TODO: email an event pass / calendar invite.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

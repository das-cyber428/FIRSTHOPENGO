import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

/** Stores a contact message and (optionally) forwards it via email. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.email || !body?.message) {
      return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("contact_messages").insert({
        name: body.name,
        email: body.email,
        subject: body.subject ?? "",
        message: body.message,
      });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.info("[contact] (no DB configured):", body.email);
    }

    // TODO: send notification email via Resend using RESEND_API_KEY.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

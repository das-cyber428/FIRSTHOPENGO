import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { insert } from "@/lib/db";

/** Stores a contact message. Uses Supabase if configured, else the local DB. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.email || !body?.message) {
      return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
    }

    const record = {
      name: body.name ?? null,
      email: body.email,
      subject: body.subject ?? "",
      message: body.message,
    };

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("contact_messages").insert(record);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      await insert("contact_messages", record);
    }

    // TODO: send notification email via Resend using RESEND_API_KEY.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

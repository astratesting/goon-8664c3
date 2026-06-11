import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }

    // In production, store in Supabase or email service.
    // For MVP, acknowledge receipt so the waitlist form is fully functional.
    return NextResponse.json({
      ok: true,
      message: "You're on the list! We'll notify you when we launch.",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

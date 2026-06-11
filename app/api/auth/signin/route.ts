import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SESSION_SECRET = process.env.NEXTAUTH_SECRET || "goon-dev-secret-change-in-production";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // In production, verify against Supabase or a database.
    // For the MVP, accept any valid email/password combo to create a working auth flow.
    const cookieStore = cookies();
    const sessionData = JSON.stringify({ email, signedAt: Date.now() });
    const encoded = Buffer.from(sessionData).toString("base64");

    cookieStore.set("goon-session", encoded, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ ok: true, user: { email } });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

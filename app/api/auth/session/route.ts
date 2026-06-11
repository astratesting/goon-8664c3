import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("goon-session");

  if (!session) {
    return NextResponse.json({ user: null });
  }

  try {
    const decoded = Buffer.from(session.value, "base64").toString("utf-8");
    const data = JSON.parse(decoded);
    return NextResponse.json({ user: { email: data.email } });
  } catch {
    return NextResponse.json({ user: null });
  }
}

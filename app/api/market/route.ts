import { NextResponse } from "next/server";
import { getMarketData } from "@/lib/mock/market";

export async function GET() {
  const data = getMarketData();
  return NextResponse.json(data);
}

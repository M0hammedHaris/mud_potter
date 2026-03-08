import { NextResponse } from "next/server";
import { getDeals, updateAllDeals, Deal } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getDeals());
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Deal[];
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected an array of deals" }, { status: 400 });
    }
    updateAllDeals(body);
    return NextResponse.json(getDeals());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

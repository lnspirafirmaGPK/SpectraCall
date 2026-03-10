import { NextResponse } from "next/server";
import { infrastructureGraph } from "@/lib/mock/infrastructure";

export async function GET() {
  return NextResponse.json(infrastructureGraph);
}

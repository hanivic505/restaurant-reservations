import { NextResponse } from "next/server";
import { reservations } from "../data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const data = id
    ? reservations.filter((reservation) => reservation.id.toString() === id)
    : reservations;

  return NextResponse.json({ reservations: data });
}

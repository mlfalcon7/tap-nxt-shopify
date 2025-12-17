import { NextResponse } from "next/server";
import {
  addLinesToCart,
  removeCartLines,
  updateCartLines,
} from "@/lib/shopify/client";

export async function POST(request: Request) {
  const { cartId, lines } = await request.json();
  await addLinesToCart(cartId, lines);
  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  const { cartId, lines } = await request.json();
  await updateCartLines(cartId, lines);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const { cartId, lineIds } = await request.json();
  await removeCartLines(cartId, lineIds);
  return NextResponse.json({ ok: true });
}

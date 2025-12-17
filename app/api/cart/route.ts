import { NextResponse } from "next/server";
import { createCart, getCart } from "@/lib/shopify/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cartId = searchParams.get("cartId");

  if (!cartId) {
    return NextResponse.json({ cart: null });
  }

  const cart = await getCart(cartId).catch(() => null);
  return NextResponse.json({ cart });
}

export async function POST() {
  const cart = await createCart();
  return NextResponse.json({ cart }, { status: 201 });
}

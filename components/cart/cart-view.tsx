"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/cart-provider";
import type { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

type Props = {
  crossSell: Product[];
};

export function CartView({ crossSell }: Props) {
  const { cart, isLoading, updateQuantity, removeLine } = useCart();

  if (isLoading || !cart) {
    return (
      <div className="container-width py-20 text-center">
        <p>Loading your gear locker…</p>
      </div>
    );
  }

  if (cart.totalQuantity === 0) {
    return (
      <div className="container-width py-20 text-center space-y-4">
        <h1 className="text-3xl font-bold">Your gear locker is empty</h1>
        <Link href="/shop" className="inline-flex">
          <Button>Deploy gear</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-width py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-6">
        {cart.lines.edges.map((edge) => (
          <div
            key={edge.node.id}
            className="flex gap-4 border border-border p-4 items-center"
          >
            <Image
              src={
                edge.node.merchandise.product.featuredImage?.url ??
                "/placeholder.png"
              }
              alt={edge.node.merchandise.product.title}
              width={120}
              height={120}
              className="h-24 w-24 object-cover"
            />
            <div className="flex-1 space-y-1">
              <Link
                href={`/products/${edge.node.merchandise.product.handle}`}
                className="font-semibold"
              >
                {edge.node.merchandise.product.title}
              </Link>
              <p className="text-sm text-muted-foreground">
                {edge.node.merchandise.selectedOptions
                  .map((option) => `${option.name}: ${option.value}`)
                  .join(" • ")}
              </p>
              <div className="flex items-center gap-2">
                <label className="text-xs uppercase tracking-[0.2em]">Qty</label>
                <input
                  type="number"
                  min={1}
                  value={edge.node.quantity}
                  onChange={(event) =>
                    updateQuantity(edge.node.id, Number(event.target.value))
                  }
                  className="w-16 border border-border px-2 py-1 text-sm"
                />
                <button
                  className="text-xs underline text-muted-foreground"
                  onClick={() => removeLine(edge.node.id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="font-semibold">
              {formatPrice(edge.node.cost.totalAmount.amount)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4 border border-border p-6 h-fit">
        <h2 className="text-xl font-semibold">Mission Summary</h2>
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>
            {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Taxes and shipping calculated at checkout. 2% donation applied automatically.
        </p>
        <Button
          className="w-full"
          onClick={() => {
            trackEvent("begin_checkout", { cartId: cart.id });
            window.location.href = `/checkout?cartId=${cart.id}`;
          }}
        >
          Deploy to Checkout
        </Button>
      </div>

      <div className="lg:col-span-3 space-y-4">
        <h3 className="text-xl font-semibold">Complete the Hero Kit</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {crossSell.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="border border-border p-3 space-y-2"
            >
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText ?? product.title}
                width={300}
                height={300}
                className="h-32 w-full object-cover"
              />
              <p className="font-semibold">{product.title}</p>
              <p className="text-sm text-muted-foreground">
                {formatPrice(product.priceRange.minVariantPrice.amount)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

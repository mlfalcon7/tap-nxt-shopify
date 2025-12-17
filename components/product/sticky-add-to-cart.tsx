"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

type StickyAddToCartProps = {
  product: Product;
};

export function StickyAddToCart({ product }: StickyAddToCartProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-background p-4 shadow-lg lg:hidden">
      <div className="container-width flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">{product.title}</p>
          <p className="text-lg font-semibold text-foreground">{formatPrice(product.price.toString())}</p>
        </div>
        <Button size="lg" className="h-12 px-8">
          Add to kit
        </Button>
      </div>
    </div>
  );
}



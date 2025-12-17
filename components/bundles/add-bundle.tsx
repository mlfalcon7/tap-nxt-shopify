"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";

type Props = {
  variantIds: string[];
};

export function AddBundleButton({ variantIds }: Props) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleBundleAdd() {
    setLoading(true);
    for (const variantId of variantIds) {
      await addToCart(variantId, 1);
    }
    setLoading(false);
  }

  return (
    <Button onClick={handleBundleAdd} disabled={loading}>
      {loading ? "Adding…" : "Add Bundle to Cart"}
    </Button>
  );
}

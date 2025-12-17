"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Cart } from "@/lib/shopify/types";
import { trackEvent } from "@/lib/analytics";

type CartContextValue = {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "tap-cart-id";

async function fetchJson(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  return response.json();
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function bootstrapCart() {
      setIsLoading(true);
      const storedCartId =
        typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

      if (!storedCartId) {
        const { cart: newCart } = await fetchJson("/api/cart", {
          method: "POST",
        });
        localStorage.setItem(STORAGE_KEY, newCart.id);
        setCart(newCart);
        setIsLoading(false);
        return;
      }

      const { cart: existing } = await fetchJson(
        `/api/cart?cartId=${storedCartId}`
      );

      if (!existing) {
        localStorage.removeItem(STORAGE_KEY);
        await bootstrapCart();
        return;
      }

      setCart(existing);
      setIsLoading(false);
    }

    bootstrapCart();
  }, []);

  const refreshCart = useCallback(async () => {
    const cartId = localStorage.getItem(STORAGE_KEY);
    if (!cartId) {
      return;
    }

    const { cart: updated } = await fetchJson(`/api/cart?cartId=${cartId}`);
    if (updated) {
      setCart(updated);
    }
  }, []);

  const addToCart = useCallback(
    async (variantId: string, quantity: number = 1) => {
      const cartId = localStorage.getItem(STORAGE_KEY);
      if (!cartId) return;

      await fetchJson("/api/cart/lines", {
        method: "POST",
        body: JSON.stringify({
          cartId,
          lines: [{ merchandiseId: variantId, quantity }],
        }),
      });

      trackEvent("add_to_cart", { variantId, quantity });
      await refreshCart();
    },
    [refreshCart]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      const cartId = localStorage.getItem(STORAGE_KEY);
      if (!cartId) return;

      await fetchJson("/api/cart/lines", {
        method: "PATCH",
        body: JSON.stringify({ cartId, lines: [{ id: lineId, quantity }] }),
      });
      await refreshCart();
    },
    [refreshCart]
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      const cartId = localStorage.getItem(STORAGE_KEY);
      if (!cartId) return;

      await fetchJson("/api/cart/lines", {
        method: "DELETE",
        body: JSON.stringify({ cartId, lineIds: [lineId] }),
      });
      await refreshCart();
    },
    [refreshCart]
  );

  return (
    <CartContext.Provider
      value={{ cart, isLoading, addToCart, updateQuantity, removeLine }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

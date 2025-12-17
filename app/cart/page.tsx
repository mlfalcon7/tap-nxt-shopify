import { CartView } from "@/components/cart/cart-view";
import { getProducts } from "@/lib/shopify/client";

export const metadata = {
  title: "Cart",
  description: "Review your deployment kit before checkout.",
};

export default async function CartPage() {
  const crossSell = (await getProducts({ first: 3 })) ?? [];
  return <CartView crossSell={crossSell} />;
}

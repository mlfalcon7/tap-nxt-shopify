import Link from "next/link";
import { getProducts } from "@/lib/shopify/client";
import { AddBundleButton } from "@/components/bundles/add-bundle";

export const metadata = {
  title: "Hero Starter Pack",
  description: "Bundle route for multi-line add-to-cart behavior.",
};

export default async function HeroStarterPackPage() {
  const products = await getProducts({ first: 3 });
  const variantIds = products
    .map((product) => product.variants.edges[0]?.node.id)
    .filter(Boolean) as string[];

  return (
    <section className="container-width py-16 space-y-10">
      <div className="space-y-4">
        <p className="eyebrow text-muted-foreground">
          Bundle
        </p>
        <h1 className="text-4xl font-bold">Hero Starter Pack</h1>
        <p className="text-muted-foreground max-w-2xl">
          Collar + leash + service vest. One click adds all items to cart for faster deployments.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-border p-4 space-y-2">
            <p className="eyebrow text-muted-foreground">
              Included
            </p>
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <AddBundleButton variantIds={variantIds} />
        <Link href="/cart" className="text-sm underline">
          Review cart
        </Link>
      </div>
    </section>
  );
}

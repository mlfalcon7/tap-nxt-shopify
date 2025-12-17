import { products } from "@/data/products";
import { Section } from "@/components/layout/section";
import { TapSeal, PatriotRule } from "@/components/patriotism";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ShopGrid } from "@/components/shop/shop-grid";

export const metadata = {
  title: "Shop",
  description: "Mission-led equipment built for working dogs and family heroes.",
  alternates: {
    canonical: "/shop",
  },
};

export default async function ShopPage() {
  const heroPoints = [
    "US Protocol Certified",
    "Field-tested textiles",
    "Impact receipts enclosed",
  ] as const;

  return (
    <div className="bg-background">
      <Section>
        <div className="space-y-6 text-center">
          <TapSeal label="Shop Gear" detail="Protocol Grade" className="justify-center" />
          <h1 className="h1 text-foreground">Gear built like a promise.</h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Every SKU passes the same TAP Certified Safety standards trusted by K9 units and neighborhood heroes.
            Filter by mission, badge, or impact receipts to kit the Hero Starter Pack.
          </p>
          <TrustStrip points={heroPoints} className="justify-center" compact />
        </div>
      </Section>
      <PatriotRule label="Essential Gear" className="container-width" />
      <Section className="pt-0">
        <ShopGrid products={products} />
      </Section>
    </div>
  );
}

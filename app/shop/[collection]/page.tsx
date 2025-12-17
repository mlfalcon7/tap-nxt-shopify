import { notFound } from "next/navigation";
import { ShopFilters } from "@/components/shop/filters";
import { products } from "@/data/products";
import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { getProducts } from "@/lib/shopify/client";
import { buildCanonical } from "@/lib/utils";
import { publicEnv } from "@/lib/env";

type Props = {
  params: Promise<{ collection: string }>;
};

// Collection mapping - can be moved to data file later
const collectionMap: Record<string, { title: string; description: string }> = {
  collars: {
    title: "Collars",
    description: "Identification and safety collars built to US Protocol standards.",
  },
  harnesses: {
    title: "Harnesses",
    description: "Load-balanced harnesses for adventure and deployment.",
  },
  leashes: {
    title: "Leashes",
    description: "Reflective, traceable leashes for every mission.",
  },
  vests: {
    title: "Vests",
    description: "Ballistic-tested vests with modular MOLLE systems.",
  },
  kits: {
    title: "Kits & Bundles",
    description: "Complete gear sets for immediate deployment.",
  },
  accessories: {
    title: "Accessories",
    description: "Patches, tags, and mission essentials.",
  },
};

export async function generateStaticParams() {
  return Object.keys(collectionMap).map((collection) => ({ collection }));
}

export async function generateMetadata({ params }: Props) {
  const { collection } = await params;
  const collectionInfo = collectionMap[collection];
  if (!collectionInfo) return {};
  return {
    title: `${collectionInfo.title} | Shop`,
    description: collectionInfo.description,
    alternates: {
      canonical: buildCanonical(`/shop/${collection}`, publicEnv.siteUrl),
    },
  };
}

export default async function ShopCollectionPage({ params }: Props) {
  const { collection } = await params;
  const collectionInfo = collectionMap[collection];

  if (!collectionInfo) {
    notFound();
  }

  // Get Shopify products for filtering
  const shopifyProducts = await getProducts({ first: 50 });
  
  // Filter local products by category/collection
  const categoryMap: Record<string, string> = {
    collars: "Collars",
    harnesses: "Harnesses",
    leashes: "Leashes",
    vests: "Vests",
    kits: "Kits",
    accessories: "Patches",
  };
  
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryMap[collection]?.toLowerCase()
  );

  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          { label: collectionInfo.title },
        ]}
      />
      <section className="container-width py-12 space-y-8">
        <div className="space-y-4 max-w-3xl">
          <TapSeal label={collectionInfo.title} detail="Collection" />
          <h1 className="h1">{collectionInfo.title}</h1>
          <p className="text-lg text-muted-foreground">{collectionInfo.description}</p>
        </div>
      </section>
      <ShopFilters
        products={shopifyProducts}
        collections={[]}
        defaultCollection={collection}
      />
    </div>
  );
}



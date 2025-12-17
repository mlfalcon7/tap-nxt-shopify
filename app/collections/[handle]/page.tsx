import { notFound } from "next/navigation";
import { ShopFilters } from "@/components/shop/filters";
import { getCollectionByHandle, getProducts } from "@/lib/shopify/client";
import { buildCanonical } from "@/lib/utils";
import { publicEnv } from "@/lib/env";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
    alternates: {
      canonical: buildCanonical(`/collections/${collection.handle}`, publicEnv.siteUrl),
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const [collection, products] = await Promise.all([
    getCollectionByHandle(handle),
    getProducts({ first: 50 }),
  ]);

  if (!collection) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <div className="container-width pt-12">
        <p className="eyebrow text-muted-foreground">
          Collection
        </p>
        <h1 className="text-4xl font-bold">{collection.title}</h1>
        <p className="text-muted-foreground max-w-2xl">{collection.description}</p>
      </div>
      <ShopFilters
        products={products}
        collections={[collection]}
        defaultCollection={collection.handle}
      />
    </div>
  );
}

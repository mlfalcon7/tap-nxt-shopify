import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/lib/shopify/client";

export const metadata = {
  title: "Collections",
  description: "Curated deployments for every mission style.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <section className="container-width py-16 space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Collections
        </p>
        <h1 className="text-4xl font-bold">Mission groupings</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((collection) => (
          <Link
            key={collection.handle}
            href={`/collections/${collection.handle}`}
            className="group relative overflow-hidden border border-border"
          >
            {collection.image && (
              <Image
                src={collection.image.url}
                alt={collection.image.altText ?? collection.title}
                width={collection.image.width}
                height={collection.image.height}
                className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="p-6 space-y-2 bg-surface">
              <h2 className="text-2xl font-semibold">{collection.title}</h2>
              <p className="text-sm text-muted-foreground">
                {collection.description}
              </p>
              <span className="text-xs tracking-[0.4em] uppercase text-link">
                Enter Collection →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

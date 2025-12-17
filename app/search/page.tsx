import Link from "next/link";
import Image from "next/image";
import { predictiveSearch } from "@/lib/shopify/client";
import { Button } from "@/components/ui/button";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata = {
  title: "Search",
  description: "Predictive search powered by Shopify storefront API.",
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q ?? "";
  const results = query ? await predictiveSearch(query) : null;

  return (
    <section className="container-width py-12 space-y-8">
      <h1 className="text-3xl font-bold">Search</h1>
      <form className="flex gap-4" method="GET">
        <input
          type="text"
          name="q"
          placeholder="Search gear, campaigns, collections…"
          defaultValue={query}
          className="flex-1 border border-border px-4 py-3 bg-background text-[var(--text-primary)]"
        />
        <Button
          type="submit"
          className="px-6 font-semibold uppercase tracking-[0.3em]"
        >
          Go
        </Button>
      </form>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Products</h2>
            <div className="space-y-3">
              {results.products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="flex items-center gap-4 border border-border p-3 bg-surface subtle-motion hover:border-accent"
                >
                  {product.featuredImage && (
                    <Image
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText ?? product.title}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-cover"
                    />
                  )}
                  <span className="font-semibold">{product.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">Collections</h2>
            <div className="space-y-3">
              {results.collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="block border border-border p-3 font-semibold bg-surface subtle-motion hover:border-accent"
                >
                  {collection.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

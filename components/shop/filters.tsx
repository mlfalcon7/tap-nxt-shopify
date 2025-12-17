"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Collection, Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { TAP_FILTERS } from "@/lib/constants";

type Props = {
  products: Product[];
  collections: Collection[];
  defaultCollection?: string;
};

type SortKey = "price-asc" | "price-desc" | "newest";

export function ShopFilters({ products, collections, defaultCollection }: Props) {
  const [selectedCollection, setSelectedCollection] = useState<string>(
    defaultCollection ?? "all"
  );
  const [selectedSort, setSelectedSort] = useState<SortKey>("newest");
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    {}
  );
  const [metafieldFilters, setMetafieldFilters] = useState<Record<string, string>>(
    {}
  );
  const [showFilters, setShowFilters] = useState(false);

  const variantOptions = useMemo(() => {
    const map = new Map<string, Set<string>>();
    products.forEach((product) => {
      product.options.forEach((option) => {
        const values = map.get(option.name) ?? new Set<string>();
        option.values.forEach((value) => values.add(value));
        map.set(option.name, values);
      });
    });
    return Array.from(map.entries()).map(([name, values]) => ({
      name,
      values: Array.from(values),
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCollection !== "all") {
      result = result.filter((product) =>
        product.tags?.includes(selectedCollection)
      );
    }

    Object.entries(selectedOptions).forEach(([optionName, optionValue]) => {
      if (!optionValue) return;
      result = result.filter((product) =>
        product.options.some(
          (option) =>
            option.name === optionName && option.values.includes(optionValue)
        )
      );
    });

    Object.entries(metafieldFilters).forEach(([key, value]) => {
      if (!value) return;
      result = result.filter((product) => {
        const productRecord = product as unknown as Record<
          string,
          string | boolean | undefined
        >;
        const fromField = productRecord[key];
        if (typeof fromField === "boolean") {
          return value === "true" ? fromField : !fromField;
        }
        if (fromField) {
          return fromField === value;
        }
        const metaValue = product.metafields?.find(
          (mf) => mf.key === key && mf.namespace === "tap"
        )?.value;
        return metaValue === value;
      });
    });

    if (selectedSort === "price-asc") {
      result.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      );
    } else if (selectedSort === "price-desc") {
      result.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
      );
    } else {
      result.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    }

    return result;
  }, [
    products,
    selectedCollection,
    selectedOptions,
    metafieldFilters,
    selectedSort,
  ]);

  return (
    <div className="container-width py-12 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="eyebrow text-muted-foreground">
            The Shop
          </p>
          <h1 className="text-4xl font-bold">Gear built like a promise</h1>
        </div>
        <button
          className="lg:hidden text-sm font-semibold underline text-link"
          onClick={() => setShowFilters(true)}
        >
          Filters
        </button>
      </div>

      <div className="flex gap-10">
        <aside className="hidden lg:block w-64 space-y-8">
          <FilterContent
            collections={collections}
            selectedCollection={selectedCollection}
            setSelectedCollection={setSelectedCollection}
            variantOptions={variantOptions}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            metafieldFilters={metafieldFilters}
            setMetafieldFilters={setMetafieldFilters}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} results
            </p>
            <select
              value={selectedSort}
              onChange={(event) =>
                setSelectedSort(event.target.value as SortKey)
              }
              className="border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group space-y-4"
              >
                <div className="relative aspect-square bg-surface-strong overflow-hidden">
                  <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText ?? product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {!product.availableForSale && (
                    <span className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 text-xs uppercase tracking-[0.2em]">
                      Notify Me
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-accent">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(product.priceRange.minVariantPrice.amount)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 bg-black/50 lg:hidden z-40">
          <div className="bg-background h-full w-80 ml-auto p-6 overflow-y-auto">
            <button
              className="text-sm font-semibold mb-6"
              onClick={() => setShowFilters(false)}
            >
              Close
            </button>
            <FilterContent
              collections={collections}
              selectedCollection={selectedCollection}
              setSelectedCollection={setSelectedCollection}
              variantOptions={variantOptions}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              metafieldFilters={metafieldFilters}
              setMetafieldFilters={setMetafieldFilters}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          </div>
        </div>
      )}
    </div>
  );
}

type FilterContentProps = {
  collections: Collection[];
  selectedCollection: string;
  setSelectedCollection: (value: string) => void;
  variantOptions: { name: string; values: string[] }[];
  selectedOptions: Record<string, string>;
  setSelectedOptions: (value: Record<string, string>) => void;
  metafieldFilters: Record<string, string>;
  setMetafieldFilters: (value: Record<string, string>) => void;
  selectedSort: SortKey;
  setSelectedSort: (value: SortKey) => void;
};

function FilterContent({
  collections,
  selectedCollection,
  setSelectedCollection,
  variantOptions,
  selectedOptions,
  setSelectedOptions,
  metafieldFilters,
  setMetafieldFilters,
  selectedSort,
  setSelectedSort,
}: FilterContentProps) {
  return (
    <div className="space-y-8 text-sm">
      <div>
        <h4 className="font-semibold mb-3 uppercase tracking-[0.2em] text-xs">
          Collection
        </h4>
        <ul className="space-y-2">
          <li>
            <button
              className={`text-sm transition-colors ${
                selectedCollection === "all"
                  ? "font-semibold text-link"
                  : "text-muted-foreground hover:text-link"
              }`}
              onClick={() => setSelectedCollection("all")}
            >
              All gear
            </button>
          </li>
          {collections.map((collection) => (
            <li key={collection.handle}>
              <button
                className={`text-sm transition-colors ${
                  selectedCollection === collection.handle
                    ? "font-semibold text-link"
                    : "text-muted-foreground hover:text-link"
                }`}
                onClick={() => setSelectedCollection(collection.handle)}
              >
                {collection.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-3 uppercase tracking-[0.2em] text-xs">
          Sort
        </h4>
        <select
          value={selectedSort}
          onChange={(event) => setSelectedSort(event.target.value as SortKey)}
          className="border border-border px-3 py-2 w-full bg-background"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
        </select>
      </div>

      {variantOptions.map((option) => (
        <div key={option.name}>
          <h4 className="font-semibold mb-3 uppercase tracking-[0.2em] text-xs">
            {option.name}
          </h4>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => (
              <button
                key={value}
                onClick={() =>
                  setSelectedOptions({
                    ...selectedOptions,
                    [option.name]: selectedOptions[option.name] === value ? "" : value,
                  })
                }
                className={`border px-3 py-1 bg-background text-[var(--text-primary)] subtle-motion ${
                  selectedOptions[option.name] === value
                    ? "border-accent bg-accent/10"
                    : "border-border"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      {TAP_FILTERS.map((filter) => (
        <div key={filter.key}>
          <h4 className="font-semibold mb-3 uppercase tracking-[0.2em] text-xs">
            {filter.label}
          </h4>
          <input
            type="text"
            placeholder={`Filter by ${filter.label}`}
            value={metafieldFilters[filter.key] ?? ""}
            onChange={(event) =>
              setMetafieldFilters({
                ...metafieldFilters,
                [filter.key]: event.target.value,
              })
            }
            className="border border-border px-3 py-2 w-full bg-background"
          />
        </div>
      ))}
    </div>
  );
}

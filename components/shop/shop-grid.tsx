"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";

const sortByOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price — Low to High" },
  { value: "price-desc", label: "Price — High to Low" },
] as const;

type SortValue = (typeof sortByOptions)[number]["value"];

export function ShopGrid({ products }: { products: Product[] }) {
  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category));
    return ["All", ...Array.from(unique)];
  }, [products]);

  const badgeFilters = useMemo(() => {
    const badgeSet = new Set(products.flatMap((product) => product.badges));
    return ["All", ...Array.from(badgeSet)];
  }, [products]);

  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [badgeFilter, setBadgeFilter] = useState<string>("All");
  const [sortValue, setSortValue] = useState<SortValue>("featured");

  const filtered = useMemo(() => {
    let result = [...products];
    if (categoryFilter !== "All") {
      result = result.filter((product) => product.category === categoryFilter);
    }
    if (badgeFilter !== "All") {
      result = result.filter((product) => product.badges.includes(badgeFilter as typeof product.badges[number]));
    }
    if (sortValue === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, categoryFilter, badgeFilter, sortValue]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setCategoryFilter(category)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] transition-all",
                categoryFilter === category
                  ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[var(--text-primary)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="shop-sort" className="eyebrow text-[var(--text-secondary)]">
            Sort
          </label>
          <select
            id="shop-sort"
            className="border border-[var(--border)] bg-surface px-3 py-2 text-sm"
            value={sortValue}
            onChange={(event) => setSortValue(event.target.value as SortValue)}
          >
            {sortByOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <p className="eyebrow text-muted-foreground">Filter by protocol</p>
        {badgeFilters.map((badge) => (
          <button
            key={badge}
            type="button"
            onClick={() => setBadgeFilter(badge)}
            className={cn(
              "rounded border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em]",
              badgeFilter === badge
                ? "border-[var(--accent-secondary)] text-[var(--accent-secondary)]"
                : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-secondary)]"
            )}
          >
            {badge}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground">No products match that criteria. Try another filter.</p>
      )}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import type { Product } from "@/data/products";
import type { Product as ShopifyProduct } from "@/lib/shopify/types";
import { proofItems } from "@/lib/brandCopy";
import { cn, formatPrice } from "@/lib/utils";

type ProductCardProps = {
  product: Product | ShopifyProduct;
};

function getMadeInLabel(product: Product | ShopifyProduct): string {
  // Check if this is a Shopify product with metafields
  if ("metafields" in product && product.metafields) {
    const madeInMeta = product.metafields.find(
      (mf) => mf.namespace === "tap" && mf.key === "made_in"
    );
    if (madeInMeta?.value === "USA") {
      return "Made in USA";
    }
  }
  // Check if it's a Shopify product with direct made_in property
  if ("made_in" in product && product.made_in === "USA") {
    return "Made in USA";
  }
  // Default to safe claim
  return "Designed & Engineered in the USA";
}

export function ProductCard({ product }: ProductCardProps) {
  const productHref = `/products/${product.handle}`;
  
  // Handle rating (mock products have rating, Shopify products don't)
  const rating = "rating" in product ? product.rating : 4.5;
  const reviews = "reviews" in product ? product.reviews : 0;
  const roundedRating = Math.round(rating) - 1;

  // Generate premium proof chips (max 2-3 on grid)
  // Use exact labels from brandCopy: US Protocol Tested, Traceable Components, Lifetime Hero Guarantee, 2% Funds K9 Grants
  const chips: string[] = [];
  
  // Always include first two proof points (core brand promises)
  chips.push(proofItems[0]); // US Protocol Tested
  chips.push(proofItems[1]); // Traceable Components
  
  // Add manufacturing label (Made in USA only if verified, otherwise Designed & Engineered)
  chips.push(getMadeInLabel(product));
  
  // Limit to 2-3 chips max (as specified)
  const displayChips = chips.slice(0, 3);

  // Get image source (handle both mock and Shopify products)
  const imageSrc = "image" in product 
    ? product.image.src 
    : product.featuredImage?.url || "/placeholders/gear-1.jpg";
  const imageAlt = "image" in product 
    ? product.image.alt 
    : product.featuredImage?.altText || product.title;
  
  // Get price (handle both mock and Shopify products)
  const price = "price" in product
    ? product.price
    : parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <div className="group relative flex flex-col h-full rounded-sm border border-[var(--border)] bg-surface p-4 pb-16 shadow-sm transition-transform hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-md">
      <Link href={productHref} className="flex flex-col gap-4 flex-1">
        <div className="relative aspect-square overflow-hidden rounded-sm bg-surface-strong">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        {/* Chips row under image - consistent height */}
        <div className="flex flex-wrap items-center gap-2 min-h-[28px]">
          {displayChips.map((chip) => (
            <Chip key={chip} label={chip} variant="small" />
          ))}
        </div>
        <div className="space-y-2 flex-1 flex flex-col">
          {/* Clamp title to 2 lines max for consistent height */}
          <h3 
            className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent min-h-[3.5rem]"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            {Array.from({ length: 5 }).map((_, index) => {
              const isActive = index <= roundedRating;
              return (
                <Star
                  key={`${product.id}-star-${index}`}
                  className={cn("h-4 w-4 flex-shrink-0", isActive ? "text-[var(--accent)]" : "text-[var(--border)]")}
                  fill={isActive ? "currentColor" : "none"}
                />
              );
            })}
            <span className="font-medium whitespace-nowrap">
              {rating.toFixed(1)} • {reviews}+ reviews
            </span>
          </div>
          {/* Price aligned at bottom */}
          <p className="text-lg font-bold text-foreground mt-auto">
            {formatPrice(price.toString())}
          </p>
        </div>
      </Link>
      <div className="mt-4 md:hidden">
        <Button size="sm" className="w-full" variant="secondary">
          Quick add
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-x-4 bottom-4 hidden md:block">
        <Button
          size="sm"
          className="w-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Quick add
        </Button>
      </div>
    </div>
  );
}

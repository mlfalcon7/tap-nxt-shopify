"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PatchBadge, TapSeal } from "@/components/patriotism";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ProductCard } from "@/components/product/product-card";
import { StickyAddToCart } from "@/components/product/sticky-add-to-cart";
import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";

type ProductDetailProps = {
  product: Product;
  recommendations: Product[];
  latestReport?: {
    id: string;
    runId: string;
    date: string;
  };
};

export function ProductDetail({ product, recommendations, latestReport }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);

  // Track product view
  useEffect(() => {
    trackEvent("view_product", {
      product_id: product.id,
      product_name: product.title,
      price: product.price,
      category: product.category,
    });
  }, [product]);

  return (
    <>
      <div className="space-y-16 pb-20 lg:pb-0">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-sm border border-[var(--border-strong)] bg-surface-strong">
            <Image
              src={product.gallery[activeImage]?.src ?? product.image.src}
              alt={product.gallery[activeImage]?.alt ?? product.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              <PatchBadge variant={product.badges[0]} />
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--action-band-text)] bg-[color-mix(in_srgb,var(--action-band-bg)_75%,transparent)] px-2 py-1">
                Made in USA
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.gallery.map((image, index) => (
              <button
                type="button"
                key={`${product.id}-thumb-${image.src}`}
                onClick={() => setActiveImage(index)}
                className={`relative aspect-square overflow-hidden border ${activeImage === index ? "border-[var(--accent)]" : "border-[var(--border)]"}`}
              >
                <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="100px" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <TapSeal label="TAP Certified Safety" detail="US Protocol" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent-secondary)]">
              {product.category}
            </p>
            <h1 className="h1 text-foreground mt-2">{product.title}</h1>
            <p className="text-lg text-muted-foreground">{product.description}</p>
          </div>
          <p className="text-3xl font-semibold text-foreground">
            {formatPrice(product.price.toString())}
          </p>
          <TrustStrip
            points={[
              "Designed & Engineered in USA",
              "Impact ledger enclosed",
              "Lifetime Hero Guarantee",
            ]}
            className="text-[var(--text-secondary)]"
          />
          <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                className="flex-1 h-14 text-base"
                onClick={() => {
                  trackEvent("add_to_cart", {
                    product_id: product.id,
                    product_name: product.title,
                    price: product.price,
                  });
                }}
              >
                Add to kit
              </Button>
              <Button variant="outline" className="flex-1 h-14 text-base">
                Download spec sheet
              </Button>
            </div>
            <TrustStrip
              points={[
                "Free shipping",
                "Lifetime Hero Guarantee",
                "TAP Certified Safety",
              ]}
              compact
              className="text-sm text-muted-foreground justify-center"
            />
          </div>
          <div className="grid gap-4 rounded-sm border border-[var(--border)] bg-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Mission Specs
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <li key={spec} className="text-sm text-foreground">
                  • {spec}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((material) => (
                <span
                  key={material}
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Impact Receipt Preview */}
      <div className="rounded-sm border border-[var(--border)] bg-surface-strong p-6 space-y-3">
        <p className="eyebrow text-[var(--accent-secondary)]">Impact Receipt Preview</p>
        <p className="text-base text-foreground">
          This purchase funds <strong>${((product.price * 0.02).toFixed(2))}</strong> (2% for the Pack) toward K9 safety grants, shelter audits, and veteran stipends.
        </p>
        <p className="text-sm text-muted-foreground">
          Your impact receipt will be included with your order and logged in our quarterly Impact Ledger.
        </p>
      </div>

      {/* Traceable Components Module */}
      <div className="rounded-sm border border-[var(--border)] bg-surface p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow text-muted-foreground">Traceable Components</p>
            <h3 className="text-lg font-semibold mt-1">Equipment Spec Sheet</h3>
          </div>
          <Link href="/us-protocol/traceability" className="text-sm font-semibold text-link hover:underline">
            Learn more →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-semibold">Serialized Components</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Hardware (buckles, D-rings, clasps) — Laser-etched serial numbers</li>
              <li>• Reflective panels — Batch codes embedded</li>
              <li>• Textile batches — Lot numbers on material tags</li>
              <li>• Stitching batches — Thread lot codes recorded</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Traceability System</p>
            <p className="text-sm text-muted-foreground">
              All components are logged in the TAP registry within 2 hours of production. Your product's
              serial number (found on the tag) can be used to trace its entire production history.
            </p>
          </div>
        </div>
      </div>

      {/* Field Testing Module */}
      <div className="rounded-sm border border-[var(--border)] bg-surface p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow text-muted-foreground">Field Testing</p>
            <h3 className="text-lg font-semibold mt-1">Lab Locations & Tests</h3>
          </div>
          <Link href="/us-protocol/testing" className="text-sm font-semibold text-link hover:underline">
            View testing standards →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-semibold">Testing Labs</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Colorado Testing Lab — Thermal, impact, UV stability</li>
              <li>• North Carolina Testing Lab — Abrasion, water immersion</li>
              <li>• Multiple Municipal K9 Units — Field trials</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Tests Performed</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Thermal testing (-20°F to 140°F)</li>
              <li>• 10,000+ abrasion cycles</li>
              <li>• Impact & tensile strength to failure</li>
              <li>• 1,000+ water immersion cycles</li>
            </ul>
          </div>
        </div>
      </div>

      {/* US Protocol Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="eyebrow text-muted-foreground">
            US Protocol Certification
          </p>
          <div className="flex items-center gap-4">
            <Link href="/us-protocol" className="text-sm font-semibold text-link hover:underline">
              Learn about US Protocol →
            </Link>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {product.protocols.map((protocol) => (
            <div
              key={`${product.id}-${protocol.title}`}
              className="rounded-sm border border-[var(--border)] bg-surface p-6 shadow-[0_15px_40px_rgba(11,16,32,0.08)]"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent-secondary)]">
                {protocol.title}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{protocol.detail}</p>
            </div>
          ))}
        </div>
        {latestReport && (
          <div className="rounded-sm border border-[var(--border)] bg-surface-strong p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold mb-1">Latest Test Report</p>
                <p className="text-sm text-muted-foreground">
                  Run ID: {latestReport.runId} • {new Date(latestReport.date).toLocaleDateString()}
                </p>
              </div>
              <Link href={`/us-protocol/reports/${latestReport.id}`}>
                <Button variant="outline" size="sm" onClick={() => {
                  trackEvent("view_protocol_report", {
                    report_id: latestReport.id,
                    product_slug: product.handle,
                  });
                }}>
                  View Report
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Specs, Materials, Care, Warranty */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-sm border border-[var(--border)] bg-surface p-6">
          <p className="eyebrow text-muted-foreground">Materials & Care</p>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold mb-2">Materials</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {product.materials.map((material) => (
                  <li key={material}>• {material}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Care Instructions</p>
              <p className="text-sm text-muted-foreground">
                Machine wash cold, gentle cycle. Air dry. Do not bleach. For detailed care instructions, see included care card.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-sm border border-[var(--border)] bg-surface p-6">
          <p className="eyebrow text-muted-foreground">Warranty & Guarantee</p>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold mb-2">Lifetime Hero Guarantee</p>
              <p className="text-sm text-muted-foreground">
                If this gear ever fails in the field, we'll repair, replace, or refund. No questions asked. Contact our 24-hour safety desk.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Traceability</p>
              <p className="text-sm text-muted-foreground">
                Every component is serialized and logged in our TAP ledger for rapid recall and accountability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow text-muted-foreground">Reviews</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Write a Review
          </Button>
        </div>
        <div className="space-y-4 rounded-sm border border-[var(--border)] bg-surface p-6">
          <p className="text-sm text-muted-foreground italic">
            Review display coming soon. In the meantime, all reviews are verified through our handler advisory council.
          </p>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Recommended Gear
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {recommendations.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
      </div>
      <StickyAddToCart product={product} />
    </>
  );
}

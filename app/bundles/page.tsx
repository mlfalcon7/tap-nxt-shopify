import Link from "next/link";
import Image from "next/image";
import { TapSeal, PatriotRule } from "@/components/patriotism";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { bundles } from "@/data/bundles";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Bundles & Starter Packs",
  description: "Complete gear kits that save you money and cover all mission essentials.",
  alternates: {
    canonical: "/bundles",
  },
};

export default function BundlesPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="container-width py-16 space-y-8">
        <div className="space-y-4 max-w-3xl">
          <TapSeal label="Bundles" detail="Starter Packs" />
          <h1 className="h1">Complete Kits, Complete Savings</h1>
          <p className="text-lg text-muted-foreground">
            Every bundle is mission-tested and designed to cover all essentials. Save 15% when you buy the complete kit.
          </p>
        </div>

        <PatriotRule label="Available Bundles" className="container-width" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bundles.map((bundle) => (
            <Link
              key={bundle.slug}
              href={`/bundles/${bundle.slug}`}
              className="group border border-[var(--border)] bg-surface rounded-sm overflow-hidden hover:border-[var(--border-strong)] transition-all duration-150"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-strong">
                <Image
                  src={bundle.image}
                  alt={bundle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 text-sm font-semibold">
                  Save {bundle.savings}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {bundle.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{bundle.description}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground">Includes:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {bundle.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[var(--accent-secondary)]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                  <div>
                    <p className="text-2xl font-semibold">{formatPrice(bundle.price.toString())}</p>
                    <p className="text-xs text-muted-foreground">Save {bundle.savings}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Bundle
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}



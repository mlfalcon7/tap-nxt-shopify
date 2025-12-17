"use client";

import { useState } from "react";
import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/data/products";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

export default function FitWizardPage() {
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [chest, setChest] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [hasResults, setHasResults] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    trackEvent("use_tool", {
      tool_name: "fit_wizard",
      breed,
      weight,
      chest,
    });

    // Simple recommendation logic - in production, this would be more sophisticated
    const weightNum = parseFloat(weight);
    const chestNum = parseFloat(chest);
    
    let recommended: typeof products = [];
    
    // Size recommendations based on weight and chest
    if (weightNum && chestNum) {
      if (weightNum < 20 && chestNum < 16) {
        recommended = products.filter((p) => p.category === "Collars" || p.category === "Leashes");
      } else if (weightNum < 50 && chestNum < 24) {
        recommended = products.filter((p) => p.category === "Harnesses" || p.category === "Collars");
      } else {
        recommended = products.filter((p) => p.category === "Vests" || p.category === "Harnesses");
      }
    }
    
    setRecommendations(recommended.slice(0, 3));
    setHasResults(true);
    
    trackEvent("tool_recommendation_click", {
      tool_name: "fit_wizard",
      recommendations_count: recommended.length,
    });
  }

  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Fit Wizard" }]} />
      <section className="container-width py-16 space-y-12 max-w-4xl">
        <div className="space-y-6">
          <TapSeal label="Fit Wizard" detail="Size Recommendation Tool" />
          <h1 className="h1">Find the Perfect Fit</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Enter your dog's measurements and we'll recommend the right size and products. This tool helps
            ensure your gear fits correctly for maximum safety and comfort.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label htmlFor="breed" className="block text-sm font-semibold mb-2">
                Breed (Optional)
              </label>
              <input
                type="text"
                id="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g., German Shepherd"
                className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-semibold mb-2">
                Weight (lbs) *
              </label>
              <input
                type="number"
                id="weight"
                required
                min="1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 45"
                className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="chest" className="block text-sm font-semibold mb-2">
                Chest Girth (inches) *
              </label>
              <input
                type="number"
                id="chest"
                required
                min="1"
                value={chest}
                onChange={(e) => setChest(e.target.value)}
                placeholder="e.g., 22"
                className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Get Recommendations
          </Button>
        </form>

        {hasResults && (
          <div className="space-y-6 border-t border-[var(--border)] pt-12">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Recommended Products</h2>
              <p className="text-muted-foreground">
                Based on your dog's measurements, here are products that should fit well.
              </p>
            </div>
            {recommendations.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-3">
                {recommendations.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No specific recommendations. Browse our full catalog.</p>
                <Link href="/shop">
                  <Button variant="outline" className="mt-4">View All Products</Button>
                </Link>
              </div>
            )}
            <div className="rounded-sm border border-[var(--border)] bg-surface-strong p-6">
              <p className="text-sm font-semibold mb-2">Fit Tips</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Measure your dog's chest at the widest point, just behind the front legs</li>
                <li>• For harnesses, add 2-3 inches to chest measurement for comfort</li>
                <li>• Collars should allow 2 fingers between collar and neck</li>
                <li>• If between sizes, choose the larger size for growing dogs</li>
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}



"use client";

import { useState } from "react";
import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/data/products";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

export default function LeashFinderPage() {
  const [weight, setWeight] = useState("");
  const [pullLevel, setPullLevel] = useState<"light" | "moderate" | "strong" | "">("");
  const [environment, setEnvironment] = useState<"urban" | "trail" | "field" | "">("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [hasResults, setHasResults] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    trackEvent("use_tool", {
      tool_name: "leash_finder",
      weight,
      pull_level: pullLevel,
      environment,
    });

    // Simple recommendation logic
    const weightNum = parseFloat(weight);
    let recommended: typeof products = [];
    
    // Filter to leashes
    const leashes = products.filter((p) => p.category === "Leashes");
    
    if (weightNum && pullLevel && environment) {
      // Strong pullers need heavier-duty leashes
      if (pullLevel === "strong" || weightNum > 60) {
        recommended = leashes.filter((p) => p.handle.includes("hero") || p.badges.includes("US_PROTOCOL"));
      } else if (environment === "field" || environment === "trail") {
        recommended = leashes.filter((p) => p.tags?.includes("field") || p.tags?.includes("adventure"));
      } else {
        recommended = leashes;
      }
    }
    
    setRecommendations(recommended.slice(0, 3));
    setHasResults(true);
    
    trackEvent("tool_recommendation_click", {
      tool_name: "leash_finder",
      recommendations_count: recommended.length,
    });
  }

  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Leash Finder" }]} />
      <section className="container-width py-16 space-y-12 max-w-4xl">
        <div className="space-y-6">
          <TapSeal label="Leash Finder" detail="Product Recommendation Tool" />
          <h1 className="h1">Find the Right Leash</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Answer a few questions about your dog and their walking style, and we'll recommend the best
            leash for their needs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="weight" className="block text-sm font-semibold mb-2">
              Dog's Weight (lbs) *
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
            <label htmlFor="pullLevel" className="block text-sm font-semibold mb-2">
              Pull Level *
            </label>
            <select
              id="pullLevel"
              required
              value={pullLevel}
              onChange={(e) => setPullLevel(e.target.value as any)}
              className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="light">Light - Walks calmly on leash</option>
              <option value="moderate">Moderate - Occasional pulling</option>
              <option value="strong">Strong - Heavy puller</option>
            </select>
          </div>

          <div>
            <label htmlFor="environment" className="block text-sm font-semibold mb-2">
              Primary Environment *
            </label>
            <select
              id="environment"
              required
              value={environment}
              onChange={(e) => setEnvironment(e.target.value as any)}
              className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="urban">Urban - City streets, sidewalks</option>
              <option value="trail">Trail - Hiking, nature walks</option>
              <option value="field">Field - Open spaces, training</option>
            </select>
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Find My Leash
          </Button>
        </form>

        {hasResults && (
          <div className="space-y-6 border-t border-[var(--border)] pt-12">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Recommended Leashes</h2>
              <p className="text-muted-foreground">
                Based on your dog's profile, here are leashes that match their needs.
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
                <p className="text-muted-foreground">Browse our full leash collection.</p>
                <Link href="/shop?category=Leashes">
                  <Button variant="outline" className="mt-4">View All Leashes</Button>
                </Link>
              </div>
            )}
            <div className="rounded-sm border border-[var(--border)] bg-surface-strong p-6">
              <p className="text-sm font-semibold mb-2">Leash Safety Tips</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• For strong pullers, consider a harness instead of just a collar</li>
                <li>• Reflective leashes are essential for night walks</li>
                <li>• Check leash strength rating matches your dog's weight and pull force</li>
                <li>• Replace leashes if you notice fraying or wear</li>
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}



"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TapSeal, PatriotRule } from "@/components/patriotism";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Heart, Dog } from "lucide-react";
import { campaigns } from "@/lib/campaigns";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";

type MissionType = "all" | "service-dog" | "rescue-family" | "k9-unit";

const missionActions = {
  "service-dog": [
    { title: "Sign the Pet Safety Pledge", href: "/manifesto", icon: ShieldCheck },
    { title: "Join Service Dog Access Training", href: "/learn/service-dog-access", icon: Dog },
    { title: "Find a Certified Partner", href: "/find-a-partner", icon: Heart },
  ],
  "rescue-family": [
    { title: "Fund a Vest for a Rescue Hero", href: "/fund-a-vest", icon: Heart },
    { title: "Read Rescue to Royalty Stories", href: "/stories", icon: Dog },
    { title: "Join Pack Walks & Meetups", href: "/campaigns", icon: ShieldCheck },
  ],
  "k9-unit": [
    { title: "View K9 Deployment Kits", href: "/shop?category=K9", icon: ShieldCheck },
    { title: "See US Protocol Testing", href: "/us-protocol", icon: ShieldCheck },
    { title: "Connect with K9 Partners", href: "/find-a-partner?type=k9", icon: Heart },
  ],
  all: [
    { title: "Sign the Pet Safety Pledge", href: "/manifesto", icon: ShieldCheck },
    { title: "Fund a Vest", href: "/fund-a-vest", icon: Heart },
    { title: "Join Pack Walks", href: "/campaigns", icon: Dog },
    { title: "Find a Partner", href: "/find-a-partner", icon: Heart },
  ],
};

const missionGear = {
  "service-dog": products.filter((p) => p.tags?.includes("service") || p.category === "Collars" || p.category === "Harnesses").slice(0, 3),
  "rescue-family": products.filter((p) => p.tags?.includes("rescue") || p.category === "Collars" || p.category === "Leashes").slice(0, 3),
  "k9-unit": products.filter((p) => p.tags?.includes("k9") || p.category === "Vests" || p.category === "Harnesses").slice(0, 3),
  all: products.slice(0, 6),
};

export default function ActionCenterPage() {
  const [selectedMission, setSelectedMission] = useState<MissionType>("all");

  const currentActions = useMemo(() => missionActions[selectedMission], [selectedMission]);
  const currentGear = useMemo(() => missionGear[selectedMission], [selectedMission]);

  return (
    <div className="bg-background text-foreground">
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <TapSeal label="Action Center" detail="Choose Your Mission" className="justify-center" />
          <h1 className="h1">The Heart of the Movement</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Every hero needs support. Choose your mission and find the actions, gear, and community that matches your commitment.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {(["all", "service-dog", "rescue-family", "k9-unit"] as MissionType[]).map((mission) => (
            <button
              key={mission}
              onClick={() => setSelectedMission(mission)}
              className={`px-6 py-3 text-base font-semibold rounded-sm border-2 transition-all ${
                selectedMission === mission
                  ? "border-[var(--accent-secondary)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] text-[var(--accent-secondary)]"
                  : "border-[var(--border)] bg-surface hover:border-[var(--border-strong)] text-foreground"
              }`}
            >
              {mission === "all" ? "All Missions" : mission === "service-dog" ? "Service Dogs" : mission === "rescue-family" ? "Rescue Families" : "K9 Units"}
            </button>
          ))}
        </div>

        <PatriotRule label="Act Now" className="container-width" />

        <div className="grid gap-6 md:grid-cols-3">
          {currentActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-start gap-4 rounded-sm border-2 border-[var(--border)] bg-surface p-6 hover:border-[var(--accent-secondary)] hover:shadow-lg transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--accent-secondary)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] text-[var(--accent-secondary)] flex-shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--accent-secondary)] transition-colors">
                    {action.title}
                  </h3>
                  <div className="flex items-center text-sm font-semibold text-link group-hover:gap-2 transition-all">
                    Take action
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <PatriotRule label="Suggested Gear" className="container-width" />

        <div className="grid gap-6 md:grid-cols-3">
          {currentGear.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="rounded-sm border-2 border-[var(--border-strong)] bg-surface-strong p-8 text-center space-y-4">
          <h2 className="text-2xl font-semibold">What You Can Do Now</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Join the movement. Sign the manifesto, fund a vest, or connect with partners in your area. Every action supports the mission.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/manifesto">
              <Button size="lg">Sign the Manifesto</Button>
            </Link>
            <Link href="/impact-ledger">
              <Button variant="outline" size="lg">See the Impact</Button>
            </Link>
            <Link href="/find-a-partner">
              <Button variant="outline" size="lg">Find a Partner</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


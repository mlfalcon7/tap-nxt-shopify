"use client";

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { TapSeal, PatriotRule } from "@/components/patriotism";
import { Button } from "@/components/ui/button";
import { getApprovedHeroes, type HeroRole } from "@/lib/data/heroes";
import { ArrowRight } from "lucide-react";

export default function HeroesPage() {
  const allHeroes = useMemo(() => getApprovedHeroes(), []);
  const [selectedRole, setSelectedRole] = useState<HeroRole | "all">("all");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredHeroes = useMemo(() => {
    let filtered = [...allHeroes];
    
    if (selectedRole !== "all") {
      filtered = filtered.filter((hero) => hero.role === selectedRole);
    }
    
    if (locationFilter) {
      filtered = filtered.filter((hero) =>
        hero.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    return filtered;
  }, [allHeroes, selectedRole, locationFilter]);

  const roles: { value: HeroRole | "all"; label: string }[] = [
    { value: "all", label: "All Heroes" },
    { value: "service", label: "Service Dogs" },
    { value: "rescue", label: "Rescue Heroes" },
    { value: "k9", label: "K9 Units" },
    { value: "therapy", label: "Therapy Dogs" },
    { value: "family", label: "Family Heroes" },
  ];

  return (
    <div className="bg-background text-foreground">
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <TapSeal label="Hero Registry" detail="Community Profiles" />
          <h1 className="h1">Meet the Heroes</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Real dogs, real missions, real stories. Every hero in our registry is verified and shares how
            TAP gear supports their work.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`px-4 py-2 text-sm font-medium rounded-sm border transition-colors ${
                  selectedRole === role.value
                    ? "border-[var(--accent-secondary)] bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)]"
                    : "border-[var(--border)] bg-surface hover:bg-surface-strong text-muted-foreground"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 text-sm border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <PatriotRule label="Hero Profiles" className="container-width" />

        {filteredHeroes.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-muted-foreground">No heroes found matching your filters.</p>
            <Link href="/heroes/submit">
              <Button variant="outline">Nominate a Hero</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredHeroes.map((hero) => (
              <Link
                key={hero.slug}
                href={`/heroes/${hero.slug}`}
                className="group border border-[var(--border)] bg-surface rounded-sm overflow-hidden hover:border-[var(--border-strong)] transition-all duration-150"
              >
                {hero.photos[0] && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-strong">
                    <Image
                      src={hero.photos[0].src}
                      alt={hero.photos[0].alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-[var(--accent-secondary)] transition-colors">
                      {hero.dogName}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">{hero.role} • {hero.location}</p>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{hero.story}</p>
                  {hero.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {hero.badges.map((badge) => (
                        <span
                          key={badge}
                          className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-secondary)]"
                        >
                          {badge.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center text-sm font-semibold text-link group-hover:gap-2 transition-all pt-2">
                    Read story
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center pt-8 border-t border-[var(--border)]">
          <p className="text-muted-foreground mb-4">Know a hero who should be featured?</p>
          <Link href="/heroes/submit">
            <Button size="lg">Nominate a Hero</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}


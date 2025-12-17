import Image from "next/image";
import Link from "next/link";
import { getHeroPosts } from "@/lib/heroes";
import { TAPStamp } from "@/components/brand";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

const stampLabels: Record<string, string> = {
  Everyday: "HOME HERO",
  Rescue: "RESCUE HERO",
  Service: "SERVICE HERO",
  K9: "K9 HERO",
  Historical: "HISTORICAL HERO",
};

export async function HeroDispatches() {
  const heroes = await getHeroPosts();
  const featuredHeroes = heroes.slice(0, 6);

  if (featuredHeroes.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-background py-20">
      <div className="container-width space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="eyebrow text-muted-foreground">Hero Dispatches</p>
          <h2 className="h2">Stories from the Hall of Heroes</h2>
          <p className="text-lg text-muted-foreground">
            Every dog has a mission. These are the stories of heroes—everyday, service, rescue, and working—who prove that gear matters.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredHeroes.map((hero) => (
            <Link
              key={hero.slug}
              href={`/hall-of-heroes/${hero.slug}`}
              className="group border border-[var(--border)] bg-surface rounded-sm overflow-hidden hover:border-[var(--border-strong)] transition-all duration-150"
            >
              {hero.image && (
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-strong">
                  <Image
                    src={hero.image}
                    alt={hero.heroName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <TAPStamp
                      label={stampLabels[hero.heroType] || "HERO"}
                      variant="small"
                      className="bg-[color-mix(in_srgb,var(--action-band-bg)_55%,transparent)] border-[color-mix(in_srgb,var(--action-band-text)_35%,transparent)] text-[var(--action-band-text)]"
                    />
                  </div>
                </div>
              )}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--accent-secondary)] transition-colors">
                    {hero.heroName}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{hero.excerpt}</p>
                </div>
                <div className="flex items-center text-sm font-semibold text-[var(--accent-secondary)] group-hover:gap-2 transition-all">
                  Read Story
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <ButtonLink href="/hall-of-heroes" variant="link" className="text-base font-semibold">
            View All Heroes →
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

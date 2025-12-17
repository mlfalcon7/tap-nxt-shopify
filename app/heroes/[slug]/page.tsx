import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { getHeroBySlug, getHeroesByGear } from "@/lib/data/heroes";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/data/products";
import { buildCanonical } from "@/lib/utils";
import { publicEnv } from "@/lib/env";
import { HeroViewTracker } from "./hero-view-tracker";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { getApprovedHeroes } = await import("@/lib/data/heroes");
  return getApprovedHeroes().map((hero) => ({ slug: hero.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const hero = getHeroBySlug(slug);
  if (!hero) return {};
  return {
    title: `${hero.dogName} — Hero Profile`,
    description: hero.story,
    alternates: {
      canonical: buildCanonical(`/heroes/${hero.slug}`, publicEnv.siteUrl),
    },
  };
}

export default async function HeroProfilePage({ params }: Props) {
  const { slug } = await params;
  const hero = getHeroBySlug(slug);

  if (!hero || hero.status !== "approved") {
    notFound();
  }

  // Get related products
  const relatedProducts = products.filter((p) => hero.gearOwned.includes(p.handle));

  // Get other heroes using the same gear
  const relatedHeroes = getHeroesByGear(hero.gearOwned[0] || "").filter((h) => h.slug !== hero.slug).slice(0, 3);

  return (
    <div className="bg-background text-foreground">
      <HeroViewTracker heroSlug={hero.slug} heroName={hero.dogName} />
      <Breadcrumbs
        items={[
          { label: "Heroes", href: "/heroes" },
          { label: hero.dogName },
        ]}
      />
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6">
          <TapSeal label={hero.dogName} detail="Hero Profile" />
          <div className="flex flex-col md:flex-row gap-8">
            {hero.photos[0] && (
              <div className="relative aspect-square w-full md:w-96 flex-shrink-0 rounded-sm border border-[var(--border)] overflow-hidden bg-surface-strong">
                <Image
                  src={hero.photos[0].src}
                  alt={hero.photos[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            )}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="h1">{hero.dogName}</h1>
                {hero.handlerName && (
                  <p className="text-lg text-muted-foreground">Handler: {hero.handlerName}</p>
                )}
                <p className="text-base text-muted-foreground capitalize mt-2">
                  {hero.role} • {hero.location}
                </p>
              </div>
              {hero.badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {hero.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent-secondary)] border border-[var(--accent-secondary)] rounded-full"
                    >
                      {badge.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Their Story</h2>
          <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
            {hero.story}
          </p>
        </div>

        {hero.gearOwned.length > 0 && (
          <div className="space-y-6 border-t border-[var(--border)] pt-12">
            <div>
              <p className="eyebrow text-muted-foreground">Gear in Use</p>
              <h2 className="text-2xl font-semibold mt-2">TAP Equipment</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {hero.fitNotes && (
              <div className="rounded-sm border border-[var(--border)] bg-surface-strong p-6">
                <p className="text-sm font-semibold mb-2">Fit Notes</p>
                <p className="text-sm text-muted-foreground">{hero.fitNotes}</p>
              </div>
            )}
          </div>
        )}

        {relatedHeroes.length > 0 && (
          <div className="space-y-6 border-t border-[var(--border)] pt-12">
            <div>
              <p className="eyebrow text-muted-foreground">Related Heroes</p>
              <h2 className="text-2xl font-semibold mt-2">Other Heroes Using This Gear</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedHeroes.map((relatedHero) => (
                <Link
                  key={relatedHero.slug}
                  href={`/heroes/${relatedHero.slug}`}
                  className="group border border-[var(--border)] bg-surface rounded-sm p-6 space-y-3 hover:border-[var(--border-strong)] transition-all"
                >
                  <h3 className="text-lg font-semibold group-hover:text-[var(--accent-secondary)] transition-colors">
                    {relatedHero.dogName}
                  </h3>
                  <p className="text-sm text-muted-foreground capitalize">{relatedHero.role} • {relatedHero.location}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}


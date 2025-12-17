import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/hero";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getStories, type Story } from "@/lib/mdx";
import { PatriotRule, TapSeal } from "@/components/patriotism";
import { products as productData, type Product } from "@/data/products";
import { impactReceipts, safetyProofs } from "@/data/impact";
import { ProductCard } from "@/components/product/product-card";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { ShopByMission } from "@/components/shop/shop-by-mission";
import { WhyTAPCostsMore } from "@/components/shop/why-tap-costs-more";
import { HeroDispatches } from "@/components/sections/hero-dispatches";
import { rightsCharterCards } from "@/lib/brandCopy";
import { ButtonLink } from "@/components/ui/button-link";

export default async function Home() {
  const stories = await getStories();
  const allProducts = productData;
  const featuredProducts = allProducts.slice(0, 6);
  const bestSellers = allProducts.filter((p) => p.rating >= 4.5).slice(0, 3);
  const bundles = allProducts.filter((p) => p.tags?.includes("bundle")).slice(0, 3);

  return (
    <div className="flex flex-col bg-background">
      {/* A) Hero */}
      <Hero />
      <HeritageBand />
      
      {/* C) Rights Charter */}
      <PatriotRule label="Rights Charter" />
      <RightsSection />
      
      {/* D) Best Sellers */}
      {bestSellers.length > 0 && (
        <>
          <PatriotRule label="Best Sellers" />
          <BestSellers products={bestSellers} />
        </>
      )}
      
      {/* D) Essential Gear */}
      {featuredProducts.length > 0 && (
        <>
          <PatriotRule label="Essential Gear" />
          <FeaturedProducts products={featuredProducts} />
        </>
      )}
      
      {/* D) Starter Packs & Bundles */}
      {bundles.length > 0 && (
        <>
          <PatriotRule label="Starter Packs & Bundles" />
          <BundlesSection products={bundles} />
        </>
      )}
      
      {/* E) Shop by Mission */}
      <PatriotRule label="Shop by Mission" />
      <ShopByMission />
      
      {/* F) Why It Costs More */}
      <PatriotRule label="Why TAP Costs More" />
      <WhyTAPCostsMore />
      
      {/* Hero Dispatches */}
      <PatriotRule label="Hall Dispatches" />
      <HeroDispatches />
      
      {/* Stories */}
      <section className="relative bg-surface-strong py-20">
        <PatriotRule label="Stories" />
        <StoriesTeaser stories={stories.slice(0, 2)} />
      </section>
      
      {/* Impact Ledger */}
      <PatriotRule label="Impact Ledger" />
      <ImpactModule id="impact" />
      
      {/* Safety Protocol */}
      <PatriotRule label="Safety Protocol" />
      <SafetyProtocol id="traceability" />
      
      {/* Trust Badges */}
      <TrustBadges />
    </div>
  );
}

function HeritageBand() {
  const items = [
    "Designed & engineered in the USA",
    "Protocol-tested safety standards",
    "Impact baked into every order",
  ] as const;

  return (
    <section className="border-y border-[var(--border)] bg-surface py-8 heritage-stripe">
      <div className="container-width">
        <div className="grid gap-4 text-center sm:grid-cols-3">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--text-secondary)]"
            >
              <span className="text-[var(--accent-secondary)]" aria-hidden>
                ★
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RightsSection() {
  return (
    <Section>
      <div className="grid gap-8 md:grid-cols-3">
        {rightsCharterCards.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Card key={pillar.title} className="flex flex-col gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--accent-secondary)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] text-[var(--accent-secondary)]">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{pillar.title}</h3>
              <p className="text-base leading-relaxed text-muted-foreground">{pillar.description}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  
  // If less than 3 items, use featured layout (2 columns max)
  const gridCols = products.length < 3 ? "md:grid-cols-2" : "md:grid-cols-3";
  
  return (
    <Section>
      <div className="space-y-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="h2">Essential Gear</h2>
            <p className="text-muted-foreground">Mission modules that build the Hero Starter Pack.</p>
          </div>
          <Link href="/shop" className="hidden items-center text-link font-semibold hover:underline md:inline-flex">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className={`grid grid-cols-1 gap-8 ${gridCols}`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center md:hidden">
          <ButtonLink href="/shop" variant="outline">
            Shop all gear
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

function StoriesTeaser({ stories }: { stories: Story[] }) {
  return (
    <section className="bg-surface-strong py-20">
      <div className="container-width space-y-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="h2">Stories from the Hall</h2>
            <p className="text-muted-foreground">Docs and manifestos fueling the Hero movement.</p>
          </div>
          <Link href="/stories" className="text-sm font-semibold text-link hover:underline">
            Read all stories
          </Link>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {stories.map((story) => (
            <Link
              key={story.frontmatter.slug}
              href={`/stories/${story.frontmatter.slug}`}
              className="group flex flex-col gap-4 rounded-sm border border-[var(--border)] bg-surface p-6 shadow-[0_18px_45px_rgba(11,16,32,0.08)] transition-all hover:-translate-y-1 hover:border-[var(--border-strong)]"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {new Date(story.frontmatter.date).toLocaleDateString()}
              </p>
              <h3 className="text-3xl font-semibold leading-tight text-foreground transition-colors group-hover:text-accent">
                {story.frontmatter.title}
              </h3>
              <p className="text-base text-muted-foreground">{story.frontmatter.excerpt}</p>
              <span className="text-sm font-semibold text-link hover:underline">Read Mission Log →</span>
              <span className="h-px w-full border-t border-dashed border-[var(--border)] opacity-60 transition-colors group-hover:border-[var(--accent-secondary)]" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactModule({ id }: { id?: string }) {
  return (
    <section id={id} className="bg-background py-20">
      <div className="container-width grid items-center gap-12 md:grid-cols-2">
        <div
          className="relative min-h-[320px] overflow-hidden rounded-sm border border-[var(--border-strong)]"
          style={{
            boxShadow: "0 35px 75px color-mix(in srgb,var(--secondary) 15%,transparent)",
          }}
        >
          <Image
            src="/placeholders/impact.jpg"
            alt="Handlers supporting dogs in the field"
            fill
            className="object-cover"
          />
        </div>
        <div
          className="space-y-5 rounded-sm border border-[var(--border)] bg-surface p-10"
          style={{
            boxShadow: "0 30px 65px color-mix(in srgb,var(--secondary) 12%,transparent)",
          }}
        >
          <TapSeal label="Impact Ledger" detail="2% for the Pack" />
          <h2 className="h2 text-foreground">2% for the Pack</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Every order funds grants for rescues, K9 units, and safety audits across the country. Impact receipts break
            down the mission mileage of every purchase.
          </p>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            Quarterly reports show where every dollar goes.
          </p>
          <div className="space-y-3 rounded-sm border border-dashed border-[var(--border-strong)] bg-surface-strong p-4">
            {impactReceipts.map((entry) => (
              <div key={entry.title} className="flex items-center justify-between gap-4 text-sm">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                    {entry.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{entry.detail}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-foreground">{entry.amount}</span>
                  <span className="ml-3 inline-flex items-center rounded-full border border-[var(--border)] px-2 py-[2px] text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                    {entry.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <ButtonLink href="/impact" variant="outline">
            See the ledger
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function SafetyProtocol({ id }: { id?: string }) {
  const safetyChecks = [
    {
      title: "Certified Field Testing",
      copy: "Thermal, abrasion, and impact labs in CO + NC vet every textile before it reaches trail or tarmac.",
    },
    {
      title: "Handler Advisory Council",
      copy: "Veterans, K9 handlers, and rescue leads stress test every run with live dogs before launch.",
    },
    {
      title: "Traceable Components",
      copy: "Every buckle, stitch, and reflective panel is serialized for rapid recall and accountability.",
    },
    {
      title: "24-Hour Safety Desk",
      copy: "If gear ever fails, a real human answers in under a day with repair, replace, or refund.",
    },
  ];

  return (
    <section id={id} className="bg-[var(--action-band-bg)] py-20 text-[var(--action-band-text)]">
      <div className="container-width grid gap-12 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-1">
          <TapSeal label="TAP Certified" detail="US Protocol" tone="dark" />
          <p className="text-sm font-semibold uppercase tracking-wide text-[color-mix(in_srgb,var(--action-band-text) 75%,transparent)]">
            Engineering American, Global Standard
          </p>
          <h2 className="h2 text-[var(--action-band-text)]">Safety is the protocol, not the campaign.</h2>
          <p className="text-base leading-relaxed text-[color-mix(in_srgb,var(--action-band-text)_70%,transparent)]">
            From sourcing to final inspection, every Hero Starter Pack is graded against the same standards trusted by
            working K9 units coast-to-coast.
          </p>
          <ul className="space-y-2 text-sm text-[color-mix(in_srgb,var(--action-band-text)_80%,transparent)]">
            {safetyProofs.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-[var(--accent-secondary)]" aria-hidden>
                  ★
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" className="inline-flex items-center text-sm font-semibold text-[var(--accent)] hover:underline">
            See testing standard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
          {safetyChecks.map((item) => (
            <div
              key={item.title}
              className="space-y-3 rounded-sm border border-[color-mix(in_srgb,var(--action-band-text)_30%,transparent)] bg-[color-mix(in_srgb,var(--action-band-bg)_15%,transparent)] p-6 text-left"
              style={{
                boxShadow: "0 25px 60px rgba(7,10,16,0.45)",
              }}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent-secondary)]">
                US Protocol
              </p>
              <h3 className="text-lg font-semibold text-[var(--action-band-text)]">{item.title}</h3>
              <p className="text-sm text-[color-mix(in_srgb,var(--action-band-text)_80%,transparent)]">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellers({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  
  // If less than 3 items, use featured layout (2 columns max)
  const gridCols = products.length < 3 ? "md:grid-cols-2" : "md:grid-cols-3";
  
  return (
    <Section>
      <div className="space-y-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="h2">Best Sellers</h2>
            <p className="text-muted-foreground">Hero-tested gear with the highest ratings from handlers and families.</p>
          </div>
          <Link href="/shop" className="hidden items-center text-link font-semibold hover:underline md:inline-flex">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className={`grid grid-cols-1 gap-8 ${gridCols}`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function BundlesSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  
  // If less than 3 items, use featured layout (2 columns max)
  const gridCols = products.length < 3 ? "md:grid-cols-2" : "md:grid-cols-3";
  
  return (
    <Section tone="muted">
      <div className="space-y-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="h2">Starter Packs & Bundles</h2>
            <p className="text-muted-foreground">Complete kits that save you 15% and cover all mission essentials.</p>
          </div>
          <Link href="/bundles/hero-starter-pack" className="hidden items-center text-link font-semibold hover:underline md:inline-flex">
            View Bundles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className={`grid grid-cols-1 gap-8 ${gridCols}`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center md:hidden">
          <ButtonLink href="/bundles/hero-starter-pack" variant="outline">
            View All Bundles
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

function TrustBadges() {
  return (
    <section id="guarantee" className="border-y border-[var(--border)] bg-surface py-12 heritage-stripe">
      <div className="container-width">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-base font-semibold text-foreground">
          <span className="flex items-center gap-2 star-separator">
            Designed & Engineered in USA
          </span>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <span className="flex items-center gap-2 star-separator">
            Impact Receipts
          </span>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <span className="flex items-center gap-2 star-separator">
            Lifetime Hero Guarantee
          </span>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <span className="flex items-center gap-2 star-separator">
            Protocol-Tested Safety
          </span>
        </div>
      </div>
    </section>
  );
}

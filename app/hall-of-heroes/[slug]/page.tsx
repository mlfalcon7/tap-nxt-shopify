import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getHeroPost, getHeroPosts } from "@/lib/heroes";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionHeader } from "@/components/brand";
import { TAPStamp } from "@/components/brand";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { publicEnv } from "@/lib/env";
import { buildCanonical } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const heroes = await getHeroPosts();
  return heroes.map((hero) => ({
    slug: hero.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const hero = await getHeroPost(slug);

  if (!hero) {
    return {};
  }

  return {
    title: `${hero.heroName} | Hall of Heroes`,
    description: hero.excerpt,
    alternates: {
      canonical: buildCanonical(`/hall-of-heroes/${slug}`, publicEnv.siteUrl),
    },
    openGraph: {
      title: hero.heroName,
      description: hero.excerpt,
      type: "article",
      images: hero.image ? [{ url: hero.image, alt: hero.heroName }] : [],
    },
  };
}

export default async function HeroPostPage({ params }: Props) {
  const { slug } = await params;
  const hero = await getHeroPost(slug);

  if (!hero) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Hall of Heroes", href: "/hall-of-heroes" },
    { label: hero.heroName },
  ];

  const stampLabels: Record<string, string> = {
    Everyday: "HOME HERO",
    Rescue: "RESCUE HERO",
    Service: "SERVICE HERO",
    K9: "K9 HERO",
    Historical: "HISTORICAL HERO",
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: hero.heroName,
    description: hero.excerpt,
    datePublished: hero.date,
    author: {
      "@type": "Organization",
      name: "True American Pets",
    },
    image: hero.image ? `${publicEnv.siteUrl}${hero.image}` : undefined,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: crumb.href ? `${publicEnv.siteUrl}${crumb.href}` : `${publicEnv.siteUrl}/hall-of-heroes/${slug}`,
    })),
  };

  return (
    <div className="bg-background text-foreground">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="container-width py-12">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <article className="container-width py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TAPStamp label={stampLabels[hero.heroType] || "HERO"} />
              {hero.era && <span className="text-sm text-muted-foreground">{hero.era}</span>}
              {hero.location && <span className="text-sm text-muted-foreground">• {hero.location}</span>}
            </div>
            <h1 className="h1">{hero.heroName}</h1>
            <p className="text-lg text-muted-foreground">{hero.excerpt}</p>
          </div>

          {hero.image && (
            <div className="relative aspect-video overflow-hidden rounded-sm bg-surface-strong">
              <Image
                src={hero.image}
                alt={hero.heroName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <MDXRemote source={hero.content} />
          </div>

	          {hero.collectionLink && (
	            <div className="border-t border-border pt-8">
	              <div className="bg-surface-strong rounded-sm p-6 space-y-4">
	                <h3 className="text-xl font-semibold">Shop gear for this mission</h3>
	                <p className="text-muted-foreground">
	                  Explore gear designed for {hero.heroType.toLowerCase()} heroes like this one.
	                </p>
	                <ButtonLink href={hero.collectionLink}>
	                  Shop {hero.heroType} Gear
	                  <ArrowRight className="ml-2 h-4 w-4" />
	                </ButtonLink>
	              </div>
	            </div>
	          )}

          <div className="border-t border-border pt-8">
            <h3 className="text-xl font-semibold mb-4">Related Missions</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/shop?mission=everyday" className="text-sm text-link hover:underline">
                Everyday Gear →
              </Link>
              <Link href="/shop?mission=service-dog" className="text-sm text-link hover:underline">
                Service Dog Gear →
              </Link>
              <Link href="/shop?mission=rescue" className="text-sm text-link hover:underline">
                Rescue Gear →
              </Link>
              <Link href="/shop?mission=k9" className="text-sm text-link hover:underline">
                K9 Gear →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

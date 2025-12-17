import { notFound } from "next/navigation";
import Image from "next/image";
import { getStoryBySlug, getStorySlugs } from "@/lib/mdx";
import { buildCanonical } from "@/lib/utils";
import { publicEnv } from "@/lib/env";
import { getProducts } from "@/lib/shopify/client";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { markdownToHtml } from "@/lib/markdown";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/data/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getStorySlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return {};
  return {
    title: `${story.frontmatter.title} | Stories`,
    description: story.frontmatter.excerpt,
    alternates: {
      canonical: buildCanonical(`/stories/${story.frontmatter.slug}`, publicEnv.siteUrl),
    },
    openGraph: {
      title: story.frontmatter.title,
      description: story.frontmatter.excerpt,
      images: [
        {
          url: buildCanonical(story.frontmatter.heroImage, publicEnv.siteUrl),
          alt: story.frontmatter.title,
        },
      ],
      type: "article",
      publishedTime: story.frontmatter.date,
    },
    twitter: {
      card: "summary_large_image",
      title: story.frontmatter.title,
      description: story.frontmatter.excerpt,
      images: [buildCanonical(story.frontmatter.heroImage, publicEnv.siteUrl)],
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  const relatedProducts = (await getProducts({ first: 2 })).slice(0, 2);

  if (!story) {
    notFound();
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.frontmatter.title,
    description: story.frontmatter.excerpt,
    image: story.frontmatter.heroImage,
    author: {
      "@type": "Person",
      name: story.frontmatter.author,
    },
    datePublished: story.frontmatter.date,
    mainEntityOfPage: buildCanonical(`/stories/${story.frontmatter.slug}`, publicEnv.siteUrl),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Stories",
        item: buildCanonical("/stories", publicEnv.siteUrl),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: story.frontmatter.title,
        item: buildCanonical(`/stories/${story.frontmatter.slug}`, publicEnv.siteUrl),
      },
    ],
  };

  // Get related products from local data (can be enhanced with story.featuredProducts later)
  const featuredProducts = products.slice(0, 3);

  return (
    <article className="bg-background text-foreground">
      <Breadcrumbs
        items={[
          { label: "Stories", href: "/stories" },
          { label: story.frontmatter.title },
        ]}
      />
      <div className="container-width py-16 space-y-8">
        <JsonLd data={blogSchema} />
        <JsonLd data={breadcrumbSchema} />
        <div className="space-y-4">
        <p className="eyebrow text-muted-foreground">
          {new Date(story.frontmatter.date).toLocaleDateString()}
        </p>
        <h1 className="text-5xl font-bold">{story.frontmatter.title}</h1>
        <p className="text-lg text-muted-foreground">{story.frontmatter.excerpt}</p>
      </div>

      <Image
        src={story.frontmatter.heroImage}
        alt={story.frontmatter.title}
        width={1600}
        height={900}
        className="w-full h-[420px] object-cover"
      />

      <div
        className="prose prose-stone max-w-none"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(story.content) }}
      />

        <section className="border-t border-[var(--border)] pt-10 space-y-6">
          <div>
            <p className="eyebrow text-muted-foreground">Shop the Gear</p>
            <h2 className="text-2xl font-semibold mt-2">Gear Featured in This Story</h2>
            <p className="text-muted-foreground">
              The equipment mentioned in this story is available in our shop.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

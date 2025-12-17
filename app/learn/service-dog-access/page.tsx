import Link from "next/link";
import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/data/products";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata = {
  title: "Service Dog Access Protocol — Laws, Rights & Etiquette",
  description: "Comprehensive guide to ADA service dog laws, business access rights, handler etiquette, and traveling with service dogs.",
  alternates: {
    canonical: "/learn/service-dog-access",
  },
};

const articles = [
  {
    title: "Understanding ADA Service Dog Laws",
    slug: "ada-service-dog-laws",
    excerpt: "What the Americans with Disabilities Act says about service dogs, emotional support animals, and public access rights.",
  },
  {
    title: "Business Access Rights & Responsibilities",
    slug: "business-access-rights",
    excerpt: "What businesses can and cannot ask, how to handle service dog access, and creating welcoming environments.",
  },
  {
    title: "Service Dog Etiquette Guide",
    slug: "service-dog-etiquette",
    excerpt: "Best practices for handlers, public interactions, and maintaining professional standards.",
  },
  {
    title: "Traveling with Service Dogs",
    slug: "traveling-service-dogs",
    excerpt: "Airline regulations, hotel policies, and international travel considerations for service dog handlers.",
  },
];

const relatedProducts = products.filter((p) => 
  p.tags?.includes("service") || p.badges.includes("K9")
).slice(0, 3);

export default function ServiceDogAccessPage() {
  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs
        items={[
          { label: "Learn", href: "/learn" },
          { label: "Service Dog Access Protocol" },
        ]}
      />
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <TapSeal label="Service Dog Access Protocol" detail="Educational Guide" />
          <h1 className="h1">Know Your Rights. Exercise Them Confidently.</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Service dog handlers have legal rights under the ADA, but many businesses and handlers don't
            understand them. This guide covers laws, etiquette, and practical advice from experienced handlers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/service-dog-access/${article.slug}`}
              className="group border border-[var(--border)] bg-surface rounded-sm p-6 space-y-3 hover:border-[var(--border-strong)] transition-all duration-150"
            >
              <h3 className="text-lg font-semibold group-hover:text-[var(--accent-secondary)] transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground">{article.excerpt}</p>
              <span className="text-sm font-semibold text-link group-hover:underline inline-flex items-center gap-1">
                Read article →
              </span>
            </Link>
          ))}
        </div>

        {relatedProducts.length > 0 && (
          <section className="border-t border-[var(--border)] pt-12 space-y-6">
            <div>
              <p className="eyebrow text-muted-foreground">Recommended Gear</p>
              <h2 className="text-2xl font-semibold mt-2">US Protocol Certified Service Dog Equipment</h2>
              <p className="text-muted-foreground">
                Equipment designed for service dogs and working K9 units, tested to US Protocol standards.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
	            <div className="flex justify-center">
	              <ButtonLink href="/shop" variant="outline">
	                View All Service Dog Gear
	              </ButtonLink>
	            </div>
	          </section>
	        )}

        <section className="rounded-sm border border-[var(--border)] bg-surface-strong p-8 space-y-4">
          <h2 className="text-xl font-semibold">Need Help?</h2>
          <p className="text-muted-foreground">
            If you've experienced access discrimination or have questions about service dog rights, contact
            our advocacy team or reach out to the ADA Information Line.
	          </p>
	          <div className="flex flex-col sm:flex-row gap-4">
	            <ButtonLink href="/contact">Contact TAP Advocacy</ButtonLink>
	            <ButtonLink href="/campaigns/service-dog-access" variant="outline">
	              View Service Dog Access Campaign
	            </ButtonLink>
	          </div>
	        </section>
	      </section>
	    </div>
  );
}


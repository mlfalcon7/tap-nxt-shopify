import Link from "next/link";
import Image from "next/image";
import { TapSeal, PatriotRule } from "@/components/patriotism";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRight, BookOpen, Shield, Heart, Users } from "lucide-react";

export const metadata = {
  title: "Protocol Library — Learn About Service Dogs, Safety Gear & More",
  description: "Comprehensive guides on service dog access protocol, safety gear selection, rescue stories, and K9 support. Free educational content from TAP.",
  alternates: {
    canonical: "/learn",
  },
};

const contentPillars = [
  {
    title: "Service Dog Access Protocol",
    description: "Laws, etiquette, and business guides for service dog handlers and businesses.",
    href: "/learn/service-dog-access",
    icon: Shield,
    articles: [
      "Understanding ADA Service Dog Laws",
      "Business Access Rights & Responsibilities",
      "Service Dog Etiquette Guide",
      "Traveling with Service Dogs",
    ],
  },
  {
    title: "Safety Gear Guides",
    description: "How to choose the right harness, leash, and collar for your dog's mission.",
    href: "/learn/safety-gear",
    icon: BookOpen,
    articles: [
      "Harness Fit Guide",
      "Leash Strength & Safety",
      "Night Visibility Standards",
      "ID Tag Best Practices",
    ],
  },
  {
    title: "Rescue to Royalty",
    description: "Stories of rescue dogs becoming heroes, and how to support the rescue community.",
    href: "/learn/rescue-to-royalty",
    icon: Heart,
    articles: [
      "Adopting a Rescue Dog",
      "Training Rescue Dogs for Service",
      "Supporting Local Shelters",
      "Foster to Forever Stories",
    ],
  },
  {
    title: "K9 & Veteran Support",
    description: "Resources for working K9 units, veterans, and their support networks.",
    href: "/learn/k9-veteran-support",
    icon: Users,
    articles: [
      "K9 Unit Equipment Standards",
      "Veteran Service Dog Programs",
      "Partner Organization Highlights",
      "Impact Stories from the Field",
    ],
  },
];

export default function LearnPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <TapSeal label="Protocol Library" detail="Educational Resources" />
          <h1 className="h1">Learn. Understand. Act.</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Free educational content on service dog access, safety gear selection, rescue support, and K9
            resources. Every guide is written by handlers, vets, and field experts.
          </p>
        </div>

        <PatriotRule label="Content Pillars" className="container-width" />

        <div className="grid gap-8 md:grid-cols-2">
          {contentPillars.map((pillar) => (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="group border border-[var(--border)] bg-surface rounded-sm p-8 space-y-6 hover:border-[var(--border-strong)] transition-all duration-150"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-surface-strong group-hover:bg-[var(--accent-secondary)]/10 transition-colors flex-shrink-0">
                  <pillar.icon className="h-6 w-6 text-[var(--accent-secondary)]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--accent-secondary)] transition-colors">
                    {pillar.title}
                  </h2>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">Featured Articles</p>
                <ul className="space-y-1">
                  {pillar.articles.slice(0, 3).map((article) => (
                    <li key={article} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-[var(--accent-secondary)]">•</span>
                      <span>{article}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center text-sm font-semibold text-[var(--accent-secondary)] group-hover:gap-2 transition-all">
                Explore {pillar.title}
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

	        <section className="rounded-sm border border-[var(--border)] bg-surface-strong p-8 space-y-6">
	          <h2 className="text-2xl font-semibold">Why We Create This Content</h2>
	          <p className="text-muted-foreground">
	            Education is part of our mission. When handlers understand their rights, businesses know how to
	            welcome service dogs, and families choose the right safety gear, everyone wins. This content is
	            free, always will be, and written by people who live it.
	          </p>
	          <div className="flex flex-col sm:flex-row gap-4">
	            <ButtonLink href="/shop" size="lg">
	              Shop US Protocol Certified Gear
	            </ButtonLink>
	            <ButtonLink href="/campaigns" variant="outline" size="lg">
	              Support Our Campaigns
	            </ButtonLink>
	          </div>
	        </section>
	      </section>
	    </div>
  );
}


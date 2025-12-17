import Link from "next/link";
import { TapSeal, PatriotRule } from "@/components/patriotism";
import { ButtonLink } from "@/components/ui/button-link";
import { Ruler, Search, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Interactive Tools — Fit Wizard & Product Finder",
  description: "Free tools to help you find the right gear for your dog. Fit wizard, leash finder, and more.",
  alternates: {
    canonical: "/tools",
  },
};

const tools = [
  {
    title: "Fit Wizard",
    description: "Enter your dog's breed, weight, and chest measurements to get size recommendations and product suggestions.",
    href: "/tools/fit-wizard",
    icon: Ruler,
  },
  {
    title: "Leash Finder",
    description: "Answer questions about your dog's weight, pull level, and walking environment to find the perfect leash.",
    href: "/tools/leash-finder",
    icon: Search,
  },
];

export default function ToolsPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <TapSeal label="Interactive Tools" detail="Product Finder" />
          <h1 className="h1">Find the Right Gear</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Use our free tools to find the perfect fit and products for your dog. No signup required, just
            helpful recommendations based on your dog's needs.
          </p>
        </div>

        <PatriotRule label="Available Tools" className="container-width" />

        <div className="grid gap-8 md:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group border border-[var(--border)] bg-surface rounded-sm p-8 space-y-6 hover:border-[var(--border-strong)] transition-all duration-150"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-surface-strong group-hover:bg-[var(--accent-secondary)]/10 transition-colors flex-shrink-0">
                  <tool.icon className="h-6 w-6 text-[var(--accent-secondary)]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--accent-secondary)] transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-muted-foreground">{tool.description}</p>
                </div>
              </div>
              <div className="flex items-center text-sm font-semibold text-[var(--accent-secondary)] group-hover:gap-2 transition-all">
                Use {tool.title}
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

	        <section className="rounded-sm border border-[var(--border)] bg-surface-strong p-8 space-y-4">
	          <h2 className="text-xl font-semibold">Why We Built These Tools</h2>
	          <p className="text-muted-foreground">
	            Finding the right gear shouldn't be guesswork. These tools use real sizing data and product
	            specifications to help you make informed decisions. Every recommendation links directly to
	            products you can purchase with confidence.
	          </p>
	          <ButtonLink href="/shop" variant="outline">
	            Browse All Products
	          </ButtonLink>
	        </section>
	      </section>
	    </div>
  );
}


import Link from "next/link";
import { TapSeal, PatriotRule } from "@/components/patriotism";
import { ButtonLink } from "@/components/ui/button-link";
import { ShieldCheck, FileText, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata = {
  title: "US Protocol — TAP Certified Safety Standard",
  description: "The engineering standard trusted by K9 units and neighborhood heroes. Testing, traceability, guarantee, and certification process.",
  alternates: {
    canonical: "/us-protocol",
  },
};

const protocolCards = [
  {
    title: "Testing Standards",
    description: "Thermal, abrasion, and impact labs in CO + NC vet every textile before it reaches trail or tarmac.",
    href: "/us-protocol/testing",
    icon: ShieldCheck,
  },
  {
    title: "Traceability",
    description: "Every buckle, stitch, and reflective panel is serialized for rapid recall and accountability.",
    href: "/us-protocol/traceability",
    icon: FileText,
  },
  {
    title: "Lifetime Guarantee",
    description: "If gear ever fails, a real human answers in under a day with repair, replace, or refund.",
    href: "/us-protocol/guarantee",
    icon: Award,
  },
  {
    title: "Certification Process",
    description: "Handler Advisory Council reviews every product before launch. Field-tested by working K9 units.",
    href: "/us-protocol/standards",
    icon: CheckCircle2,
  },
];

export default function USProtocolPage() {
  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs items={[{ label: "US Protocol" }]} />
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <TapSeal label="US Protocol" detail="TAP Certified Safety" />
          <h1 className="h1">The Standard, Not the Campaign</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            US Protocol is the engineering standard that every TAP product must pass before it reaches your hero.
            It's not marketing—it's the same testing, traceability, and guarantee system trusted by K9 units
            coast-to-coast.
          </p>
          <p className="text-base text-muted-foreground">
            Every component is tested, serialized, and backed by our Lifetime Hero Guarantee. This is how we
            ensure mission-grade equipment, not dropshipped toys.
          </p>
        </div>

        <PatriotRule label="Protocol Components" className="container-width" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {protocolCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group border border-[var(--border)] bg-surface rounded-sm p-6 space-y-4 hover:border-[var(--border-strong)] transition-all duration-150"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-surface-strong group-hover:bg-[var(--accent-secondary)]/10 transition-colors">
                <card.icon className="h-6 w-6 text-[var(--accent-secondary)]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--accent-secondary)] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
              <div className="flex items-center text-sm font-semibold text-[var(--accent-secondary)] group-hover:gap-2 transition-all">
                Learn more
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-16 rounded-sm border border-[var(--border)] bg-surface-strong p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Why US Protocol Matters</h2>
            <p className="text-muted-foreground">
              Most pet gear is untested, unregulated, and unaccountable. US Protocol changes that by applying
              the same standards used by working K9 units to every product we make.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">For Working Dogs</h3>
              <p className="text-sm text-muted-foreground">
                K9 units trust US Protocol because every component is field-tested and traceable. If something
                fails, we know exactly which batch and can recall immediately.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">For Family Heroes</h3>
              <p className="text-sm text-muted-foreground">
                Your dog deserves the same safety standards as a working K9. US Protocol ensures that every
                collar, harness, and leash meets mission-grade requirements.
              </p>
            </div>
          </div>
        </section>

	        <div className="flex flex-col sm:flex-row gap-4">
	          <ButtonLink href="/shop" size="lg">
	            Shop US Protocol Certified Gear
	          </ButtonLink>
	          <ButtonLink href="/safety-standards" variant="outline" size="lg">
	            View Safety Standards
	          </ButtonLink>
	        </div>
	      </section>
	    </div>
  );
}


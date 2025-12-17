import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ShieldCheck, MapPin, FileText } from "lucide-react";

export const metadata = {
  title: "US Protocol Testing Standards",
  description: "Thermal, abrasion, and impact testing labs in Colorado and North Carolina. Learn how every TAP product is tested before launch.",
  alternates: {
    canonical: "/us-protocol/testing",
  },
};

const testTypes = [
  {
    title: "Thermal Testing",
    description: "Products are exposed to extreme temperatures (-20°F to 140°F) to ensure materials don't degrade or become brittle.",
    location: "Colorado Testing Lab",
  },
  {
    title: "Abrasion Resistance",
    description: "Textiles undergo 10,000+ cycles of abrasion testing to simulate years of field use.",
    location: "North Carolina Testing Lab",
  },
  {
    title: "Impact & Tensile Strength",
    description: "Hardware and webbing are tested to failure points well beyond normal use conditions.",
    location: "Colorado Testing Lab",
  },
  {
    title: "Water Immersion",
    description: "Waterproof claims are validated through 1,000+ immersion cycles with pressure testing.",
    location: "North Carolina Testing Lab",
  },
  {
    title: "UV Stability",
    description: "Reflective materials and dyes are tested for UV degradation over extended exposure periods.",
    location: "Colorado Testing Lab",
  },
  {
    title: "Field Trials",
    description: "Working K9 units test products in real-world conditions before approval for production.",
    location: "Multiple Municipal Units",
  },
];

export default function TestingPage() {
  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs
        items={[
          { label: "US Protocol", href: "/us-protocol" },
          { label: "Testing Standards" },
        ]}
      />
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <TapSeal label="Testing Standards" detail="US Protocol" />
          <h1 className="h1">Lab-Tested, Field-Proven</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Every TAP product undergoes rigorous testing in independent labs before it reaches production.
            We test to failure, not to pass. This ensures your gear performs when it matters most.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testTypes.map((test) => (
            <div
              key={test.title}
              className="border border-[var(--border)] bg-surface rounded-sm p-6 space-y-3"
            >
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-[var(--accent-secondary)] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{test.title}</h3>
                  <p className="text-sm text-muted-foreground">{test.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-[var(--border)]">
                <MapPin className="h-3 w-3" />
                <span>{test.location}</span>
              </div>
            </div>
          ))}
        </div>

        <section className="rounded-sm border border-[var(--border)] bg-surface-strong p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Testing Process</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong className="text-foreground">Pre-Production:</strong> Materials and components are tested
              in our partner labs before manufacturing begins.
            </p>
            <p>
              <strong className="text-foreground">Production Samples:</strong> Random samples from each
              production run are tested to ensure consistency.
            </p>
            <p>
              <strong className="text-foreground">Field Validation:</strong> Working K9 units and handler
              advisory council members test products in real-world conditions.
            </p>
            <p>
              <strong className="text-foreground">Ongoing Monitoring:</strong> We track failure reports and
              continuously improve based on field feedback.
            </p>
          </div>
        </section>

        <section className="rounded-sm border border-[var(--border)] bg-surface p-6">
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-[var(--accent-secondary)] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Request Test Reports</h3>
              <p className="text-sm text-muted-foreground">
                Detailed test reports are available for every product. Contact our safety desk to request
                documentation for any TAP Certified item.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}



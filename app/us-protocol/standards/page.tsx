import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Users, CheckCircle2, FileText } from "lucide-react";

export const metadata = {
  title: "US Protocol Certification Process",
  description: "Handler Advisory Council reviews every product. Field-tested by working K9 units. Learn how products earn US Protocol certification.",
  alternates: {
    canonical: "/us-protocol/standards",
  },
};

const certificationSteps = [
  {
    step: 1,
    title: "Design Review",
    description: "Handler Advisory Council reviews product design for safety, functionality, and mission requirements.",
  },
  {
    step: 2,
    title: "Lab Testing",
    description: "Independent labs test materials and components to failure points in thermal, abrasion, and impact tests.",
  },
  {
    step: 3,
    title: "Field Trials",
    description: "Working K9 units test products in real-world conditions for at least 30 days.",
  },
  {
    step: 4,
    title: "Traceability Setup",
    description: "Serialization system is implemented for all components before production begins.",
  },
  {
    step: 5,
    title: "Production Approval",
    description: "Product receives US Protocol certification and is approved for sale.",
  },
  {
    step: 6,
    title: "Ongoing Monitoring",
    description: "We track field performance and continuously improve based on handler feedback.",
  },
];

export default function StandardsPage() {
  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs
        items={[
          { label: "US Protocol", href: "/us-protocol" },
          { label: "Certification Process" },
        ]}
      />
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <TapSeal label="Certification Process" detail="US Protocol" />
          <h1 className="h1">How Products Earn US Protocol</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            US Protocol certification isn't automatic. Every product must pass design review, lab testing,
            field trials, and traceability setup before it can carry the US Protocol badge.
          </p>
        </div>

        <div className="space-y-6">
          {certificationSteps.map((item) => (
            <div
              key={item.step}
              className="flex gap-6 border border-[var(--border)] bg-surface rounded-sm p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-secondary)] text-white font-bold text-lg flex-shrink-0">
                {item.step}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="rounded-sm border border-[var(--border)] bg-surface-strong p-8 space-y-6">
          <div className="flex items-start gap-4">
            <Users className="h-6 w-6 text-[var(--accent-secondary)] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Handler Advisory Council</h2>
              <p className="text-muted-foreground">
                Our advisory council includes veterans, K9 handlers, rescue leads, and veterinary professionals.
                They review every product design and provide field testing feedback before certification.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-sm border border-[var(--border)] bg-surface p-6">
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-[var(--accent-secondary)] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Certification Documents</h3>
              <p className="text-sm text-muted-foreground">
                Every US Protocol certified product has documentation available upon request, including test
                reports, field trial results, and certification dates.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}



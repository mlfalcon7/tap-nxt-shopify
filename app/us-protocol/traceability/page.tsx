import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FileText, QrCode, Database } from "lucide-react";

export const metadata = {
  title: "US Protocol Traceability System",
  description: "Every component is serialized and logged in the TAP ledger. Learn how traceability ensures rapid recall and accountability.",
  alternates: {
    canonical: "/us-protocol/traceability",
  },
};

const traceableComponents = [
  {
    component: "Hardware (Buckles, D-rings, Clasps)",
    serialization: "Laser-etched serial numbers",
    tracking: "Logged in TAP registry within 2 hours of production",
  },
  {
    component: "Reflective Panels",
    serialization: "Batch codes embedded in material",
    tracking: "Tied to production date and facility",
  },
  {
    component: "Textile Batches",
    serialization: "Lot numbers on material tags",
    tracking: "Linked to supplier and testing reports",
  },
  {
    component: "Stitching Batches",
    serialization: "Thread lot codes",
    tracking: "Recorded in assembly logs",
  },
];

export default function TraceabilityPage() {
  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs
        items={[
          { label: "US Protocol", href: "/us-protocol" },
          { label: "Traceability" },
        ]}
      />
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <TapSeal label="Traceability" detail="US Protocol" />
          <h1 className="h1">Every Component, Accountable</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            If a component fails, we need to know exactly which batch, which facility, and which products are
            affected. That's why every TAP product has serialized components logged in our traceability system.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {traceableComponents.map((item) => (
            <div
              key={item.component}
              className="border border-[var(--border)] bg-surface rounded-sm p-6 space-y-3"
            >
              <h3 className="font-semibold">{item.component}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <QrCode className="h-4 w-4 text-[var(--accent-secondary)] mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item.serialization}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Database className="h-4 w-4 text-[var(--accent-secondary)] mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item.tracking}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="rounded-sm border border-[var(--border)] bg-surface-strong p-8 space-y-4">
          <h2 className="text-2xl font-semibold">How Traceability Works</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong className="text-foreground">At Production:</strong> Every component receives a unique
              identifier that's logged in our TAP registry system.
            </p>
            <p>
              <strong className="text-foreground">In Your Hands:</strong> Your product's serial number (found
              on the tag or hardware) can be used to trace its entire production history.
            </p>
            <p>
              <strong className="text-foreground">If Issues Arise:</strong> We can instantly identify all
              products from the same batch and contact affected customers within 24 hours.
            </p>
          </div>
        </section>

        <section className="rounded-sm border border-[var(--border)] bg-surface p-6">
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-[var(--accent-secondary)] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Look Up Your Product</h3>
              <p className="text-sm text-muted-foreground">
                Enter your product's serial number on any product page to view its traceability record,
                including testing dates, batch information, and component origins.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}



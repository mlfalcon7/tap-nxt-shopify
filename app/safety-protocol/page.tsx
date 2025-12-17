import { TapSeal, PatriotRule } from "@/components/patriotism";
import { ButtonLink } from "@/components/ui/button-link";
import { ShieldCheck, FileText, Award, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/layout/section";

export const metadata = {
  title: "Safety Protocol — US Protocol Testing & Standards",
  description: "Learn about TAP's rigorous safety testing, traceability system, and lifetime guarantee. Engineering American, global standard.",
};

const protocolPoints = [
  {
    icon: ShieldCheck,
    title: "Certified Field Testing",
    description: "Thermal, abrasion, and impact labs in Colorado and North Carolina vet every textile before it reaches trail or tarmac.",
    details: [
      "Thermal stress tests: -20°F to 140°F",
      "Abrasion resistance: 10,000+ cycles",
      "Impact strength: 3x normal load capacity",
      "Visibility protocols: Controlled dark chamber testing",
    ],
  },
  {
    icon: FileText,
    title: "Traceable Components",
    description: "Every buckle, stitch, and reflective panel is serialized for rapid recall and accountability.",
    details: [
      "Hardware: Laser-etched serial numbers",
      "Reflective panels: Batch codes embedded",
      "Textile batches: Lot numbers on material tags",
      "Stitching batches: Thread lot codes recorded",
    ],
  },
  {
    icon: Award,
    title: "Lifetime Hero Guarantee",
    description: "If gear ever fails during normal mission use, we'll repair it, replace it, or refund it. No questions asked.",
    details: [
      "24-hour safety desk response",
      "Repair, replace, or refund options",
      "Covers hardware failure, material defects, stitching issues",
      "Field-tested gear backed by real humans",
    ],
  },
  {
    icon: CheckCircle2,
    title: "Handler Advisory Council",
    description: "Veterans, K9 handlers, and rescue leads stress test every run with live dogs before launch.",
    details: [
      "Real-world field testing with working dogs",
      "Feedback from 7+ municipal K9 units",
      "Advisory council sign-off before production",
      "Continuous improvement based on handler input",
    ],
  },
];

export default function SafetyProtocolPage() {
  return (
    <div className="bg-background text-foreground">
      <Section>
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <TapSeal label="Safety Protocol" detail="US Protocol" className="justify-center" />
          <h1 className="h1">Safety is the Protocol, Not the Campaign</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            From sourcing to final inspection, every Hero Starter Pack is graded against the same standards trusted by
            working K9 units coast-to-coast. Engineering American, global standard.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-8">
          {protocolPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="rounded-sm border-2 border-[var(--border-strong)] bg-surface p-8 shadow-lg"
              >
                <div className="flex items-start gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--accent-secondary)] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] text-[var(--accent-secondary)] flex-shrink-0">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">{point.title}</h2>
                      <p className="text-base leading-relaxed text-muted-foreground">{point.description}</p>
                    </div>
                    <ul className="space-y-2">
                      {point.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-[var(--accent-secondary)] mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <PatriotRule label="Protocol → Action" className="container-width" />

	      <Section tone="navy">
	        <div className="max-w-2xl mx-auto text-center space-y-6 text-[var(--action-band-text)]">
	          <h2 className="h2 text-[var(--action-band-text)]">Have a Safety Concern?</h2>
	          <p className="text-lg text-[color-mix(in_srgb,var(--action-band-text)_80%,transparent)]">
	            Our 24-hour safety desk is available for immediate response. Report any issues or request documentation.
	          </p>
	          <div className="flex flex-col sm:flex-row gap-4 justify-center">
	            <ButtonLink
	              href="/guarantee/claim"
	              size="lg"
	              variant="outline"
	              className="border-[var(--action-band-text)] text-[var(--action-band-text)] hover:bg-[color-mix(in_srgb,var(--action-band-text)_12%,transparent)]"
	            >
	              Submit a Claim
	            </ButtonLink>
	            <ButtonLink
	              href="/us-protocol/reports"
	              size="lg"
	              variant="outline"
	              className="border-[var(--action-band-text)] text-[var(--action-band-text)] hover:bg-[color-mix(in_srgb,var(--action-band-text)_12%,transparent)]"
	            >
	              View Test Reports
	            </ButtonLink>
	          </div>
	        </div>
	      </Section>
	    </div>
  );
}


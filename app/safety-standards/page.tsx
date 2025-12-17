import Image from "next/image";
import { TapSeal, PatriotRule } from "@/components/patriotism";
import { safetyProofs } from "@/data/impact";
import { ShieldCheck, CheckCircle2, FileText, Award } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata = {
  title: "Safety Standards",
  description: "TAP Certified Safety — US Protocol. Engineering American, Global Standard.",
};

const safetyChecks = [
  {
    title: "Certified Field Testing",
    copy: "Thermal, abrasion, and impact labs in CO + NC vet every textile before it reaches trail or tarmac.",
    icon: ShieldCheck,
  },
  {
    title: "Handler Advisory Council",
    copy: "Veterans, K9 handlers, and rescue leads stress test every run with live dogs before launch.",
    icon: CheckCircle2,
  },
  {
    title: "Traceable Components",
    copy: "Every buckle, stitch, and reflective panel is serialized for rapid recall and accountability.",
    icon: FileText,
  },
  {
    title: "24-Hour Safety Desk",
    copy: "If gear ever fails, a real human answers in under a day with repair, replace, or refund.",
    icon: Award,
  },
];

export default function SafetyStandardsPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="container-width py-16 space-y-8">
        <div className="space-y-4 max-w-3xl">
          <TapSeal label="TAP Certified" detail="US Protocol" />
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Engineering American, Global Standard
          </p>
          <h1 className="h1">Safety is the protocol, not the campaign.</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            From sourcing to final inspection, every Hero Starter Pack is graded against the same standards trusted by
            working K9 units coast-to-coast.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {safetyChecks.map((item) => (
            <div
              key={item.title}
              className="space-y-3 rounded-sm border border-[var(--border)] bg-surface p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-surface-strong">
                <item.icon className="h-6 w-6 text-[var(--accent-secondary)]" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Safety Proof Points</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {safetyProofs.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-[var(--accent-secondary)]" aria-hidden>
                  ★
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

	      <section className="bg-[var(--action-band-bg)] py-20 text-[var(--action-band-text)]">
	        <div className="container-width grid gap-12 lg:grid-cols-3">
	          <div className="space-y-5 lg:col-span-1">
	            <TapSeal label="TAP Certified" detail="US Protocol" tone="dark" />
            <p className="text-sm font-semibold uppercase tracking-wide text-[color-mix(in_srgb,var(--action-band-text) 75%,transparent)]">
              Engineering American, Global Standard
            </p>
	            <h2 className="h2 text-[var(--action-band-text)]">Testing Standards</h2>
	            <p className="text-base leading-relaxed text-[color-mix(in_srgb,var(--action-band-text)_70%,transparent)]">
	              Every product undergoes rigorous testing before it reaches your hero. Our standards exceed industry requirements.
	            </p>
	            <ButtonLink
	              href="/about"
	              variant="outline"
	              className="border-[var(--action-band-text)] text-[var(--action-band-text)] hover:bg-[color-mix(in_srgb,var(--action-band-text)_12%,transparent)]"
	            >
	              See testing standard
	            </ButtonLink>
	          </div>
	          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
	            {safetyChecks.map((item) => (
              <div
                key={item.title}
                className="space-y-3 rounded-sm border border-[color-mix(in_srgb,var(--action-band-text)_30%,transparent)] bg-[color-mix(in_srgb,var(--action-band-bg)_15%,transparent)] p-6 text-left"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent-secondary)]">
                  US Protocol
                </p>
                <h3 className="text-lg font-semibold text-[var(--action-band-text)]">{item.title}</h3>
                <p className="text-sm text-[color-mix(in_srgb,var(--action-band-text)_80%,transparent)]">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

	      <section className="container-width py-16 border-t border-[var(--border)]">
	        <div className="max-w-2xl mx-auto text-center space-y-6">
	          <h2 className="text-2xl font-semibold">Have a Safety Concern?</h2>
	          <p className="text-muted-foreground">
	            Our 24-hour safety desk is available for immediate response. Report any issues or request documentation.
	          </p>
	          <ButtonLink href="/contact">Contact Safety Desk</ButtonLink>
	        </div>
	      </section>
	    </div>
  );
}


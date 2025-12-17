import { Section } from "@/components/layout/section";
import { ShieldCheck, Heart, Factory, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { whyCostsMoreItems } from "@/lib/brandCopy";
import { ButtonLink } from "@/components/ui/button-link";

const iconMap = {
  "US Protocol Testing": ShieldCheck,
  "2% for the Pack": Heart,
  "Premium Materials": Factory,
  "Lifetime Guarantee": Award,
};

export function WhyTAPCostsMore() {
  return (
    <Section tone="navy" id="us-protocol">
      <div className="grid gap-12 lg:grid-cols-2 items-start">
        <div className="space-y-6 text-[var(--action-band-text)]">
          <p className="eyebrow text-[color-mix(in_srgb,var(--action-band-text) 75%,transparent)]">Field Briefing</p>
          <h2 className="h2 text-[var(--action-band-text)]">Why TAP Costs More</h2>
          <p className="text-lg leading-relaxed text-[color-mix(in_srgb,var(--action-band-text)_80%,transparent)]">
            We don't cut corners. Our pricing reflects our unwavering commitment to safety, quality, and impact. When you choose TAP, you're investing in a promise.
          </p>
          <div className="rounded-sm border border-[color-mix(in_srgb,var(--action-band-text)_30%,transparent)] bg-[color-mix(in_srgb,var(--action-band-bg)_15%,transparent)] p-6">
            <p className="text-sm font-semibold mb-2 text-[var(--action-band-text)]">What This Funds</p>
            <p className="text-sm text-[color-mix(in_srgb,var(--action-band-text)_80%,transparent)] mb-4">
              Your purchase directly supports K9 safety grants, shelter audits, and veteran stipends. See the full breakdown in our Impact Ledger.
            </p>
            <ButtonLink
              href="/impact-ledger"
              variant="outline"
              size="sm"
              className="border-[var(--action-band-text)] text-[var(--action-band-text)] hover:bg-[color-mix(in_srgb,var(--action-band-text)_12%,transparent)]"
            >
              View Impact Ledger
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {whyCostsMoreItems.map((item) => {
            const Icon = iconMap[item.title as keyof typeof iconMap] || ShieldCheck;
            return (
              <Card
                key={item.title}
                className="border-[color-mix(in_srgb,var(--action-band-text)_30%,transparent)] bg-[color-mix(in_srgb,var(--action-band-bg)_15%,transparent)]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--action-band-text)_30%,transparent)] bg-[color-mix(in_srgb,var(--action-band-bg)_20%,transparent)] flex-shrink-0">
                    <Icon className="h-5 w-5 text-[var(--accent-secondary)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[var(--action-band-text)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[color-mix(in_srgb,var(--action-band-text)_80%,transparent)]">{item.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

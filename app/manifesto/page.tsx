import { Section } from "@/components/layout/section";
import { TapSeal, PatriotRule, Stamp } from "@/components/patriotism";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata = {
  title: "Pet Rights Manifesto — True American Pets",
  description: "The core rights every companion animal deserves. Sign the Pet Safety Pledge and join the mission for protocol-grade care.",
};

const rights = [
  {
    numeral: "I",
    title: "Right to Secure Identification",
    copy: "Every pet has a name, a history, and a home. Anonymous dogs go missing longer—and are treated as expendable assets. TAP engraves, serializes, and scans every hero so they're returned before nightfall.",
  },
  {
    numeral: "II",
    title: "Right to Protected Adventure",
    copy: "Dogs earn their joy outdoors. Equipment must keep up with mission miles: reflective, breathable, thermal, and field-graded against abrasion. Adventure is a right, not a gamble.",
  },
  {
    numeral: "III",
    title: "Right to Recognition as a Hero",
    copy: "They guard our homes, guide our steps, and anchor our families. Gear must signal their role—patches, ID, and ceremony. TAP kits prove that recognition is built, not purchased.",
  },
];

export default function ManifestoPage() {
  return (
    <div className="bg-background text-foreground">
      <Section>
        <div className="space-y-6 text-center">
          <TapSeal label="Pet Rights Manifesto" detail="True American Pets" className="justify-center" />
          <h1 className="h1 display tracking-tight">The Doctrine of Mission-Grade Care</h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
            We hold these truths to be self-evident: that the ordinary family dog is already a hero. The manifesto is the
            contract we sign with every shipment, every protocol, every impact receipt.
          </p>
          <TrustStrip
            points={[
              "Identification",
              "Adventure",
              "Recognition",
            ]}
            className="justify-center"
            compact
          />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-8">
          {rights.map((right) => (
            <article
              key={right.title}
              className="space-y-4 rounded-sm border border-[var(--border)] bg-surface p-8 shadow-[0_20px_60px_rgba(11,16,32,0.08)]"
            >
              <p className="eyebrow text-[var(--accent-secondary)]">
                Article {right.numeral}
              </p>
              <h2 className="text-3xl font-semibold">{right.title}</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{right.copy}</p>
            </article>
          ))}
        </div>
      </Section>

      <PatriotRule label="Manifesto → Action" className="container-width" />

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-sm border border-[var(--border)] bg-surface p-8 space-y-4">
            <Stamp title="Designed & Engineered" subtitle="USA" size="md" />
            <p className="text-sm text-muted-foreground">
              TAP is engineered stateside with serialized components, published QA logs, and handler councils signing each run.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Protocol-grade textiles from CO + NC labs</li>
              <li>• Serialized ID + impact ledger per shipment</li>
              <li>• Advisory council sign-off before release</li>
            </ul>
          </div>
          <div className="rounded-sm border border-[var(--border)] bg-surface p-8 space-y-4">
            <TapSeal label="Take the Pledge" detail="Mission Ready" />
            <p className="text-sm text-muted-foreground">
              Sign the Pet Safety Pledge and receive the field manual, quarterly impact receipts, and action center mobilizations.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/action-center" size="lg" className="px-8">
                Sign Manifesto
              </ButtonLink>
              <Button variant="outline" size="lg" className="px-8">
                Download Bill of Rights
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

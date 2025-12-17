import { Section } from "@/components/layout/section";
import { TapSeal, PatriotRule, Stamp } from "@/components/patriotism";
import { TrustStrip } from "@/components/sections/trust-strip";
import { impactReceipts, impactLedger, impactDetails } from "@/data/impact";

export const metadata = {
  title: "Impact",
  description: "2% for the Pack ledger and campaign KPIs.",
};

export default function ImpactPage() {
  return (
    <div className="bg-background text-foreground">
      <Section>
        <div className="space-y-6 text-center">
          <TapSeal label="2% for the Pack" detail="Impact Ledger" className="justify-center" />
          <h1 className="h1">Impact Ledger</h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Every order triggers an automatic allocation into K9 safety grants, shelter audits, and veteran stipends.
            Impact receipts prove where each dollar travelled.
          </p>
          <TrustStrip
            points={[
              "Quarterly impact receipts",
              "Shelter & K9 grants",
              "Audit-ready records",
            ]}
            className="justify-center"
          />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5 rounded-sm border border-[var(--border)] bg-surface p-8 shadow-[0_25px_70px_rgba(11,16,32,0.08)]">
            <Stamp title="Impact Receipts" subtitle="US – Q3" size="md" />
            <p className="text-sm text-muted-foreground">
              Receipts issued every quarter—each stamped with allocation + proof so supporters see the full chain of custody.
            </p>
            <div className="space-y-3">
              {impactReceipts.map((entry) => (
                <div key={entry.title} className="flex items-center justify-between border border-dashed border-[var(--border)] px-4 py-3 rounded-sm">
                  <div>
                    <p className="eyebrow text-muted-foreground">
                      {entry.title}
                    </p>
                    <p className="text-sm text-foreground">{entry.detail}</p>
                  </div>
                  <span className="text-sm font-semibold">{entry.amount}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-sm border border-[var(--border)] bg-surface-strong p-8">
            <p className="eyebrow text-muted-foreground">Audit log</p>
            <div className="space-y-4">
              {impactDetails.map((detail) => (
                <div key={detail.title} className="space-y-1 border-b border-dashed border-[var(--border)] pb-3 last:border-none">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{detail.title}</h3>
                    <span className="text-sm font-semibold">{detail.allocation}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{detail.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <PatriotRule label="Impact Ledger" className="container-width" />

      <Section className="pt-0">
        <div className="overflow-hidden rounded-sm border border-[var(--border)]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface-strong text-[var(--text-secondary)]">
              <tr>
                <th className="px-4 py-3 font-semibold uppercase tracking-[0.2em]">Date</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-[0.2em]">Deployed To</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-[0.2em]">Proof</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-[0.2em] text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {impactLedger.map((entry) => (
                <tr key={`${entry.date}-${entry.deployedTo}`} className="border-t border-[var(--border)]">
                  <td className="px-4 py-4 text-sm text-muted-foreground">{entry.date}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-foreground">{entry.deployedTo}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{entry.proof}</td>
                  <td className="px-4 py-4 text-right text-sm font-semibold">{entry.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

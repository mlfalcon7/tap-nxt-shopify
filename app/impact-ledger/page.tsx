import Link from "next/link";
import { TapSeal, PatriotRule } from "@/components/patriotism";
import { impactReceipts, impactLedger, impactDetails } from "@/data/impact";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata = {
  title: "Impact Ledger",
  description: "Quarterly impact receipts and detailed breakdown of 2% for the Pack allocations.",
};

export default function ImpactLedgerPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="container-width py-16 space-y-8">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <TapSeal label="2% for the Pack" detail="Impact Ledger" className="justify-center" />
          <h1 className="h1">Impact Ledger</h1>
          <p className="text-lg text-muted-foreground">
            Every order triggers an automatic allocation into K9 safety grants, shelter audits, and veteran stipends.
            Impact receipts prove where each dollar travelled.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 mt-12">
          <div className="space-y-5 rounded-sm border border-[var(--border)] bg-surface p-8 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Quarterly Receipts</h2>
              <p className="text-sm text-muted-foreground">
                Receipts issued every quarter—each stamped with allocation + proof so supporters see the full chain of custody.
              </p>
            </div>
            <div className="space-y-3">
              {impactReceipts.map((entry) => (
                <div key={entry.title} className="flex items-center justify-between border border-dashed border-[var(--border)] px-4 py-3 rounded-sm">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {entry.title}
                    </p>
                    <p className="text-sm text-foreground">{entry.detail}</p>
                  </div>
                  <span className="text-base font-semibold">{entry.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-sm border border-[var(--border)] bg-surface-strong p-8">
            <h2 className="text-xl font-semibold">Allocation Details</h2>
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
      </section>

      <PatriotRule label="Full Ledger" className="container-width" />

      <section className="container-width py-16 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="eyebrow text-muted-foreground">Download Reports</p>
            <h2 className="text-2xl font-semibold mt-2">Quarterly Impact Reports</h2>
            <p className="text-muted-foreground">
              Detailed PDF reports available for each quarter. Audit-ready documentation.
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Q3 2024 Report
          </Button>
        </div>
        <div className="overflow-hidden rounded-sm border border-[var(--border)]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface-strong text-[var(--text-secondary)]">
              <tr>
                <th className="px-4 py-3 font-semibold uppercase tracking-wide">Date</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wide">Deployed To</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wide">Proof</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wide text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {impactLedger.map((entry, idx) => (
                <tr key={`${entry.date}-${entry.deployedTo}-${idx}`} className="border-t border-[var(--border)]">
                  <td className="px-4 py-4 text-sm text-muted-foreground">{entry.date}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-foreground">{entry.deployedTo}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{entry.proof}</td>
                  <td className="px-4 py-4 text-right text-sm font-semibold">{entry.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container-width py-16 border-t border-[var(--border)]">
	        <div className="max-w-2xl mx-auto text-center space-y-6">
	          <h2 className="text-2xl font-semibold">Questions About Impact?</h2>
	          <p className="text-muted-foreground">
	            Our quarterly reports are audit-ready and publicly available. Contact us for detailed breakdowns or verification.
	          </p>
	          <div className="flex gap-4 justify-center">
	            <ButtonLink href="/contact">Contact Us</ButtonLink>
	            <ButtonLink href="/impact" variant="outline">
	              View Impact Page
	            </ButtonLink>
	          </div>
	        </div>
	      </section>
	    </div>
  );
}

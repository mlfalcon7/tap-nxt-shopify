import { formatPrice } from "@/lib/utils";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type ImpactReceiptProps = {
  orderId: string;
  orderAmount: number;
  impactAmount: number;
  date: string;
  destinationBuckets: {
    k9Grants: number;
    shelterAudits: number;
    veteranStipends: number;
  };
};

export function ImpactReceipt({
  orderId,
  orderAmount,
  impactAmount,
  date,
  destinationBuckets,
}: ImpactReceiptProps) {
  return (
    <div className="rounded-sm border border-[var(--border)] bg-surface-strong p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-secondary)]/10">
            <FileText className="h-6 w-6 text-[var(--accent-secondary)]" />
          </div>
          <div>
            <p className="eyebrow text-[var(--accent-secondary)]">Impact Receipt</p>
            <h3 className="text-lg font-semibold">2% for the Pack</h3>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 border-t border-[var(--border)] pt-6">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Order ID</p>
            <p className="text-base font-mono">{orderId}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Order Date</p>
            <p className="text-base">{new Date(date).toLocaleDateString("en-US", { 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Order Amount</p>
            <p className="text-2xl font-semibold">{formatPrice(orderAmount.toFixed(2), "USD")}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Impact Contribution</p>
            <p className="text-2xl font-semibold text-[var(--accent-secondary)]">
              {formatPrice(impactAmount.toFixed(2), "USD")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">2% of order amount</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] pt-6 space-y-4">
        <p className="eyebrow text-muted-foreground">Allocation Breakdown</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-surface rounded-sm">
            <span className="text-sm font-medium">K9 Safety Grants</span>
            <span className="text-sm font-semibold">{formatPrice(destinationBuckets.k9Grants.toFixed(2), "USD")}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface rounded-sm">
            <span className="text-sm font-medium">Shelter Audits</span>
            <span className="text-sm font-semibold">{formatPrice(destinationBuckets.shelterAudits.toFixed(2), "USD")}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface rounded-sm">
            <span className="text-sm font-medium">Veteran Stipends</span>
            <span className="text-sm font-semibold">{formatPrice(destinationBuckets.veteranStipends.toFixed(2), "USD")}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] pt-4">
        <p className="text-xs text-muted-foreground">
          This receipt will be included with your order confirmation email. Impact allocations are logged in
          our quarterly Impact Ledger and verified through our audit process.
        </p>
      </div>
    </div>
  );
}



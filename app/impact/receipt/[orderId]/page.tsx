import { notFound } from "next/navigation";
import { ImpactReceipt } from "@/components/impact/impact-receipt";
import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import Link from "next/link";
import { buildCanonical } from "@/lib/utils";
import { publicEnv } from "@/lib/env";
import { ButtonLink } from "@/components/ui/button-link";

type Props = {
  params: Promise<{ orderId: string }>;
};

// Mock function - in production, fetch from database
async function getOrderImpact(orderId: string) {
  // This would fetch from your order database
  // For now, return mock data
  const orderAmount = 520.00;
  const impactAmount = orderAmount * 0.02;
  
  return {
    orderId,
    orderAmount,
    impactAmount,
    date: new Date().toISOString(),
    destinationBuckets: {
      k9Grants: impactAmount * 0.5,
      shelterAudits: impactAmount * 0.3,
      veteranStipends: impactAmount * 0.2,
    },
    ledgerReport: {
      quarter: 3,
      year: 2024,
      lineItems: [
        {
          date: "2024-09-15",
          deployedTo: "Denver K9 Unit",
          proof: "Receipt #DNV-2024-001",
          amount: 10.40,
        },
      ],
    },
  };
}

export async function generateMetadata({ params }: Props) {
  const { orderId } = await params;
  return {
    title: `Impact Receipt: ${orderId}`,
    description: "View your order's impact contribution and where your 2% for the Pack went.",
    alternates: {
      canonical: buildCanonical(`/impact/receipt/${orderId}`, publicEnv.siteUrl),
    },
    robots: {
      index: false, // Don't index individual receipts
      follow: false,
    },
  };
}

export default async function ImpactReceiptPage({ params }: Props) {
  const { orderId } = await params;
  const orderImpact = await getOrderImpact(orderId);

  if (!orderImpact) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs
        items={[
          { label: "Impact", href: "/impact" },
          { label: "Receipt", href: "/impact-ledger" },
          { label: orderId },
        ]}
      />
      <section className="container-width py-16 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <TapSeal label="Impact Receipt" detail={orderId} />
          <h1 className="h1">Your Impact Contribution</h1>
          <p className="text-lg text-muted-foreground">
            This receipt shows how your purchase contributed to our 2% for the Pack program and where those
            funds were deployed.
          </p>
        </div>

        <ImpactReceipt
          orderId={orderImpact.orderId}
          orderAmount={orderImpact.orderAmount}
          impactAmount={orderImpact.impactAmount}
          date={orderImpact.date}
          destinationBuckets={orderImpact.destinationBuckets}
        />

        <div className="rounded-sm border border-[var(--border)] bg-surface-strong p-8 space-y-6">
          <h2 className="text-2xl font-semibold">Where Your 2% Went</h2>
          <div className="space-y-4">
            {orderImpact.ledgerReport.lineItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-surface rounded-sm border border-[var(--border)]"
              >
                <div>
                  <p className="font-semibold">{item.deployedTo}</p>
                  <p className="text-sm text-muted-foreground">{item.proof}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                </div>
                <p className="text-lg font-semibold">${item.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            This allocation is part of Q{orderImpact.ledgerReport.quarter} {orderImpact.ledgerReport.year}
            Impact Ledger. View the full ledger for complete transparency.
          </p>
	        </div>

	        <div className="flex flex-col sm:flex-row gap-4">
	          <ButtonLink href="/impact-ledger" size="lg">
	            View Full Impact Ledger
	          </ButtonLink>
	          <ButtonLink href="/account" variant="outline" size="lg">
	            View Order History
	          </ButtonLink>
	        </div>
	      </section>
	    </div>
  );
}


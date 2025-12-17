"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ImpactReceipt } from "@/components/impact/impact-receipt";
import { TapSeal } from "@/components/patriotism";
import { CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/button-link";

export function CheckoutConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const orderAmount = 520.0;
  const impactAmount = orderAmount * 0.02;
  const destinationBuckets = {
    k9Grants: impactAmount * 0.5,
    shelterAudits: impactAmount * 0.3,
    veteranStipends: impactAmount * 0.2,
  };

  useEffect(() => {
    if (!orderId) return;
    trackEvent("purchase", {
      order_id: orderId,
      value: orderAmount,
    });
  }, [orderId, orderAmount]);

  if (!orderId) {
    return (
      <div className="container-width py-16 text-center space-y-6">
        <h1 className="h1">Order Confirmation</h1>
        <p className="text-muted-foreground">No order ID provided.</p>
        <ButtonLink href="/">Return Home</ButtonLink>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <section className="container-width py-16 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-secondary)]/10">
              <CheckCircle2 className="h-8 w-8 text-[var(--accent-secondary)]" />
            </div>
          </div>
          <TapSeal label="Order Confirmed" detail="Thank You" className="justify-center" />
          <h1 className="h1">Your Order is Confirmed</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for supporting the mission. Your gear will ship within 24 hours, and your impact receipt is below.
          </p>
        </div>

        <ImpactReceipt
          orderId={orderId}
          orderAmount={orderAmount}
          impactAmount={impactAmount}
          date={new Date().toISOString()}
          destinationBuckets={destinationBuckets}
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonLink href="/account" size="lg">
            View Order History
          </ButtonLink>
          <ButtonLink href="/impact-ledger" variant="outline" size="lg">
            View Impact Ledger
          </ButtonLink>
          <ButtonLink href="/shop" variant="outline" size="lg">
            Continue Shopping
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}


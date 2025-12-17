import { Suspense } from "react";
import { CheckoutConfirmationClient } from "./confirmation-client";

export const metadata = {
  title: "Order Confirmed — True American Pets",
  description: "Your order is confirmed. View your impact receipt and next steps.",
};

export default function CheckoutConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="container-width py-16 text-center space-y-6">
          <h1 className="h1">Order Confirmation</h1>
          <p className="text-muted-foreground">Loading your receipt…</p>
        </div>
      }
    >
      <CheckoutConfirmationClient />
    </Suspense>
  );
}


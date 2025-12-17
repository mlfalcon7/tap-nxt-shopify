"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/utils";

type Step = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>("shipping");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  if (!cart || cart.totalQuantity === 0) {
    return (
      <div className="container-width py-16 text-center space-y-6">
        <h1 className="h1">Your cart is empty</h1>
        <p className="text-muted-foreground">Add items to your cart to continue.</p>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const subtotal = cart.cost?.totalAmount?.amount ? parseFloat(cart.cost.totalAmount.amount) : 0;
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // Example tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-background text-foreground">
      <div className="container-width py-12">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-link hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to cart
        </Link>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main checkout form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress steps */}
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${currentStep === "shipping" ? "text-foreground" : currentStep === "payment" || currentStep === "review" ? "text-muted-foreground" : ""}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${currentStep === "shipping" ? "border-foreground" : "border-muted-foreground"}`}>
                  1
                </div>
                <span className="text-sm font-semibold">Shipping</span>
              </div>
              <div className="flex-1 h-px bg-border" />
              <div className={`flex items-center gap-2 ${currentStep === "payment" ? "text-foreground" : currentStep === "review" ? "text-muted-foreground" : "text-muted-foreground"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${currentStep === "payment" || currentStep === "review" ? "border-foreground" : "border-muted-foreground"}`}>
                  2
                </div>
                <span className="text-sm font-semibold">Payment</span>
              </div>
              <div className="flex-1 h-px bg-border" />
              <div className={`flex items-center gap-2 ${currentStep === "review" ? "text-foreground" : "text-muted-foreground"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${currentStep === "review" ? "border-foreground" : "border-muted-foreground"}`}>
                  3
                </div>
                <span className="text-sm font-semibold">Review</span>
              </div>
            </div>

            {/* Step content */}
            {currentStep === "shipping" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Shipping Information</h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCurrentStep("payment");
                  }}
                >
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-semibold mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-semibold mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}

            {currentStep === "payment" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Payment Information</h2>
                <div className="rounded-sm border border-[var(--border)] bg-surface-strong p-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Payment processing will be handled securely through Shopify Checkout. Clicking "Continue to Review"
                    will redirect you to complete your payment.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Accepted Payment Methods</p>
                    <div className="flex flex-wrap gap-2">
                      {["Visa", "Mastercard", "American Express", "PayPal", "Shop Pay"].map((method) => (
                        <span
                          key={method}
                          className="inline-block rounded border border-[var(--border)] px-3 py-1 text-xs text-muted-foreground"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep("shipping")}>
                    Back
                  </Button>
                  <Button size="lg" onClick={() => setCurrentStep("review")} className="flex-1">
                    Continue to Review
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "review" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Review Your Order</h2>
                <div className="space-y-4 rounded-sm border border-[var(--border)] bg-surface p-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold">Shipping Address</h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.firstName} {formData.lastName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.state} {formData.zip}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[var(--border)]">
                    <h3 className="font-semibold mb-2">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      {cart.lines?.edges?.map((edge) => {
                        const line = edge.node;
                        return (
                          <div key={line.id} className="flex justify-between">
                            <span>
                              {line.merchandise?.product?.title} × {line.quantity}
                            </span>
                            <span>{formatPrice(line.cost?.totalAmount?.amount || "0", line.cost?.totalAmount?.currencyCode || "USD")}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep("payment")}>
                    Back
                  </Button>
                  <Link href={`/checkout?cartId=${cart.id}`} className="flex-1">
                    <Button size="lg" className="w-full">
                      Complete Order
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 rounded-sm border border-[var(--border)] bg-surface p-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="space-y-3 text-sm">
                {cart.lines?.edges && cart.lines.edges.length > 0 && (
                  <div className="space-y-2 pb-3 border-b border-[var(--border)]">
                    {cart.lines.edges.map((edge) => {
                      const line = edge.node;
                      return (
                        <div key={line.id} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            {line.merchandise?.product?.title} × {line.quantity}
                          </span>
                          <span>{formatPrice(line.cost?.totalAmount?.amount || "0", line.cost?.totalAmount?.currencyCode || "USD")}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal.toFixed(2), cart.cost?.totalAmount?.currencyCode || "USD")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(tax.toFixed(2), cart.cost?.totalAmount?.currencyCode || "USD")}</span>
                </div>
                <div className="pt-3 border-t border-[var(--border)] flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total.toFixed(2), cart.cost?.totalAmount?.currencyCode || "USD")}</span>
                </div>
              </div>
              <div className="pt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Lifetime Hero Guarantee</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Free shipping on all orders</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>2% for the Pack included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


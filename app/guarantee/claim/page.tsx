"use client";

import { useState } from "react";
import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { submitWarrantyClaim } from "./actions";

type IssueType = "hardware_failure" | "material_defect" | "stitching_failure" | "reflective_loss" | "other";
type Resolution = "repair" | "replace" | "refund";

export default function WarrantyClaimPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [formData, setFormData] = useState({
    orderId: "",
    email: "",
    productSlug: "",
    issueType: "hardware_failure" as IssueType,
    description: "",
    photos: [] as File[],
    preferredResolution: "repair" as Resolution,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    trackEvent("start_claim", {
      product_slug: formData.productSlug,
      issue_type: formData.issueType,
    });

    try {
      const result = await submitWarrantyClaim(formData);
      setReferenceNumber(result.referenceNumber);
      setStatus("submitted");
      
      trackEvent("submit_claim", {
        reference_number: result.referenceNumber,
        product_slug: formData.productSlug,
      });
    } catch (error) {
      setStatus("error");
    }
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFormData({ ...formData, photos: Array.from(e.target.files) });
    }
  }

  if (status === "submitted") {
    return (
      <div className="bg-background text-foreground">
        <Breadcrumbs
          items={[
            { label: "Guarantee", href: "/guarantee" },
            { label: "Claim Submitted" },
          ]}
        />
        <section className="container-width py-16 space-y-8 max-w-2xl mx-auto text-center">
          <div className="space-y-6">
            <TapSeal label="Claim Submitted" detail="Reference Number" />
            <h1 className="h1">Your Claim Has Been Received</h1>
            <div className="rounded-sm border border-[var(--border)] bg-surface-strong p-8 space-y-4">
              <p className="text-sm font-semibold text-muted-foreground">Reference Number</p>
              <p className="text-3xl font-mono font-bold">{referenceNumber}</p>
              <p className="text-sm text-muted-foreground">
                Save this number for your records. You'll receive a confirmation email at {formData.email}
                within 24 hours with next steps.
              </p>
            </div>
            <div className="space-y-3 text-left">
              <h3 className="font-semibold">What Happens Next</h3>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Our safety desk reviews your claim (usually within 24 hours)</li>
                <li>We'll email you with our recommended resolution</li>
                <li>If approved, we'll ship your replacement or repair within 48 hours</li>
              </ol>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => window.location.href = "/guarantee"}>
                Back to Guarantee Page
              </Button>
              <Button variant="outline" onClick={() => setStatus("idle")}>
                Submit Another Claim
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs
        items={[
          { label: "Guarantee", href: "/guarantee" },
          { label: "Submit Claim" },
        ]}
      />
      <section className="container-width py-16 space-y-12 max-w-3xl">
        <div className="space-y-6">
          <TapSeal label="Submit Claim" detail="Lifetime Hero Guarantee" />
          <h1 className="h1">Warranty Claim Form</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Fill out this form to submit a warranty claim. Include photos if possible to help us process
            your claim faster.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="orderId" className="block text-sm font-semibold mb-2">
                Order ID (Optional)
              </label>
              <input
                type="text"
                id="orderId"
                value={formData.orderId}
                onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <label htmlFor="productSlug" className="block text-sm font-semibold mb-2">
              Product *
            </label>
            <input
              type="text"
              id="productSlug"
              required
              placeholder="e.g., hero-recon-vest"
              value={formData.productSlug}
              onChange={(e) => setFormData({ ...formData, productSlug: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label htmlFor="issueType" className="block text-sm font-semibold mb-2">
              Issue Type *
            </label>
            <select
              id="issueType"
              required
              value={formData.issueType}
              onChange={(e) => setFormData({ ...formData, issueType: e.target.value as IssueType })}
              className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="hardware_failure">Hardware Failure</option>
              <option value="material_defect">Material Defect</option>
              <option value="stitching_failure">Stitching Failure</option>
              <option value="reflective_loss">Reflective Material Loss</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-2">
              Description *
            </label>
            <textarea
              id="description"
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Describe the issue in detail..."
            />
          </div>

          <div>
            <label htmlFor="photos" className="block text-sm font-semibold mb-2">
              Photos (Optional)
            </label>
            <input
              type="file"
              id="photos"
              multiple
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {formData.photos.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                {formData.photos.length} photo(s) selected
              </p>
            )}
          </div>

          <div>
            <label htmlFor="preferredResolution" className="block text-sm font-semibold mb-2">
              Preferred Resolution *
            </label>
            <select
              id="preferredResolution"
              required
              value={formData.preferredResolution}
              onChange={(e) => setFormData({ ...formData, preferredResolution: e.target.value as Resolution })}
              className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="repair">Repair</option>
              <option value="replace">Replace</option>
              <option value="refund">Refund</option>
            </select>
          </div>

          {status === "error" && (
            <div className="rounded-sm border border-[var(--accent-secondary)] bg-[var(--accent-secondary)]/10 p-4">
              <p className="text-sm text-[var(--accent-secondary)]">
                There was an error submitting your claim. Please try again.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting..." : "Submit Claim"}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => window.location.href = "/guarantee"}>
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}



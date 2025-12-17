"use client";

import { useState } from "react";
import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { submitHeroProfile } from "./actions";

export default function SubmitHeroPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [formData, setFormData] = useState({
    dogName: "",
    handlerName: "",
    role: "family" as const,
    location: "",
    story: "",
    gearOwned: [] as string[],
    fitNotes: "",
    email: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    
    trackEvent("submit_hero", {
      dog_name: formData.dogName,
      role: formData.role,
    });

    try {
      await submitHeroProfile(formData);
      setStatus("submitted");
    } catch (error) {
      setStatus("error");
    }
  }

  if (status === "submitted") {
    return (
      <div className="bg-background text-foreground">
        <Breadcrumbs
          items={[
            { label: "Heroes", href: "/heroes" },
            { label: "Submit Hero" },
          ]}
        />
        <section className="container-width py-16 space-y-8 max-w-2xl mx-auto text-center">
          <div className="space-y-4">
            <h1 className="h1">Thank You for Your Submission</h1>
            <p className="text-lg text-muted-foreground">
              Your hero profile has been submitted and is pending review. We'll notify you at {formData.email} once it's been approved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => window.location.href = "/heroes"}>
                View Hero Registry
              </Button>
              <Button variant="outline" onClick={() => setStatus("idle")}>
                Submit Another
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
          { label: "Heroes", href: "/heroes" },
          { label: "Submit Hero" },
        ]}
      />
      <section className="container-width py-16 space-y-12 max-w-3xl">
        <div className="space-y-6">
          <TapSeal label="Nominate a Hero" detail="Hero Registry" />
          <h1 className="h1">Share Your Hero's Story</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Help us build the Hero Registry by sharing your dog's story, mission, and how TAP gear supports
            their work. All submissions are reviewed before publication.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="dogName" className="block text-sm font-semibold mb-2">
                Dog's Name *
              </label>
              <input
                type="text"
                id="dogName"
                required
                value={formData.dogName}
                onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="handlerName" className="block text-sm font-semibold mb-2">
                Handler Name
              </label>
              <input
                type="text"
                id="handlerName"
                value={formData.handlerName}
                onChange={(e) => setFormData({ ...formData, handlerName: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="role" className="block text-sm font-semibold mb-2">
                Role *
              </label>
              <select
                id="role"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="service">Service Dog</option>
                <option value="rescue">Rescue Hero</option>
                <option value="k9">K9 Unit</option>
                <option value="therapy">Therapy Dog</option>
                <option value="family">Family Hero</option>
                <option value="veteran">Veteran Support</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-semibold mb-2">
                Location *
              </label>
              <input
                type="text"
                id="location"
                required
                placeholder="City, State"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
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
            <p className="text-xs text-muted-foreground mt-1">
              We'll only use this to notify you when your submission is approved.
            </p>
          </div>

          <div>
            <label htmlFor="story" className="block text-sm font-semibold mb-2">
              Hero's Story *
            </label>
            <textarea
              id="story"
              required
              rows={6}
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Tell us about your hero's mission, how they help, and how TAP gear supports their work..."
            />
          </div>

          <div>
            <label htmlFor="gearOwned" className="block text-sm font-semibold mb-2">
              TAP Gear Owned
            </label>
            <p className="text-xs text-muted-foreground mb-2">
              Which TAP products does your hero use? (You can add multiple)
            </p>
            <input
              type="text"
              id="gearOwned"
              placeholder="e.g., hero-recon-vest, field-id-collar"
              value={formData.gearOwned.join(", ")}
              onChange={(e) => setFormData({ ...formData, gearOwned: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
              className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label htmlFor="fitNotes" className="block text-sm font-semibold mb-2">
              Fit Notes (Optional)
            </label>
            <textarea
              id="fitNotes"
              rows={3}
              value={formData.fitNotes}
              onChange={(e) => setFormData({ ...formData, fitNotes: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--border)] bg-surface rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Any notes about fit, comfort, or performance..."
            />
          </div>

          {status === "error" && (
            <div className="rounded-sm border border-[var(--accent-secondary)] bg-[var(--accent-secondary)]/10 p-4">
              <p className="text-sm text-[var(--accent-secondary)]">
                There was an error submitting your hero profile. Please try again.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting..." : "Submit Hero Profile"}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => window.location.href = "/heroes"}>
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}



"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { TAPMark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { campaigns } from "@/lib/campaigns";
import { trackEvent } from "@/lib/analytics";
import type { ComponentProps } from "react";

export function ActionCenter() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleHeroAlerts(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    trackEvent("newsletter_signup", {
      channel: "hero_alerts",
      email: formData.get("email"),
      phone: formData.get("phone"),
    });
    setStatus("submitted");
  }

  return (
    <footer className="action-band border-t">
      <div className="container-width pt-14 pb-10 flex justify-center md:justify-start">
        <TAPMark variant="footer" />
      </div>
      <div className="container-width pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <section className="space-y-6">
          <p className="eyebrow text-[var(--accent)]">
            Act Now
          </p>
          <ul className="space-y-4 text-sm font-medium">
            <li>
              <ActionLink href="/manifesto">
                Sign the Pet Safety Pledge
              </ActionLink>
            </li>
            <li>
              <ActionLink href="/hall-of-heroes">
                Find a Local Hero
              </ActionLink>
            </li>
            <li>
              <ActionLink href="/campaigns">Pack Walks &amp; Meetups</ActionLink>
            </li>
            <li>
              <ActionLink href="/fund-a-vest">Fund a Vest</ActionLink>
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <p className="eyebrow text-[var(--accent)]">
            CAMPAIGNS
          </p>
          <ul className="space-y-4 text-sm">
            {campaigns.map((campaign) => (
              <li key={campaign.slug}>
                <Link
                  href={`/campaigns/${campaign.slug}`}
                  className="block text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors"
                >
                  <span className="font-bold block">{campaign.title}</span>
                  <span className="opacity-70 text-xs">
                    {campaign.excerpt}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <p className="eyebrow text-[var(--accent)]">
            MORE
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/manifesto" className="text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors hover:underline">
                Manifesto
              </Link>
            </li>
            <li>
              <Link href="/hall-of-heroes" className="text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors hover:underline">
                Hall of Heroes
              </Link>
            </li>
            <li>
              <Link href="/stories/from-rescue-to-royalty" className="text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors hover:underline">
                From Rescue to Royalty stories
              </Link>
            </li>
            <li>
              <Link href="/impact" className="text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors hover:underline">
                2% for the Pack
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors hover:underline">
                Safety standards &amp; testing
              </Link>
            </li>
            <li>
              <Link href="/tools" className="text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors hover:underline">
                Interactive Tools
              </Link>
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <p className="eyebrow text-[var(--accent)]">
            Join the Mission
          </p>
          <p className="text-base leading-relaxed text-[var(--action-band-text)]">
            Be first to know when a hero needs help — and when limited drops go live.
          </p>
          {status === "submitted" ? (
            <p className="text-base font-semibold text-[var(--action-band-text)]">
              Welcome to the watchlist. Check your inbox for confirmation.
            </p>
          ) : (
            <form className="space-y-3" onSubmit={handleHeroAlerts}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full rounded-none border border-[var(--action-band-text)] bg-[color-mix(in_srgb,var(--action-band-text)_12%,transparent)] px-4 py-3 text-base text-[var(--action-band-text)] placeholder:text-[color-mix(in_srgb,var(--action-band-text)_60%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--action-band-bg)]"
              />
              <input
                type="tel"
                name="phone"
                placeholder="SMS number"
                className="w-full rounded-none border border-[var(--action-band-text)] bg-[color-mix(in_srgb,var(--action-band-text)_12%,transparent)] px-4 py-3 text-base text-[var(--action-band-text)] placeholder:text-[color-mix(in_srgb,var(--action-band-text)_60%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--action-band-bg)]"
              />
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary-hover h-11 text-base"
              >
                Join Hero Alerts
              </Button>
            </form>
          )}
          <div className="pt-4 border-t border-[color-mix(in_srgb,var(--action-band-text)_30%,transparent)]">
            <Link href="/impact-ledger" className="inline-flex items-center text-base font-semibold text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors">
              See the Impact Ledger
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="pt-4 border-t border-[color-mix(in_srgb,var(--action-band-text)_30%,transparent)]">
            <p className="text-sm font-semibold text-[var(--action-band-text)] mb-2">Find a Partner</p>
            <p className="text-sm text-[color-mix(in_srgb,var(--action-band-text)_80%,transparent)] mb-3">
              Connect with TAP-certified retailers and service providers in your area who share our mission.
            </p>
            <Link href="/find-a-partner" className="text-sm font-semibold text-[var(--accent)] hover:underline">
              Find a Partner →
            </Link>
          </div>
        </section>
      </div>

      <div className="border-t">
        <div className="container-width py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-90">
          <div className="flex items-center gap-4">
            <TAPMark variant="footer" className="opacity-90" />
            <p className="text-[var(--action-band-text)]">© {new Date().getFullYear()} True American Pets. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex space-x-6">
              <Link href="/policies/privacy" className="text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors">
                Privacy
              </Link>
              <Link href="/policies/terms" className="text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors">
                Terms
              </Link>
              <Link href="/policies/shipping" className="text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors">
                Shipping
              </Link>
              <Link href="/policies/returns" className="text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors">
                Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

type LinkHref = ComponentProps<typeof Link>["href"];

function ActionLink({
  href,
  children,
}: {
  href: LinkHref;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between text-[var(--action-band-text)] hover:text-[var(--accent)] transition-colors hover:underline"
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--action-band-text)] group-hover:text-[var(--accent)]" />
    </Link>
  );
}

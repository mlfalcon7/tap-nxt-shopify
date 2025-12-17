import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Award, Clock, Phone, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata = {
  title: "Lifetime Hero Guarantee — US Protocol",
  description: "If gear ever fails in the field, we'll repair, replace, or refund. No questions asked. 24-hour safety desk support.",
  alternates: {
    canonical: "/us-protocol/guarantee",
  },
};

export default function GuaranteePage() {
  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs
        items={[
          { label: "US Protocol", href: "/us-protocol" },
          { label: "Lifetime Guarantee" },
        ]}
      />
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <TapSeal label="Lifetime Hero Guarantee" detail="US Protocol" />
          <h1 className="h1">No Questions Asked</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            If your TAP gear ever fails during normal mission use, we'll repair it, replace it, or refund it.
            No questions asked. This isn't a warranty—it's a guarantee that your hero's equipment will perform
            when it matters.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="border border-[var(--border)] bg-surface rounded-sm p-6 space-y-3">
            <Award className="h-8 w-8 text-[var(--accent-secondary)]" />
            <h3 className="font-semibold">What's Covered</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Hardware failure (buckles, D-rings, clasps)</li>
              <li>• Material defects (tears, fraying, degradation)</li>
              <li>• Stitching failures</li>
              <li>• Reflective material loss</li>
            </ul>
          </div>

          <div className="border border-[var(--border)] bg-surface rounded-sm p-6 space-y-3">
            <Clock className="h-8 w-8 text-[var(--accent-secondary)]" />
            <h3 className="font-semibold">Response Time</h3>
            <p className="text-sm text-muted-foreground">
              Our 24-hour safety desk responds to all guarantee claims within one business day. Most repairs
              or replacements ship within 48 hours.
            </p>
          </div>

          <div className="border border-[var(--border)] bg-surface rounded-sm p-6 space-y-3">
            <Phone className="h-8 w-8 text-[var(--accent-secondary)]" />
            <h3 className="font-semibold">How to Claim</h3>
            <p className="text-sm text-muted-foreground">
              Contact our safety desk with photos and a brief description. We'll process your claim
              immediately.
            </p>
          </div>
        </div>

        <section className="rounded-sm border border-[var(--border)] bg-surface-strong p-8 space-y-6">
          <h2 className="text-2xl font-semibold">Guarantee Process</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-secondary)] text-white font-semibold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Report the Issue</h3>
                <p className="text-sm text-muted-foreground">
                  Email safety@trueamericanpets.com or call (800) 555-1234 with photos and details.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-secondary)] text-white font-semibold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">We Review</h3>
                <p className="text-sm text-muted-foreground">
                  Our safety desk reviews your claim and determines the best resolution (repair, replace, or
                  refund).
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-secondary)] text-white font-semibold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Resolution</h3>
                <p className="text-sm text-muted-foreground">
                  We ship your replacement or repair within 48 hours, or process your refund immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

	        <div className="flex flex-col sm:flex-row gap-4">
	          <ButtonLink href="/contact" size="lg">
	            Contact Safety Desk
	          </ButtonLink>
	          <ButtonLink href="/us-protocol" variant="outline" size="lg">
	            Back to US Protocol
	          </ButtonLink>
	        </div>
	      </section>
	    </div>
  );
}


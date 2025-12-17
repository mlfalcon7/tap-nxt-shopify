import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ButtonLink } from "@/components/ui/button-link";
import { Award, Clock, Phone, Mail, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Lifetime Hero Guarantee",
  description: "If gear ever fails in the field, we'll repair, replace, or refund. No questions asked. 24-hour safety desk support.",
  alternates: {
    canonical: "/guarantee",
  },
};

export default function GuaranteePage() {
  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs items={[{ label: "Lifetime Hero Guarantee" }]} />
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <TapSeal label="Lifetime Hero Guarantee" detail="No Questions Asked" />
          <h1 className="h1">If It Fails, We Fix It</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Your TAP gear is backed by our Lifetime Hero Guarantee. If it ever fails during normal mission
            use, we'll repair it, replace it, or refund it. No questions asked.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="border border-[var(--border)] bg-surface rounded-sm p-6 space-y-3">
            <Award className="h-8 w-8 text-[var(--accent-secondary)]" />
            <h3 className="font-semibold">What's Covered</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Hardware failure</li>
              <li>• Material defects</li>
              <li>• Stitching failures</li>
              <li>• Reflective material loss</li>
            </ul>
          </div>

          <div className="border border-[var(--border)] bg-surface rounded-sm p-6 space-y-3">
            <Clock className="h-8 w-8 text-[var(--accent-secondary)]" />
            <h3 className="font-semibold">Response Time</h3>
            <p className="text-sm text-muted-foreground">
              Our 24-hour safety desk responds to all claims within one business day. Most repairs or
              replacements ship within 48 hours.
            </p>
          </div>

          <div className="border border-[var(--border)] bg-surface rounded-sm p-6 space-y-3">
            <Phone className="h-8 w-8 text-[var(--accent-secondary)]" />
            <h3 className="font-semibold">How to Claim</h3>
            <p className="text-sm text-muted-foreground">
              Submit a claim with photos and details. We'll process it immediately and get you a resolution
              fast.
            </p>
          </div>
        </div>

	        <div className="flex flex-col sm:flex-row gap-4">
	          <ButtonLink href="/guarantee/claim" size="lg">
	            Submit a Claim
	            <ArrowRight className="ml-2 h-4 w-4" />
	          </ButtonLink>
	          <ButtonLink href="/us-protocol/guarantee" variant="outline" size="lg">
	            Learn More About the Guarantee
	          </ButtonLink>
	        </div>
	      </section>
	    </div>
  );
}


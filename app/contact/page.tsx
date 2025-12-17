import { Button } from "@/components/ui/button";
import { TapSeal } from "@/components/patriotism";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact",
  description: "Get in touch with True American Pets — questions, support, partnerships.",
};

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="container-width py-16 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <TapSeal label="Contact" detail="Get in Touch" />
          <h1 className="h1">We're Here to Help</h1>
          <p className="text-lg text-muted-foreground">
            Have questions about gear, safety standards, partnerships, or impact? Reach out and we'll get back to you
            within 24 hours.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3 rounded-sm border border-[var(--border)] bg-surface p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-surface-strong">
              <Mail className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-sm text-muted-foreground">General inquiries</p>
            <a href="mailto:hello@trueamericanpets.com" className="text-sm text-link hover:underline">
              hello@trueamericanpets.com
            </a>
          </div>

          <div className="space-y-3 rounded-sm border border-[var(--border)] bg-surface p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-surface-strong">
              <Phone className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Phone</h3>
            <p className="text-sm text-muted-foreground">Safety desk (24/7)</p>
            <a href="tel:+18005551234" className="text-sm text-link hover:underline">
              (800) 555-1234
            </a>
          </div>

          <div className="space-y-3 rounded-sm border border-[var(--border)] bg-surface p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-surface-strong">
              <MapPin className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Location</h3>
            <p className="text-sm text-muted-foreground">Headquarters</p>
            <p className="text-sm text-foreground">
              1234 Mission Drive
              <br />
              Denver, CO 80202
            </p>
          </div>

          <div className="space-y-3 rounded-sm border border-[var(--border)] bg-surface p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-surface-strong">
              <Clock className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Hours</h3>
            <p className="text-sm text-muted-foreground">Support desk</p>
            <p className="text-sm text-foreground">
              Mon–Fri: 9am–6pm MT
              <br />
              Sat–Sun: 10am–4pm MT
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div className="grid gap-12 lg:grid-cols-2 mt-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option>General Inquiry</option>
                  <option>Product Question</option>
                  <option>Safety Concern</option>
                  <option>Partnership Inquiry</option>
                  <option>Impact Question</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Button type="submit" size="lg">
                Send Message
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Quick Links</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Safety & Support</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <a href="/safety-standards" className="hover:text-link hover:underline">
                      Safety Standards
                    </a>
                  </li>
                  <li>
                    <a href="/policies/shipping" className="hover:text-link hover:underline">
                      Shipping Information
                    </a>
                  </li>
                  <li>
                    <a href="/policies/returns" className="hover:text-link hover:underline">
                      Returns & Exchanges
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Partnerships</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <a href="/find-a-partner" className="hover:text-link hover:underline">
                      Find a Partner
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-link hover:underline">
                      Become a Partner
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Impact</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <a href="/impact" className="hover:text-link hover:underline">
                      Impact Ledger
                    </a>
                  </li>
                  <li>
                    <a href="/campaigns" className="hover:text-link hover:underline">
                      Active Campaigns
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



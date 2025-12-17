import Link from "next/link";
import { TapSeal } from "@/components/patriotism";
import { ButtonLink } from "@/components/ui/button-link";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Find a Partner",
  description: "Verified partners nationwide — find your local TAP-certified partner.",
};

// Mock partner data - replace with real data source later
const partners = [
  {
    id: "1",
    name: "Mountain K9 Supply",
    location: "Denver, CO",
    address: "1234 Mission Street, Denver, CO 80202",
    phone: "(303) 555-0123",
    email: "info@mountaink9.com",
    website: "https://mountaink9.com",
    specialties: ["Service K9", "Adventure Gear", "Field Testing"],
  },
  {
    id: "2",
    name: "Coastal Canine Equipment",
    location: "Portland, OR",
    address: "5678 Hero Way, Portland, OR 97201",
    phone: "(503) 555-0456",
    email: "contact@coastalk9.com",
    website: "https://coastalk9.com",
    specialties: ["Everyday Gear", "ID Tags", "Bundles"],
  },
  {
    id: "3",
    name: "Prairie Dog Provisions",
    location: "Austin, TX",
    address: "9012 Pack Road, Austin, TX 78701",
    phone: "(512) 555-0789",
    email: "hello@prairiedog.com",
    website: "https://prairiedog.com",
    specialties: ["Night Safety", "Harnesses", "Vests"],
  },
];

export default function FindAPartnerPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="container-width py-16 space-y-8">
        <div className="space-y-4 max-w-3xl">
          <TapSeal label="Verified Partners" detail="Nationwide Network" />
          <h1 className="h1">Find a Partner</h1>
          <p className="text-lg text-muted-foreground">
            Connect with TAP-certified partners in your area. These verified retailers and service providers share our
            mission and can help you find the right gear for your hero.
          </p>
        </div>

        {/* Map placeholder - can be replaced with actual map component */}
        <div className="mt-12 rounded-sm border border-[var(--border)] bg-surface-strong h-[400px] flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
          </div>
        </div>

        {/* Partner directory */}
        <div className="mt-12 space-y-8">
          <h2 className="text-2xl font-semibold">Verified Partners</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="space-y-4 rounded-sm border border-[var(--border)] bg-surface p-6"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{partner.name}</h3>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{partner.location}</p>
                      <p className="text-xs">{partner.address}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${partner.phone}`} className="hover:text-link transition-colors">
                      {partner.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${partner.email}`} className="hover:text-link transition-colors">
                      {partner.email}
                    </a>
                  </div>
                  {partner.website && (
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-link transition-colors"
                      >
                        Visit website
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[var(--border)]">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    Specialties
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {partner.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-block rounded-full border border-[var(--border)] px-2 py-1 text-xs text-muted-foreground"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Become a partner CTA */}
	        <section className="mt-16 rounded-sm border border-[var(--border)] bg-surface-strong p-8 text-center space-y-4">
	          <h2 className="text-2xl font-semibold">Become a TAP Partner</h2>
	          <p className="text-muted-foreground max-w-2xl mx-auto">
	            Are you a retailer or service provider who shares our mission? Join our network of verified partners and
	            help heroes across the country.
	          </p>
	          <ButtonLink href="/contact">Apply to Become a Partner</ButtonLink>
	        </section>
	      </section>
	    </div>
  );
}

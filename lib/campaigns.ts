export type Campaign = {
  slug: string;
  title: string;
  heroImage: string;
  excerpt: string;
  body: string;
  cta: string;
};

export const campaigns: Campaign[] = [
  {
    slug: "project-safe-neck",
    title: "Project Safe Neck",
    heroImage: "/placeholders/hero.jpg",
    excerpt: "Eliminating collar hazards in shelters nationwide.",
    body:
      "Project Safe Neck funds certified breakaway collars for overcrowded shelters and transport rescues. The initiative includes field-training staff on safe tethering protocols and providing impact-tested ID tags.",
    cta: "Fund a Collar Kit",
  },
  {
    slug: "operation-heatwave",
    title: "Operation Heatwave",
    heroImage: "/placeholders/impact.jpg",
    excerpt: "Deploying summer safety gear for working dogs.",
    body:
      "From cooling vests to rapid hydration rigs, Operation Heatwave equips K9 units with the gear they need when asphalt temps rise. Every kit includes education for handlers and signage for public outreach.",
    cta: "Send a Cooling Kit",
  },
  {
    slug: "service-dog-access",
    title: "Service Dog Access Protocol",
    heroImage: "/placeholders/hero.jpg",
    excerpt: "Ensuring every working dog is welcomed, not questioned.",
    body:
      "We partner with small businesses to certify access policies, provide door signage, and distribute the TAP Standards handbook so every handler can move without confrontation.",
    cta: "Sponsor Access Training",
  },
];

export function getCampaignBySlug(slug: string) {
  return campaigns.find((campaign) => campaign.slug === slug);
}

// Hero Registry data models and utilities

export type HeroRole = "service" | "rescue" | "k9" | "therapy" | "family" | "veteran";

export type HeroBadge = "US_PROTOCOL_USER" | "FIELD_TESTER" | "IMPACT_CHAMPION" | "COMMUNITY_LEADER";

export type HeroProfile = {
  slug: string;
  dogName: string;
  handlerName?: string;
  role: HeroRole;
  location: string;
  story: string;
  gearOwned: string[]; // product slugs
  fitNotes?: string;
  photos: {
    src: string;
    alt: string;
  }[];
  badges: HeroBadge[];
  status: "approved" | "pending" | "rejected";
  submittedAt: string;
  approvedAt?: string;
};

// Mock data - in production, this would come from a database
export const heroProfiles: HeroProfile[] = [
  {
    slug: "max-service-hero",
    dogName: "Max",
    handlerName: "Sarah Chen",
    role: "service",
    location: "Portland, OR",
    story: "Max is a certified service dog who helps me navigate daily life with mobility assistance. His TAP gear has been essential for maintaining his identification and safety during public access.",
    gearOwned: ["field-id-collar", "everyday-hero-leash"],
    fitNotes: "Medium collar fits perfectly. Leash has excellent grip even in wet conditions.",
    photos: [
      { src: "/placeholders/gear-1.jpg", alt: "Max wearing TAP gear" },
    ],
    badges: ["US_PROTOCOL_USER"],
    status: "approved",
    submittedAt: "2024-01-15T10:00:00Z",
    approvedAt: "2024-01-16T14:30:00Z",
  },
  {
    slug: "rocky-rescue-hero",
    dogName: "Rocky",
    handlerName: "Mike Rodriguez",
    role: "rescue",
    location: "Denver, CO",
    story: "Rocky was rescued from a high-kill shelter and now works as a therapy dog at local hospitals. His TAP collar and harness give us confidence during visits.",
    gearOwned: ["field-id-collar", "summit-harness"],
    photos: [
      { src: "/placeholders/gear-2.jpg", alt: "Rocky in therapy work" },
    ],
    badges: ["IMPACT_CHAMPION"],
    status: "approved",
    submittedAt: "2024-02-01T09:00:00Z",
    approvedAt: "2024-02-02T11:00:00Z",
  },
  {
    slug: "thor-k9-hero",
    dogName: "Thor",
    handlerName: "Officer James Wilson",
    role: "k9",
    location: "Austin, TX",
    story: "Thor is a working K9 unit member. His TAP vest and harness have been field-tested in real deployments and have never failed us.",
    gearOwned: ["hero-recon-vest", "summit-harness"],
    fitNotes: "Vest fits perfectly with MOLLE attachments. Harness load-balanced for long shifts.",
    photos: [
      { src: "/placeholders/gear-3.jpg", alt: "Thor in field deployment" },
    ],
    badges: ["US_PROTOCOL_USER", "FIELD_TESTER"],
    status: "approved",
    submittedAt: "2024-01-20T08:00:00Z",
    approvedAt: "2024-01-21T10:00:00Z",
  },
];

export function getHeroBySlug(slug: string): HeroProfile | undefined {
  return heroProfiles.find((hero) => hero.slug === slug);
}

export function getApprovedHeroes(): HeroProfile[] {
  return heroProfiles.filter((hero) => hero.status === "approved");
}

export function getHeroesByRole(role: HeroRole): HeroProfile[] {
  return getApprovedHeroes().filter((hero) => hero.role === role);
}

export function getHeroesByLocation(location: string): HeroProfile[] {
  return getApprovedHeroes().filter((hero) => 
    hero.location.toLowerCase().includes(location.toLowerCase())
  );
}

export function getHeroesByGear(productSlug: string): HeroProfile[] {
  return getApprovedHeroes().filter((hero) => 
    hero.gearOwned.includes(productSlug)
  );
}



export type Partner = {
  slug: string;
  name: string;
  city: string;
  state: string;
  specialty: string;
  services: string[];
  contact: string;
};

export const partners: Partner[] = [
  {
    slug: "rocky-mountain-k9",
    name: "Rocky Mountain K9",
    city: "Denver",
    state: "CO",
    specialty: "Search & Rescue",
    services: ["Field training", "Thermal audits"],
    contact: "rmk9@example.com",
  },
  {
    slug: "lone-star-heroes",
    name: "Lone Star Heroes",
    city: "Austin",
    state: "TX",
    specialty: "Shelter Safety",
    services: ["Breakaway kits", "Handler workshops"],
    contact: "support@lonestarheroes.org",
  },
  {
    slug: "great-lakes-veterans",
    name: "Great Lakes Veterans K9",
    city: "Chicago",
    state: "IL",
    specialty: "Veteran Support",
    services: ["Service dog matching", "Gear fitting"],
    contact: "hello@greatlakesveteransk9.com",
  },
];

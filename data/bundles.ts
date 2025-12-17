export type Bundle = {
  slug: string;
  title: string;
  description: string;
  items: string[];
  price: number;
  savings: string;
  image: string;
};

export const bundles: Bundle[] = [
  {
    slug: "hero-starter-pack",
    title: "Hero Starter Pack",
    description:
      "Field-ready vest, ID collar, and mission leash bundled for immediate deployments. Ships with TAP impact receipt.",
    items: ["Hero Recon Vest", "Field ID Collar", "Everyday Hero Leash"],
    price: 520,
    savings: "Save 12%",
    image: "/placeholders/gear-1.jpg",
  },
  {
    slug: "k9-ready-kit",
    title: "K9 Ready Kit",
    description:
      "Summit harness, signal patch set, and handler training guide. TAP Certified for US Protocol.",
    items: ["Summit Harness", "Signal Patch Set", "Handler Guide"],
    price: 260,
    savings: "Save 9%",
    image: "/placeholders/gear-2.jpg",
  },
];

import { ShieldCheck, Dog, Heart } from "lucide-react";

// ProofBar items (exact labels as specified)
export const proofItems = [
  "US Protocol Tested",
  "Traceable Components",
  "Lifetime Hero Guarantee",
  "2% for the Pack",
] as const;

// Rights Charter cards
export const rightsCharterCards = [
  {
    title: "Right to Identification",
    description: "Every hero deserves to be named, scanned, and home before nightfall.",
    icon: ShieldCheck,
  },
  {
    title: "Right to Adventure",
    description: "Equipment must enable mission miles, not limit them. Trail, tarmac, city grid.",
    icon: Dog,
  },
  {
    title: "Right to Recognition",
    description: "Heroes wear their mission openly. Our gear honors the dog–human contract.",
    icon: Heart,
  },
] as const;

// Mission tiles for Shop by Mission
export const missionTiles = [
  {
    title: "Everyday Family Dogs",
    description: "Daily walks. Weekend hikes. Real life.",
    href: "/shop?mission=everyday",
    includes: ["Everyday collars", "ID tags", "Adventure leashes"],
  },
  {
    title: "Service Dogs",
    description: "Clear ID. Access-ready. Handler-first.",
    href: "/shop?mission=service-dog",
    includes: ["Service vests", "ID tags", "Handler guides"],
  },
  {
    title: "Rescue Families",
    description: "Safe, traceable gear for new starts.",
    href: "/shop?mission=rescue",
    includes: ["Breakaway collars", "Shelter-certified ID", "Rescue starter packs"],
  },
  {
    title: "Working K9 Units",
    description: "Mission-grade, field-tested equipment.",
    href: "/shop?mission=k9",
    includes: ["Tactical vests", "Field harnesses", "Deployment kits"],
  },
] as const;

// Why It Costs More items
export const whyCostsMoreItems = [
  {
    title: "US Protocol Testing",
    description: "Rigorous thermal, abrasion, and impact labs in CO + NC vet every textile.",
  },
  {
    title: "2% for the Pack",
    description: "Every order funds K9 grants, shelter audits, and veteran stipends.",
  },
  {
    title: "Premium Materials",
    description: "Aerospace-grade aluminum, ballistic-tested textiles, serialized components.",
  },
  {
    title: "Lifetime Guarantee",
    description: "If gear fails during normal mission use, we repair, replace, or refund.",
  },
] as const;


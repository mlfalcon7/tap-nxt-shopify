export type ProductBadge =
  | "US_PROTOCOL"
  | "K9"
  | "VETERANS"
  | "SHELTERS"
  | "K9_ISSUE"
  | "LIMITED";

export type ProtocolProof = {
  title: string;
  detail: string;
};

export type Product = {
  id: string;
  title: string;
  handle: string;
  price: number;
  status: "available" | "preorder" | "notify";
  badges: ProductBadge[];
  category: string;
  description: string;
  specs: string[];
  materials: string[];
  protocols: ProtocolProof[];
  gallery: {
    src: string;
    alt: string;
  }[];
  rating: number;
  reviews: number;
  image: {
    src: string;
    alt: string;
  };
  tags?: string[];
};

export const products: Product[] = [
  {
    id: "hero-vest",
    title: "Hero Recon Vest",
    handle: "hero-recon-vest",
    price: 320,
    status: "available",
    badges: ["US_PROTOCOL", "K9"],
    category: "Vests",
    description: "Ballistic-tested vest with modular MOLLE panels and reflective ID.",
    specs: ["Ballistic mesh", "Quick-release buckles", "Night-visible ID"],
    materials: ["1000D Cordura shell", "Aerospace mesh lining", "Brass hardware"],
    protocols: [
      { title: "US Protocol 701", detail: "Thermal, abrasion, and tear tests in CO + NC labs" },
      { title: "Traceable Components", detail: "Serialized MOLLE and buckles logged in TAP ledger" },
    ],
    gallery: [
      { src: "/Gemini_Generated_Image_s0yhlgs0yhlgs0yh.png", alt: "Hero Recon Vest on alpine terrain" },
      { src: "/WhatsApp Image 2025-12-17 at 17.00.04.jpeg", alt: "Hero Recon Vest hardware details" },
      { src: "/WhatsApp Image 2025-12-17 at 17.00.42.jpeg", alt: "Hero Recon Vest MOLLE attachments" },
    ],
    rating: 4.9,
    reviews: 212,
    image: {
      src: "/Gemini_Generated_Image_s0yhlgs0yhlgs0yh.png",
      alt: "Hero Recon Vest",
    },
    tags: ["k9", "deployment", "field"],
  },
  {
    id: "summit-harness",
    title: "Summit Harness",
    handle: "summit-harness",
    price: 190,
    status: "available",
    badges: ["US_PROTOCOL"],
    category: "Harnesses",
    description: "Load-balanced harness with GPS pocket and waterproof taping.",
    specs: ["GPS pocket", "Anti-chafe lining", "Nylon webbing"],
    materials: ["Hypalon reinforcement", "Triple-stitched nylon straps", "Brass D-rings"],
    protocols: [
      { title: "K9 Field Trials", detail: "Load-balanced testing across 7 municipal units" },
      { title: "Hydro Proofing", detail: "Waterproof taping validated after 1,000 immersion cycles" },
    ],
    gallery: [
      { src: "/Gemini_Generated_Image_h3x9brh3x9brh3x9.png", alt: "Summit Harness on trail mission" },
      { src: "/WhatsApp Image 2025-12-17 at 17.00.58 (1).jpeg", alt: "Summit Harness hardware detail" },
      { src: "/WhatsApp Image 2025-12-17 at 17.00.04.jpeg", alt: "Summit Harness GPS pocket close up" },
    ],
    rating: 4.8,
    reviews: 163,
    image: {
      src: "/Gemini_Generated_Image_h3x9brh3x9brh3x9.png",
      alt: "Summit Harness",
    },
    tags: ["adventure", "gps", "waterproof"],
  },
  {
    id: "everday-leash",
    title: "Everyday Hero Leash",
    handle: "everyday-hero-leash",
    price: 48,
    status: "notify",
    badges: ["US_PROTOCOL"],
    category: "Leashes",
    description: "Reflective leash with serialized hardware and quick-stow loop.",
    specs: ["Reflective core", "Padded handle", "Traceable hardware"],
    materials: ["Reflective paracord core", "Padded microsuede handle", "Brass swivel clasp"],
    protocols: [
      { title: "Night Visibility", detail: "3M reflective piping visible at 500 ft" },
      { title: "Recall Ready", detail: "Serialized clasp tied to TAP safety desk" },
    ],
    gallery: [
      { src: "/Gemini_Generated_Image_rlcviurlcviurlcv.png", alt: "Everyday Hero Leash resting on field table" },
      { src: "/WhatsApp Image 2025-12-17 at 17.00.42.jpeg", alt: "Leash reflective piping close up" },
      { src: "/WhatsApp Image 2025-12-17 at 17.00.58 (1).jpeg", alt: "Serialized leash clasp" },
    ],
    rating: 4.7,
    reviews: 128,
    image: {
      src: "/Gemini_Generated_Image_rlcviurlcviurlcv.png",
      alt: "Everyday Hero Leash",
    },
    tags: ["night", "reflective", "urban"],
  },
  {
    id: "field-collar",
    title: "Field ID Collar",
    handle: "field-id-collar",
    price: 64,
    status: "available",
    badges: ["US_PROTOCOL", "SHELTERS"],
    category: "Collars",
    description: "Breakaway collar with NFC chip and laser-etched identification.",
    specs: ["NFC tag", "Breakaway clasp", "Laser ID"],
    materials: ["Vegetable-tanned leather", "Brass quick-release clasp", "Embedded NFC chip"],
    protocols: [
      { title: "Scan Ready", detail: "NFC chip paired to TAP registry within 2 hours" },
      { title: "Shelter Fleet", detail: "Deployed in 18 rescues through 2% Pack fund" },
    ],
    gallery: [
      { src: "/WhatsApp Image 2025-12-17 at 17.00.04.jpeg", alt: "Field ID Collar on canvas table" },
      { src: "/WhatsApp Image 2025-12-17 at 17.00.42.jpeg", alt: "Laser ID detail on collar" },
      { src: "/WhatsApp Image 2025-12-17 at 17.00.58 (1).jpeg", alt: "Breakaway clasp close up" },
    ],
    rating: 4.9,
    reviews: 304,
    image: {
      src: "/WhatsApp Image 2025-12-17 at 17.00.04.jpeg",
      alt: "Field ID Collar",
    },
    tags: ["identification", "shelter"],
  },
  {
    id: "signal-patch",
    title: "Signal Patch Set",
    handle: "signal-patch-set",
    price: 36,
    status: "available",
    badges: ["LIMITED"],
    category: "Patches",
    description: "Protocol-ready patches for service designation and scan codes.",
    specs: ["Velcro back", "UV safe ink", "Unique QR"],
    materials: ["Hook-and-loop backing", "UV-stable ink", "Glow thread"],
    protocols: [
      { title: "Mission Coding", detail: "Each QR ties to TAP manifest records" },
      { title: "Low Light Read", detail: "Glow thread validated in 0-lux chambers" },
    ],
    gallery: [
      { src: "/WhatsApp Image 2025-12-17 at 17.00.42.jpeg", alt: "Signal Patch Set arranged on table" },
      { src: "/WhatsApp Image 2025-12-17 at 17.00.58 (1).jpeg", alt: "Signal patch stitching detail" },
      { src: "/Gemini_Generated_Image_h3x9brh3x9brh3x9.png", alt: "Patch attached to harness" },
    ],
    rating: 4.6,
    reviews: 78,
    image: {
      src: "/WhatsApp Image 2025-12-17 at 17.00.42.jpeg",
      alt: "Signal Patch Set",
    },
    tags: ["limited", "identification"],
  },
  {
    id: "guardian-kit",
    title: "Guardian Kit",
    handle: "guardian-kit",
    price: 420,
    status: "preorder",
    badges: ["US_PROTOCOL", "K9_ISSUE", "LIMITED"],
    category: "Kits",
    description: "Full deployment kit: vest, harness, leash, ID patch, and impact ledger.",
    specs: ["Vest + harness", "Impact receipt", "Lifetime guarantee"],
    materials: ["Cordura + Kevlar blend", "Hypalon reinforcement", "Brass + steel hardware"],
    protocols: [
      { title: "Deployment Ready", detail: "Bundled loadout approved by Handler Advisory Council" },
      { title: "Impact Ledger", detail: "2% Pack receipt enclosed for traceability" },
    ],
    gallery: [
      { src: "/WhatsApp Image 2025-12-17 at 17.00.58 (1).jpeg", alt: "Guardian Kit laid out on workbench" },
      { src: "/Gemini_Generated_Image_s0yhlgs0yhlgs0yh.png", alt: "Guardian Kit harness close up" },
      { src: "/Gemini_Generated_Image_rlcviurlcviurlcv.png", alt: "Guardian Kit leash detail" },
    ],
    rating: 5.0,
    reviews: 54,
    image: {
      src: "/WhatsApp Image 2025-12-17 at 17.00.58 (1).jpeg",
      alt: "Guardian Kit bundle",
    },
    tags: ["bundle", "limited", "deployment"],
  },
];

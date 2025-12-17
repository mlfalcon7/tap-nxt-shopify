// Comprehensive data models for TAP ecommerce site

export type ProductBadge =
  | "US_PROTOCOL"
  | "K9"
  | "VETERANS"
  | "SHELTERS"
  | "K9_ISSUE"
  | "LIMITED";

export type USProtocol = {
  tests: string[];
  traceability: string;
  serializableComponents: string[];
};

export type ImpactContribution = {
  percent: number; // e.g., 2 for "2% for the Pack"
  estimatedContribution: number; // estimated dollar amount per unit
};

export type Product = {
  slug: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  images: {
    src: string;
    alt: string;
  }[];
  badges: ProductBadge[];
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  specs: string[];
  materials: string[];
  care: string[];
  warranty: string;
  usProtocol: USProtocol;
  impact: ImpactContribution;
  relatedProducts: string[]; // product slugs
  status: "available" | "preorder" | "notify";
  category: string;
  tags?: string[];
  variants?: {
    id: string;
    name: string;
    price: number;
    available: boolean;
  }[];
};

export type Collection = {
  slug: string;
  title: string;
  description: string;
  productSlugs: string[];
  image?: {
    src: string;
    alt: string;
  };
};

export type Bundle = {
  slug: string;
  title: string;
  description: string;
  includedProductSlugs: string[];
  savings: number; // dollar amount saved
  heroUseCase: string;
  price: number;
  image: {
    src: string;
    alt: string;
  };
};

export type Story = {
  slug: string;
  title: string;
  date: string; // ISO date string
  excerpt: string;
  heroImage: {
    src: string;
    alt: string;
  };
  category: "rescue" | "k9" | "handler" | "community" | "impact";
  content: string; // MDX or rich text
  featuredProducts?: string[]; // product slugs
};

export type Hero = {
  slug: string;
  name: string;
  role: "K9" | "service" | "rescue" | "therapy" | "family";
  location: string;
  storySlug?: string; // link to related story
  gearUsed: string[]; // product slugs
  image?: {
    src: string;
    alt: string;
  };
};

export type Campaign = {
  slug: string;
  title: string;
  goal: string;
  partnerOrg?: string;
  howItWorks: string;
  updates: {
    date: string;
    title: string;
    content: string;
  }[];
  cta: string;
  heroImage: {
    src: string;
    alt: string;
  };
  excerpt: string;
  body: string;
};

export type Partner = {
  name: string;
  type: "retailer" | "service" | "rescue" | "training" | "veterinary";
  location: string;
  website?: string;
  verifiedBadge: boolean;
  services: string[];
  address?: string;
  phone?: string;
  email?: string;
};

export type LedgerReport = {
  quarter: number; // 1-4
  year: number;
  totals: {
    totalRaised: number;
    k9Grants: number;
    shelterAudits: number;
    veteranStipends: number;
  };
  lineItems: {
    date: string;
    deployedTo: string;
    proof: string;
    amount: number;
  }[];
  receiptsLink?: string;
};



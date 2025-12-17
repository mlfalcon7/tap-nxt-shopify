import { Cart, Collection, Product } from "./types";

export const mockProducts: Product[] = [
  {
    id: "gid://shopify/Product/hero-tactical-collar",
    handle: "hero-tactical-collar",
    availableForSale: true,
    title: "Hero Tactical Collar",
    description:
      "Military-grade collar with aerospace aluminum hardware and quick-release safety.",
    descriptionHtml:
      "<p>Military-grade collar with aerospace aluminum hardware and quick-release safety.</p>",
    options: [
      { id: "color", name: "Color", values: ["Ranger Green", "Rescue Orange"] },
      { id: "size", name: "Size", values: ["M", "L", "XL"] },
    ],
    priceRange: {
      maxVariantPrice: { amount: "58.00", currencyCode: "USD" },
      minVariantPrice: { amount: "58.00", currencyCode: "USD" },
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/1",
            title: "Hero Tactical Collar / Ranger Green / M",
            availableForSale: true,
            selectedOptions: [
              { name: "Color", value: "Ranger Green" },
              { name: "Size", value: "M" },
            ],
            price: { amount: "58.00", currencyCode: "USD" },
          },
        },
      ],
    },
    featuredImage: {
      url: "/placeholders/gear-1.jpg",
      altText: "Hero Tactical Collar",
      width: 1200,
      height: 1200,
    },
    images: {
      edges: [
        {
          node: {
            url: "/placeholders/gear-1.jpg",
            altText: "Hero Tactical Collar",
            width: 1200,
            height: 1200,
          },
        },
        {
          node: {
            url: "/placeholders/gear-2.jpg",
            altText: "Vest + collar kit",
            width: 1200,
            height: 1200,
          },
        },
      ],
    },
    seo: {
      title: "Hero Tactical Collar",
      description: "Mission-ready collar used by top-tier rescues.",
    },
    tags: ["collar", "reflective"],
    updatedAt: new Date().toISOString(),
    material: "Mil-Spec Nylon",
    use_case: "Identification",
    durability: "Lifetime Hero Guarantee",
    reflective: true,
    made_in: "USA",
    cause: "2% for the Pack",
    preorder: false,
  },
  {
    id: "gid://shopify/Product/service-vest-pro",
    handle: "service-vest-pro",
    availableForSale: true,
    title: "Service Vest Pro",
    description:
      "Official identification vest with modular panels and tap.preorder support.",
    descriptionHtml:
      "<p>Official identification vest with modular panels and tap.preorder support.</p>",
    options: [
      { id: "size", name: "Size", values: ["S", "M", "L"] },
      { id: "color", name: "Color", values: ["Black", "Coyote"] },
    ],
    priceRange: {
      maxVariantPrice: { amount: "128.00", currencyCode: "USD" },
      minVariantPrice: { amount: "128.00", currencyCode: "USD" },
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/2",
            title: "Service Vest Pro / Black / M",
            availableForSale: true,
            selectedOptions: [
              { name: "Color", value: "Black" },
              { name: "Size", value: "M" },
            ],
            price: { amount: "128.00", currencyCode: "USD" },
          },
        },
      ],
    },
    featuredImage: {
      url: "/placeholders/gear-2.jpg",
      altText: "Service Vest Pro",
      width: 1200,
      height: 1200,
    },
    images: {
      edges: [
        {
          node: {
            url: "/placeholders/gear-2.jpg",
            altText: "Service Vest Pro front profile",
            width: 1200,
            height: 1200,
          },
        },
        {
          node: {
            url: "/placeholders/gear-3.jpg",
            altText: "Service Vest hero shot",
            width: 1200,
            height: 1200,
          },
        },
      ],
    },
    seo: {
      title: "Service Vest Pro",
      description: "Modular vest for therapy, SAR, and service heroes.",
    },
    tags: ["vest", "preorder"],
    updatedAt: new Date().toISOString(),
    material: "CORDURA",
    use_case: "Service",
    durability: "Field Tested",
    reflective: true,
    made_in: "USA",
    cause: "Service Dog Access",
    preorder: true,
  },
  {
    id: "gid://shopify/Product/everyday-hero-leash",
    handle: "everyday-hero-leash",
    availableForSale: false,
    title: "Everyday Hero Leash",
    description:
      "Reflective leash with redundant safety clip—currently awaiting restock.",
    descriptionHtml:
      "<p>Reflective leash with redundant safety clip—currently awaiting restock.</p>",
    options: [{ id: "color", name: "Color", values: ["Signal Orange"] }],
    priceRange: {
      maxVariantPrice: { amount: "48.00", currencyCode: "USD" },
      minVariantPrice: { amount: "48.00", currencyCode: "USD" },
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/3",
            title: "Everyday Hero Leash / Signal Orange",
            availableForSale: false,
            selectedOptions: [{ name: "Color", value: "Signal Orange" }],
            price: { amount: "48.00", currencyCode: "USD" },
          },
        },
      ],
    },
    featuredImage: {
      url: "/placeholders/product-2.jpg",
      altText: "Everyday Hero Leash",
      width: 1200,
      height: 1200,
    },
    images: {
      edges: [
        {
          node: {
            url: "/placeholders/product-2.jpg",
            altText: "Hero leash detail",
            width: 1200,
            height: 1200,
          },
        },
      ],
    },
    seo: {
      title: "Everyday Hero Leash",
      description: "Reflective leash built for night missions.",
    },
    tags: ["leash", "reflective"],
    updatedAt: new Date().toISOString(),
    material: "Recycled Rope",
    use_case: "Adventure",
    durability: "Impact Tested",
    reflective: true,
    made_in: "USA",
    cause: "2% for the Pack",
    preorder: false,
  },
];

export const mockCollections: Collection[] = [
  {
    handle: "gear",
    title: "Tactical Gear",
    description: "Durable collars, leashes, and vests for daily missions.",
    seo: {
      title: "Tactical Gear",
      description: "Mission-led equipment.",
    },
    updatedAt: new Date().toISOString(),
    image: {
      url: "/placeholders/impact.jpg",
      altText: "Tactical gear collection",
      width: 1200,
      height: 1200,
    },
    products: {
      edges: mockProducts.map((product) => ({ node: product })),
    },
  },
  {
    handle: "bundles",
    title: "Hero Kits",
    description: "Bundled deployments for fast response.",
    seo: {
      title: "Hero Kits",
      description: "Starter deployments for immediate use.",
    },
    updatedAt: new Date().toISOString(),
    products: {
      edges: mockProducts.map((product) => ({ node: product })),
    },
  },
];

export const mockCart: Cart = {
  id: "gid://shopify/Cart/mock",
  checkoutUrl: "https://checkout.mock/hero",
  cost: {
    subtotalAmount: { amount: "0.00", currencyCode: "USD" },
    totalAmount: { amount: "0.00", currencyCode: "USD" },
    totalTaxAmount: { amount: "0.00", currencyCode: "USD" },
  },
  totalQuantity: 0,
  lines: {
    edges: [],
  },
};

export const serverEnv = {
  shopifyStoreDomain: process.env.SHOPIFY_STORE_DOMAIN,
  shopifyStorefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  shopifyApiVersion: process.env.SHOPIFY_API_VERSION ?? "2024-04",
};

export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://trueamericanpets.com",
  prelaunchEnabled: process.env.NEXT_PUBLIC_PRELAUNCH === "true",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "",
};

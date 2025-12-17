import { publicEnv } from "@/lib/env";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${publicEnv.siteUrl}/sitemap.xml`,
  };
}

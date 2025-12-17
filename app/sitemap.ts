import { publicEnv } from "@/lib/env";

const routes = [
  "/",
  "/shop",
  "/bundles",
  "/collections",
  "/about",
  "/manifesto",
  "/hall-of-heroes",
  "/stories",
  "/campaigns",
  "/impact",
  "/impact-ledger",
  "/safety-standards",
  "/us-protocol",
  "/us-protocol/testing",
  "/us-protocol/traceability",
  "/us-protocol/guarantee",
  "/us-protocol/standards",
  "/find-a-partner",
  "/contact",
  "/fund-a-vest",
  "/bundles/hero-starter-pack",
  "/rewards",
  "/search",
  "/account",
  "/cart",
  "/checkout",
  "/checkout/confirmation",
  "/learn",
  "/learn/service-dog-access",
  "/heroes",
  "/heroes/submit",
  "/guarantee",
  "/guarantee/claim",
  "/tools",
  "/tools/fit-wizard",
  "/tools/leash-finder",
  "/us-protocol/reports",
  "/policies/shipping",
  "/policies/returns",
  "/policies/privacy",
  "/policies/terms",
];

export default function sitemap() {
  const now = new Date();
  return routes.map((route) => ({
    url: `${publicEnv.siteUrl}${route}`,
    lastModified: now,
  }));
}

type Policy = {
  slug: string;
  title: string;
  body: string[];
};

export const policies: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping & Logistics",
    body: [
      "All TAP gear ships from our Virginia deployment center. Orders placed before 2pm ET leave the same day.",
      "Standard ground shipping is free over $50. Expedited options are available at checkout.",
      "We provide mission tracking numbers the moment a label is generated.",
    ],
  },
  {
    slug: "returns",
    title: "Returns & Lifetime Hero Guarantee",
    body: [
      "Unused gear can be returned within 30 days for a full refund.",
      "Field-tested gear that fails during normal mission use qualifies for the Lifetime Hero Guarantee—contact support@trueamericanpets.com with photos.",
      "Custom engraved ID tags are final sale.",
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    body: [
      "We only collect the mission-critical data required to fulfill orders and send Hero Alerts.",
      "All payment information is tokenized and handled by our PCI-compliant partners.",
      "You can request data deletion at any time by emailing privacy@trueamericanpets.com.",
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    body: [
      "True American Pets provides mission gear for companion animals and working dogs.",
      "Use of the site constitutes agreement to the code of hero conduct outlined in the Pet Rights Manifesto.",
      "All trademarks, product designs, and copy on this site are owned by TAP.",
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((policy) => policy.slug === slug);
}

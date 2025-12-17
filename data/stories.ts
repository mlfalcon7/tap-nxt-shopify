export type Story = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
};

export const stories: Story[] = [
  {
    slug: "pet-rights-manifesto",
    title: "Pet Rights Manifesto",
    date: "2024-08-01",
    excerpt: "Documenting the TAP Bill of Rights—Identification, Adventure, Recognition—for every hero dog.",
    category: "Manifesto",
  },
  {
    slug: "from-rescue-to-royalty",
    title: "From Rescue to Royalty",
    date: "2024-09-10",
    excerpt: "How Summit Harness pilots with municipal shelters cut response time in half.",
    category: "Impact",
  },
  {
    slug: "why-id-tags-save-lives",
    title: "Why ID Tags Save Lives",
    date: "2024-07-22",
    excerpt: "Serialized ID tags and NFC bring-home rates more than doubles. Here’s the data.",
    category: "Protocol",
  },
];

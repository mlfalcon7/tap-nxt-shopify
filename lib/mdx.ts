import fs from "node:fs/promises";
import path from "node:path";

export type StoryFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  heroImage: string;
  author: string;
};

export type Story = {
  frontmatter: StoryFrontmatter;
  content: string;
};

const STORIES_DIR = path.join(process.cwd(), "content", "stories");

export async function getStorySlugs() {
  try {
    const files = await fs.readdir(STORIES_DIR);
    return files.filter((file) => file.endsWith(".mdx"));
  } catch {
    return [];
  }
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  const normalized = slug.replace(/\.mdx$/, "");
  const filePath = path.join(STORIES_DIR, `${normalized}.mdx`);

  try {
    const file = await fs.readFile(filePath, "utf8");
    const { data, content } = parseFrontmatter(file);
    return {
      content,
      frontmatter: {
        ...(data as StoryFrontmatter),
        slug: normalized,
      },
    };
  } catch {
    return undefined;
  }
}

export async function getStories() {
  const slugs = await getStorySlugs();
  const stories = await Promise.all(
    slugs.map((slug) => getStoryBySlug(slug.replace(/\.mdx$/, "")))
  );

  return stories
    .filter((story): story is Story => Boolean(story))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

function parseFrontmatter(file: string) {
  const frontmatterRegex = /^---\n([\s\S]+?)\n---\n?([\s\S]*)$/;
  const match = file.match(frontmatterRegex);
  if (!match) {
    return { data: {}, content: file };
  }

  const [, frontmatterBlock, content] = match;
  const data = frontmatterBlock.split("\n").reduce<Record<string, string>>(
    (acc, line) => {
      const [key, ...rest] = line.split(":");
      if (!key) return acc;
      const value = rest.join(":").trim().replace(/^"|"$/g, "");
      acc[key.trim()] = value;
      return acc;
    },
    {}
  );

  return { data, content };
}

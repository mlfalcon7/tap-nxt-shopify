import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type HeroType = "Everyday" | "Rescue" | "Service" | "K9" | "Historical";
export type HeroEra = "Modern" | "WWII" | "Vietnam" | "Post-9/11" | "Contemporary";

export type HeroPost = {
  slug: string;
  heroName: string;
  heroType: HeroType;
  era: HeroEra;
  location?: string;
  mission: string;
  gearLesson: string;
  collectionLink?: string;
  image?: string;
  date: string;
  excerpt: string;
  content: string;
};

const heroesDirectory = path.join(process.cwd(), "content/heroes");

export async function getHeroPosts(): Promise<HeroPost[]> {
  try {
    const fileNames = await fs.readdir(heroesDirectory);
    const allHeroesData = await Promise.all(
      fileNames
        .filter((name) => name.endsWith(".mdx"))
        .map(async (fileName) => {
          const fullPath = path.join(heroesDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          return {
            slug: fileName.replace(/\.mdx$/, ""),
            heroName: data.heroName || "Unknown Hero",
            heroType: data.heroType || "Everyday",
            era: data.era || "Modern",
            location: data.location,
            mission: data.mission || "",
            gearLesson: data.gearLesson || "",
            collectionLink: data.collectionLink,
            image: data.image,
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || "",
            content,
          } as HeroPost;
        })
    );

    return allHeroesData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch {
    return [];
  }
}

export async function getHeroPost(slug: string): Promise<HeroPost | null> {
  try {
    const fullPath = path.join(heroesDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      heroName: data.heroName || "Unknown Hero",
      heroType: data.heroType || "Everyday",
      era: data.era || "Modern",
      location: data.location,
      mission: data.mission || "",
      gearLesson: data.gearLesson || "",
      collectionLink: data.collectionLink,
      image: data.image,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      content,
    } as HeroPost;
  } catch {
    return null;
  }
}


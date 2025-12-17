import Link from "next/link";
import Image from "next/image";
import { getStories } from "@/lib/mdx";

export const metadata = {
  title: "Stories",
  description: "Default MDX-powered stories for TAP.",
};

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <section className="container-width py-16 space-y-8">
      <div>
        <p className="eyebrow text-muted-foreground">
          Stories
        </p>
        <h1 className="text-4xl font-bold">Hero narratives &amp; manifestos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story) => (
          <Link
            key={story.frontmatter.slug}
            href={`/stories/${story.frontmatter.slug}`}
            className="border border-border group"
          >
            <Image
              src={story.frontmatter.heroImage}
              alt={story.frontmatter.title}
              width={1200}
              height={800}
              className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-6 space-y-2">
              <p className="eyebrow text-muted-foreground">
                {new Date(story.frontmatter.date).toLocaleDateString()}
              </p>
              <h2 className="text-2xl font-semibold">{story.frontmatter.title}</h2>
              <p className="text-muted-foreground">{story.frontmatter.excerpt}</p>
              <span className="text-sm font-semibold">Read story →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

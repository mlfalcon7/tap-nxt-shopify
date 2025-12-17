import { notFound } from "next/navigation";
import { getPolicy, policies } from "@/lib/policies";
import { buildCanonical } from "@/lib/utils";
import { publicEnv } from "@/lib/env";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return {};
  return {
    title: policy.title,
    description: policy.body[0],
    alternates: {
      canonical: buildCanonical(`/policies/${policy.slug}`, publicEnv.siteUrl),
    },
  };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) {
    notFound();
  }

  return (
    <section className="container-width py-16 space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-muted-foreground">
          Policy
        </p>
        <h1 className="text-4xl font-bold">{policy.title}</h1>
      </div>
      <div className="space-y-4 max-w-3xl">
        {policy.body.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

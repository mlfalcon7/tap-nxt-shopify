import { notFound } from "next/navigation";
import { campaigns, getCampaignBySlug } from "@/lib/campaigns";
import Image from "next/image";
import { buildCanonical } from "@/lib/utils";
import { publicEnv } from "@/lib/env";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);
  if (!campaign) return {};
  return {
    title: campaign.title,
    description: campaign.excerpt,
    alternates: {
      canonical: buildCanonical(`/campaigns/${campaign.slug}`, publicEnv.siteUrl),
    },
  };
}

export default async function CampaignDetail({ params }: Props) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);
  if (!campaign) {
    notFound();
  }

  return (
    <article className="container-width py-16 space-y-6">
      <div className="space-y-2">
        <p className="eyebrow text-muted-foreground">
          Campaign
        </p>
        <h1 className="text-4xl font-bold">{campaign.title}</h1>
        <p className="text-muted-foreground max-w-3xl">{campaign.excerpt}</p>
      </div>
      <Image
        src={campaign.heroImage}
        alt={campaign.title}
        width={1600}
        height={900}
        className="w-full h-[420px] object-cover"
      />
      <p className="text-lg leading-relaxed">{campaign.body}</p>
      <Button size="lg" className="tracking-[0.3em] uppercase">
        {campaign.cta}
      </Button>
    </article>
  );
}

import Link from "next/link";
import Image from "next/image";
import { campaigns } from "@/lib/campaigns";

export const metadata = {
  title: "Campaigns",
  description: "Public action modules for TAP community.",
};

export default function CampaignsPage() {
  return (
    <section className="container-width py-16 space-y-8">
      <div>
        <p className="eyebrow text-muted-foreground">
          Campaigns
        </p>
        <h1 className="text-4xl font-bold">Action Center</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Link key={campaign.slug} href={`/campaigns/${campaign.slug}`} className="border border-border group bg-surface subtle-motion hover:border-accent">
            <Image
              src={campaign.heroImage}
              alt={campaign.title}
              width={800}
              height={600}
              className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-2xl font-semibold">{campaign.title}</h2>
              <p className="text-sm text-muted-foreground">{campaign.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

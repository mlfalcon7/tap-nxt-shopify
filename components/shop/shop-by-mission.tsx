import Link from "next/link";
import Image from "next/image";
import { Shield, Heart, Users, ArrowRight } from "lucide-react";
import { TAPStamp } from "@/components/brand";
import { Card } from "@/components/ui/card";
import { missionTiles } from "@/lib/brandCopy";

const iconMap = {
  "Everyday Family Dogs": Heart,
  "Service Dogs": Shield,
  "Rescue Families": Heart,
  "Working K9 Units": Users,
};

const stampMap: Record<string, string> = {
  "Everyday Family Dogs": "HOME HERO",
  "Service Dogs": "SERVICE HERO",
  "Rescue Families": "RESCUE HERO",
  "Working K9 Units": "K9 HERO",
};

export function ShopByMission() {
  return (
    <section id="shop-by-mission" className="bg-surface-strong py-20">
      <div className="container-width space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="eyebrow text-muted-foreground">Shop by Mission</p>
          <h2 className="h2">Gear Built for Your Hero's Mission</h2>
          <p className="text-lg text-muted-foreground">
            Every dog has a mission. Whether it's service work, rescue recovery, or K9 deployment, we build
            gear that matches the mission.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {missionTiles.map((mission) => {
            const Icon = iconMap[mission.title as keyof typeof iconMap] || Heart;
            const stamp = stampMap[mission.title] || "";
            return (
              <Link
                key={mission.href}
                href={mission.href}
                className="group"
              >
                <Card className="overflow-hidden p-0">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-strong">
                    <Image
                      src="/placeholders/gear-1.jpg"
                      alt={mission.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--action-band-bg)_80%,transparent)] to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-secondary)]/20 backdrop-blur-sm">
                        <Icon className="h-5 w-5 text-[var(--action-band-text)]" />
                      </div>
                      {stamp && (
                        <TAPStamp
                          label={stamp}
                          variant="small"
                          className="bg-[color-mix(in_srgb,var(--action-band-bg)_55%,transparent)] border-[color-mix(in_srgb,var(--action-band-text)_35%,transparent)] text-[var(--action-band-text)]"
                        />
                      )}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--accent-secondary)] transition-colors">
                        {mission.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{mission.description}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Includes:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {mission.includes.map((product) => (
                          <li key={product} className="flex items-center gap-2">
                            <span className="text-[var(--accent-secondary)]">•</span>
                            <span>{product}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center text-sm font-semibold text-[var(--accent-secondary)] group-hover:gap-2 transition-all pt-2">
                      Shop {mission.title}
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

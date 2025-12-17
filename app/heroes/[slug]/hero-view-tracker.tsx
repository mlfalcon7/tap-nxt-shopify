"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = {
  heroSlug: string;
  heroName: string;
};

export function HeroViewTracker({ heroSlug, heroName }: Props) {
  useEffect(() => {
    trackEvent("view_hero", {
      hero_slug: heroSlug,
      hero_name: heroName,
    });
  }, [heroSlug, heroName]);

  return null;
}



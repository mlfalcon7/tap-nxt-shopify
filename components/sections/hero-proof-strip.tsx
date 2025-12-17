"use client";

import Link from "next/link";
import { ShieldCheck, FileText, Heart, Award } from "lucide-react";

const proofPoints = [
  {
    icon: ShieldCheck,
    label: "Protocol Tested",
    href: "#us-protocol",
    scrollTo: "us-protocol",
  },
  {
    icon: FileText,
    label: "Traceable",
    href: "#traceability",
    scrollTo: "traceability",
  },
  {
    icon: Heart,
    label: "2% Impact",
    href: "#impact",
    scrollTo: "impact",
  },
  {
    icon: Award,
    label: "Lifetime Guarantee",
    href: "#guarantee",
    scrollTo: "guarantee",
  },
];

export function HeroProofStrip() {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, scrollTo: string) {
    e.preventDefault();
    const element = document.getElementById(scrollTo);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-6">
      {proofPoints.map((point) => {
        const Icon = point.icon;
        return (
          <Link
            key={point.label}
            href={point.href}
            onClick={(e) => handleClick(e, point.scrollTo)}
            className="group flex items-center gap-2 px-4 py-2 rounded-sm border border-[color-mix(in_srgb,var(--action-band-text)_30%,transparent)] bg-[color-mix(in_srgb,var(--action-band-text)_12%,transparent)] hover:bg-[color-mix(in_srgb,var(--action-band-text)_20%,transparent)] transition-all duration-200 hover:border-[color-mix(in_srgb,var(--action-band-text)_50%,transparent)]"
          >
            <Icon className="h-4 w-4 text-[var(--accent-secondary)] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-[var(--action-band-text)] whitespace-nowrap">
              {point.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}



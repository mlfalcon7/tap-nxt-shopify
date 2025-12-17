"use client";

import Image from "next/image";
import { Stamp } from "@/components/patriotism";
import { ButtonLink } from "@/components/ui/button-link";
import { ProofBar } from "@/components/ui/proof-bar";
import { proofItems } from "@/lib/brandCopy";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] w-full items-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        <Image
          src="/Gemini_Generated_Image_s0yhlgs0yhlgs0yh.png"
          alt="Golden retriever on an outdoor mission"
          fill
          className="object-cover"
          priority
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-2/3"
          style={{
            background:
              "linear-gradient(180deg,color-mix(in srgb,var(--action-band-bg) 95%,transparent) 0%,color-mix(in srgb,var(--action-band-bg) 55%,transparent) 45%,transparent 90%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background: "linear-gradient(0deg,color-mix(in srgb,var(--action-band-bg) 90%,transparent) 5%,transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 container-width w-full py-24">
        <div className="relative max-w-3xl space-y-6 text-left text-[var(--action-band-text)]">
          <Image
            src="/brand/logo-v2-icon-white.png"
            alt=""
            width={900}
            height={900}
            priority
            className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 opacity-[0.06] blur-[1px]"
            aria-hidden
          />
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent-secondary)]">
            Field briefing ★ True American Pets
          </p>
          <h1
            className="h1 display max-w-2xl text-[var(--action-band-text)]"
            style={{
              textShadow: "0 32px 65px color-mix(in srgb,var(--action-band-bg) 80%,transparent)",
            }}
          >
            Built for every dog’s mission.
          </h1>
          <div className="space-y-3">
            <p
              className="max-w-2xl text-lg leading-relaxed text-[color-mix(in_srgb,var(--action-band-text)_88%,transparent)] md:text-xl font-medium"
              style={{ textShadow: "0 2px 10px color-mix(in srgb,var(--action-band-bg) 60%,transparent)" }}
            >
              Premium, protocol-tested gear for family dogs, rescue companions, service teams, and working K9s.
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-[color-mix(in_srgb,var(--action-band-text)_78%,transparent)]">
              Whether you adopted, bought, or were chosen—your dog deserves mission-grade protection.
            </p>
          </div>
          <Stamp title="ENGINEERED IN AMERICA" subtitle="BUILT FOR REAL LIFE" size="md" tone="inverse" />
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <ButtonLink
              href="/shop"
              size="lg"
              className="h-14 px-10 text-base"
              style={{
                boxShadow: "0 20px 45px color-mix(in srgb,var(--action-band-bg) 65%,transparent)",
              }}
            >
              Shop Gear
            </ButtonLink>
            <ButtonLink
              href="/manifesto"
              size="lg"
              variant="outline"
              className="h-14 px-10 text-base border-[var(--action-band-text)] text-[var(--action-band-text)] hover:bg-[color-mix(in_srgb,var(--action-band-text)_12%,transparent)]"
            >
              Read Manifesto
            </ButtonLink>
          </div>
          <ButtonLink
            href="#shop-by-mission"
            variant="link"
            className="w-fit justify-start px-0 text-sm font-semibold text-[color-mix(in_srgb,var(--action-band-text)_85%,transparent)] hover:text-[var(--action-band-text)]"
          >
            Shop by Mission →
          </ButtonLink>
          <ProofBar items={proofItems} />
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  return (
    <>
      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 ease-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mega menu panel */}
      <div
        className={`absolute left-0 right-0 top-full z-50 bg-[var(--action-band-bg)] text-[var(--action-band-text)] border-b border-[var(--action-band-border)] shadow-2xl backdrop-blur-sm transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        <div className="container-width py-12">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 lg:hidden text-[var(--action-band-text)] hover:text-[var(--accent)]"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Shop by Gear */}
            <div className="space-y-4">
              <h3 className="eyebrow text-[var(--accent)]">
                Shop by Gear
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/collections/collars"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    Collars
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/harnesses"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    Harnesses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/leashes"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    Leashes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/id-tags"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    ID Tags
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/vests"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    Vests
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bundles/hero-starter-pack"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    Bundles
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?filter=new"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    New / Limited Drops
                  </Link>
                </li>
              </ul>
            </div>

            {/* Shop by Rights */}
            <div className="space-y-4">
              <h3 className="eyebrow text-[var(--accent)]">
                Shop by Rights
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/collections/identification"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    Safe Identification
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/adventure"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    Protected Adventure
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/recognition"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    Recognition
                  </Link>
                </li>
              </ul>
            </div>

            {/* Shop by Dog's Mission */}
            <div className="space-y-4">
              <h3 className="eyebrow text-[var(--accent)]">
                Shop by Dog's Mission
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/shop?mission=everyday"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    Everyday Gear
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?mission=service-dog"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    Service Dog Gear
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?mission=k9"
                    className="text-sm font-medium hover:text-[var(--accent)] transition-all duration-200 ease-out hover:translate-x-1 block"
                    onClick={onClose}
                  >
                    Working K9 Gear
                  </Link>
                </li>
              </ul>
            </div>

            {/* CTA Card */}
            <div className="bg-[color-mix(in_oklab,var(--action-band-text)_5%,transparent)] border border-[var(--action-band-border)] p-6 space-y-4 rounded-sm">
              <div className="space-y-2">
                <div className="inline-block bg-[var(--accent)] text-[var(--accent-foreground)] px-2 py-1 text-xs font-bold tracking-wide uppercase">
                  Best Value
                </div>
                <h4 className="text-lg font-bold">Hero Starter Pack</h4>
                <p className="text-sm text-[var(--border)] leading-relaxed">
                  Complete identification system: Collar, Tag, Leash. Save 15%.
                </p>
              </div>
              <div className="space-y-2">
                <Link href="/bundles/hero-starter-pack" onClick={onClose}>
                  <Button
                    className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]"
                  >
                    Shop Bundle
                  </Button>
                </Link>
                <Link href="/rewards" onClick={onClose}>
                  <Button
                    variant="outline"
                    className="w-full border-[var(--action-band-border)] text-[var(--action-band-text)] hover:bg-[color-mix(in_oklab,var(--action-band-text)_10%,transparent)]"
                  >
                    Join Hero Alerts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

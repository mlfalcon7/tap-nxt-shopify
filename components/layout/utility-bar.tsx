"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { publicEnv } from "@/lib/env";
import { PRELAUNCH_MESSAGE } from "@/lib/constants";

export function UtilityBar() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messages = [
    publicEnv.prelaunchEnabled ? PRELAUNCH_MESSAGE : "2% for the Pack — Every order funds hero grants.",
    "Mission Vests ship with lifetime hero guarantee.",
    "Verified partners nationwide — find yours.",
  ];
  const messageCount = messages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messageCount);
    }, 7000);
    return () => clearInterval(interval);
  }, [messageCount]);

  return (
    <div className="w-full bg-[var(--action-band-bg)] text-[var(--action-band-text)] text-sm tracking-wide uppercase">
      <div className="container-width flex h-10 items-center justify-between gap-4">
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/impact"
            className="font-semibold hover:text-[var(--accent)] transition-colors duration-200"
          >
            ACTION CENTER
          </Link>
          <Link
            href="/stories"
            className="font-semibold hover:text-[var(--accent)] transition-colors duration-200"
          >
            STORIES
          </Link>
        </div>

        <div className="flex-1 text-center">
          <p className="font-semibold transition-opacity duration-300">
            {messages[currentMessageIndex]}
          </p>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/hall-of-heroes"
            className="font-semibold hover:text-[var(--accent)] transition-colors duration-200"
          >
            FIND A PARTNER
          </Link>
        </div>
      </div>
      <div className="h-px w-full bg-[var(--accent-secondary)]" aria-hidden />
    </div>
  );
}

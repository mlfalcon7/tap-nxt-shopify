"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export type Hero = {
  name: string;
  dogName: string;
  title: string;
  story: string;
  photoUrl: string;
};

type Props = {
  initialHeroes: Hero[];
};

export function HeroGallery({ initialHeroes }: Props) {
  const [heroes, setHeroes] = useState(initialHeroes);
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    setFormMessage(null);
    const payload = {
      name: formData.get("name"),
      dogName: formData.get("dogName"),
      story: formData.get("story"),
      photoUrl: formData.get("photoUrl"),
    };

    try {
      const res = await fetch("/api/heroes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Failed to submit hero");
      }
      const newHero = await res.json();
      setHeroes([newHero, ...heroes]);
      setFormMessage("Hero submitted for review.");
      trackEvent("lead", { channel: "hall_of_heroes" });
    } catch {
      setFormMessage("Could not submit hero right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {heroes.map((hero) => (
          <article
            key={`${hero.name}-${hero.dogName}-${hero.photoUrl}`}
            className="border border-border overflow-hidden"
          >
            <div className="relative h-64">
              <Image
                src={hero.photoUrl}
                alt={hero.dogName}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{hero.dogName}</h3>
                <span className="text-xs uppercase tracking-[0.3em] text-accent">
                  {hero.title}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{hero.story}</p>
              <p className="text-xs text-muted-foreground">Submitted by {hero.name}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="border border-border p-6 space-y-4">
        <h3 className="text-2xl font-semibold">Submit Your Hero</h3>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(new FormData(event.currentTarget));
          }}
        >
          <input
            name="name"
            placeholder="Your Name"
            required
            className="border border-border px-3 py-2"
          />
          <input
            name="dogName"
            placeholder="Hero Name"
            required
            className="border border-border px-3 py-2"
          />
          <input
            name="photoUrl"
            placeholder="Photo URL"
            required
            className="border border-border px-3 py-2 md:col-span-2"
          />
          <textarea
            name="story"
            placeholder="Hero mission (20-800 characters)"
            required
            minLength={20}
            maxLength={800}
            className="border border-border px-3 py-2 h-32 md:col-span-2"
          />
          <div className="md:col-span-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Hero"}
            </Button>
            {formMessage && (
              <p className="text-sm text-muted-foreground mt-2">{formMessage}</p>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}

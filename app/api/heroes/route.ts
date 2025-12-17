import { NextResponse } from "next/server";
import { z } from "zod";
import seedHeroes from "@/content/heroes.json";

const heroSchema = z.object({
  name: z.string().min(2).max(40),
  dogName: z.string().min(2).max(40),
  story: z.string().min(20).max(800),
  photoUrl: z.string().url(),
});

type Hero = z.infer<typeof heroSchema> & {
  submittedAt: string;
};

const globalStore = globalThis as unknown as {
  __tapHeroes?: Hero[];
};

function getStore(): Hero[] {
  if (!globalStore.__tapHeroes) {
    const seededHeroes = seedHeroes as Omit<Hero, "submittedAt">[];
    globalStore.__tapHeroes = seededHeroes.map((hero) => ({
      ...hero,
      submittedAt: new Date().toISOString(),
    }));
  }
  return globalStore.__tapHeroes;
}

export async function GET() {
  return NextResponse.json(getStore());
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = heroSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const hero: Hero = {
    ...parsed.data,
    submittedAt: new Date().toISOString(),
  };

  const store = getStore();
  store.unshift(hero);

  if (process.env.VERCEL_ENV === "production") {
    console.warn(
      "TODO: persist hero submissions to database instead of in-memory cache."
    );
  }

  return NextResponse.json(hero, { status: 201 });
}

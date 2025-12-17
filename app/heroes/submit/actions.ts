"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

type SubmitHeroData = {
  dogName: string;
  handlerName?: string;
  role: string;
  location: string;
  story: string;
  gearOwned: string[];
  fitNotes?: string;
  email: string;
};

export async function submitHeroProfile(data: SubmitHeroData) {
  // In production, this would save to a database
  // For now, save as JSON file in a submissions directory
  const submission = {
    ...data,
    id: `hero-${Date.now()}`,
    status: "pending",
    submittedAt: new Date().toISOString(),
  };

  try {
    const submissionsDir = join(process.cwd(), "data", "submissions", "heroes");
    await mkdir(submissionsDir, { recursive: true });
    
    const filePath = join(submissionsDir, `${submission.id}.json`);
    await writeFile(filePath, JSON.stringify(submission, null, 2));
    
    return { success: true, id: submission.id };
  } catch (error) {
    console.error("Error saving hero submission:", error);
    throw new Error("Failed to submit hero profile");
  }
}



"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { generateReferenceNumber } from "@/lib/data/warranty";

type WarrantyClaimData = {
  orderId?: string;
  email: string;
  productSlug: string;
  issueType: string;
  description: string;
  photos: File[];
  preferredResolution: string;
};

export async function submitWarrantyClaim(data: WarrantyClaimData) {
  const referenceNumber = generateReferenceNumber();
  
  const claim = {
    ...data,
    id: `claim-${Date.now()}`,
    referenceNumber,
    status: "submitted",
    submittedAt: new Date().toISOString(),
    photos: [], // In production, upload photos to storage and store URLs
  };

  try {
    const claimsDir = join(process.cwd(), "data", "submissions", "warranty");
    await mkdir(claimsDir, { recursive: true });
    
    const filePath = join(claimsDir, `${claim.id}.json`);
    await writeFile(filePath, JSON.stringify(claim, null, 2));
    
    return { success: true, referenceNumber };
  } catch (error) {
    console.error("Error saving warranty claim:", error);
    throw new Error("Failed to submit warranty claim");
  }
}



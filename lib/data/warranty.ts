// Warranty claim data models

export type WarrantyIssueType = 
  | "hardware_failure"
  | "material_defect"
  | "stitching_failure"
  | "reflective_loss"
  | "other";

export type PreferredResolution = "repair" | "replace" | "refund";

export type WarrantyClaim = {
  id: string;
  orderId?: string;
  email: string;
  productSlug: string;
  issueType: WarrantyIssueType;
  description: string;
  photos: string[]; // URLs to uploaded photos
  preferredResolution: PreferredResolution;
  status: "submitted" | "reviewing" | "approved" | "rejected" | "resolved";
  submittedAt: string;
  referenceNumber: string;
};

export function generateReferenceNumber(): string {
  return `TAP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}



export type ImpactReceipt = {
  title: string;
  amount: string;
  detail: string;
  badge: string;
};

export type ImpactLedgerEntry = {
  date: string;
  amount: string;
  deployedTo: string;
  proof: string;
};

export type ImpactReceiptDetail = {
  title: string;
  allocation: string;
  description: string;
};

export const impactReceipts: ImpactReceipt[] = [
  { title: "K9 Vest Grants", amount: "$24,300", detail: "12 municipalities funded", badge: "Q3" },
  { title: "Shelter Safety Audits", amount: "$9,450", detail: "18 rescues certified", badge: "Q3" },
  { title: "Veteran Handler Support", amount: "$6,125", detail: "9 stipends issued", badge: "Q3" },
];

export const impactLedger: ImpactLedgerEntry[] = [
  { date: "2024-09-30", amount: "$12,500", deployedTo: "Project Safe Neck", proof: "Breakaway collars + training" },
  { date: "2024-08-15", amount: "$8,200", deployedTo: "Operation Heatwave", proof: "Cooling vests for 7 units" },
  { date: "2024-07-04", amount: "$5,750", deployedTo: "Veteran Handler Support", proof: "Stipends + repairs" },
];

export const impactDetails: ImpactReceiptDetail[] = [
  {
    title: "Project Safe Neck",
    allocation: "$12,800",
    description: "Distributed 640 breakaway collars to municipal shelters.",
  },
  {
    title: "Operation Heatwave",
    allocation: "$8,200",
    description: "Funded cooling vests for Phoenix-area K9 units.",
  },
  {
    title: "Service Dog Access",
    allocation: "$5,600",
    description: "Sponsored access training for 45 small businesses.",
  },
];

export const safetyProofs = [
  "Lab-tested textiles in Colorado & North Carolina",
  "Every component serialized for traceability",
  "Handler Advisory Council approves each run",
] as const;

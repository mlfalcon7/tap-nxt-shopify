// US Protocol Report data models

export type ProtocolTest = {
  name: string;
  standard: string;
  result: "pass" | "fail" | "conditional";
  details: string;
};

export type ProtocolReport = {
  id: string;
  productSlug: string;
  runId: string;
  date: string;
  tests: ProtocolTest[];
  labLocation: string;
  resultsSummary: string;
  downloadUrl?: string;
};

// Mock data - in production, this would come from a database
export const protocolReports: ProtocolReport[] = [
  {
    id: "report-2024-001",
    productSlug: "hero-recon-vest",
    runId: "RUN-2024-001",
    date: "2024-01-15",
    tests: [
      {
        name: "Thermal Resistance",
        standard: "US Protocol 701",
        result: "pass",
        details: "Tested at -20°F to 140°F. No material degradation observed.",
      },
      {
        name: "Abrasion Resistance",
        standard: "US Protocol 701",
        result: "pass",
        details: "10,000 cycles completed. Material retained 95% integrity.",
      },
      {
        name: "Impact Strength",
        standard: "US Protocol 701",
        result: "pass",
        details: "Hardware tested to 3x normal load. No failures.",
      },
    ],
    labLocation: "Colorado Testing Lab",
    resultsSummary: "All tests passed. Product approved for production.",
    downloadUrl: "/reports/report-2024-001.pdf",
  },
  {
    id: "report-2024-002",
    productSlug: "summit-harness",
    runId: "RUN-2024-002",
    date: "2024-02-01",
    tests: [
      {
        name: "Load Balancing",
        standard: "K9 Field Trials",
        result: "pass",
        details: "Tested across 7 municipal units. No chafing or pressure points reported.",
      },
      {
        name: "Water Immersion",
        standard: "US Protocol 701",
        result: "pass",
        details: "1,000 immersion cycles. Waterproof taping validated.",
      },
    ],
    labLocation: "North Carolina Testing Lab",
    resultsSummary: "Field trials and lab tests passed. Product approved.",
  },
];

export function getReportById(id: string): ProtocolReport | undefined {
  return protocolReports.find((report) => report.id === id);
}

export function getReportsByProduct(productSlug: string): ProtocolReport[] {
  return protocolReports.filter((report) => report.productSlug === productSlug);
}

export function getLatestReportByProduct(productSlug: string): ProtocolReport | undefined {
  const reports = getReportsByProduct(productSlug);
  return reports.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
}



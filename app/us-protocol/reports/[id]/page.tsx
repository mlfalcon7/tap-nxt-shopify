import { notFound } from "next/navigation";
import { TapSeal } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { getReportById } from "@/lib/data/protocol-reports";
import { products } from "@/data/products";
import { FileText, Download, CheckCircle2, XCircle } from "lucide-react";
import { buildCanonical } from "@/lib/utils";
import { publicEnv } from "@/lib/env";
import { JsonLd } from "@/components/seo/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const { protocolReports } = await import("@/lib/data/protocol-reports");
  return protocolReports.map((report) => ({ id: report.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const report = getReportById(id);
  if (!report) return {};
  
  const product = products.find((p) => p.handle === report.productSlug);
  
  return {
    title: `US Protocol Test Report: ${product?.title || report.productSlug}`,
    description: report.resultsSummary,
    alternates: {
      canonical: buildCanonical(`/us-protocol/reports/${id}`, publicEnv.siteUrl),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProtocolReportPage({ params }: Props) {
  const { id } = await params;
  const report = getReportById(id);

  if (!report) {
    notFound();
  }

  const product = products.find((p) => p.handle === report.productSlug);
  const passedTests = report.tests.filter((t) => t.result === "pass").length;

  const reportSchema = {
    "@context": "https://schema.org",
    "@type": "Report",
    name: `US Protocol Test Report: ${product?.title || report.productSlug}`,
    description: report.resultsSummary,
    datePublished: report.date,
    about: {
      "@type": "Product",
      name: product?.title || report.productSlug,
    },
  };

  return (
    <div className="bg-background text-foreground">
      <JsonLd data={reportSchema} />
      <Breadcrumbs
        items={[
          { label: "US Protocol", href: "/us-protocol" },
          { label: "Test Reports", href: "/us-protocol/reports" },
          { label: report.id },
        ]}
      />
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6">
          <TapSeal label="Test Report" detail={report.id} />
          <div>
            <h1 className="h1">{product?.title || report.productSlug}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>Run ID: {report.runId}</span>
              <span>Date: {new Date(report.date).toLocaleDateString()}</span>
              <span>{report.labLocation}</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-[var(--border)] bg-surface-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Results Summary</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--accent-secondary)]">
                {passedTests}/{report.tests.length} Tests Passed
              </span>
              <CheckCircle2 className="h-5 w-5 text-[var(--accent-secondary)]" />
            </div>
          </div>
          <p className="text-muted-foreground">{report.resultsSummary}</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Test Results</h2>
          <div className="grid gap-4">
            {report.tests.map((test) => (
              <div
                key={test.name}
                className="border border-[var(--border)] bg-surface rounded-sm p-6 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {test.result === "pass" ? (
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent-secondary)] flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h3 className="font-semibold">{test.name}</h3>
                      <p className="text-sm text-muted-foreground">{test.standard}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold capitalize ${
                    test.result === "pass" ? "text-[var(--accent-secondary)]" : "text-muted-foreground"
                  }`}>
                    {test.result}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground pl-8">{test.details}</p>
              </div>
            ))}
          </div>
        </div>

	        <div className="flex flex-col sm:flex-row gap-4">
	          {report.downloadUrl && (
	            <a href={report.downloadUrl} download className={buttonVariants({ size: "lg" })}>
	              <Download className="h-4 w-4 mr-2" />
	              Download Full Report PDF
	            </a>
	          )}
	          {product && (
	            <ButtonLink href={`/products/${product.handle}`} variant="outline" size="lg">
	              View Product Page
	            </ButtonLink>
	          )}
	          <ButtonLink href="/us-protocol/reports" variant="outline" size="lg">
	            Back to All Reports
	          </ButtonLink>
	        </div>
	      </section>
	    </div>
  );
}


import Link from "next/link";
import { TapSeal, PatriotRule } from "@/components/patriotism";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { protocolReports } from "@/lib/data/protocol-reports";
import { products } from "@/data/products";
import { FileText, Download, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata = {
  title: "US Protocol Test Reports",
  description: "Detailed test reports for all US Protocol certified products. Lab results, field trials, and certification documentation.",
  alternates: {
    canonical: "/us-protocol/reports",
  },
};

export default function ProtocolReportsPage() {
  return (
    <div className="bg-background text-foreground">
      <Breadcrumbs
        items={[
          { label: "US Protocol", href: "/us-protocol" },
          { label: "Test Reports" },
        ]}
      />
      <section className="container-width py-16 space-y-12">
        <div className="space-y-6 max-w-3xl">
          <TapSeal label="Test Reports" detail="US Protocol" />
          <h1 className="h1">Lab Results & Field Trials</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Every US Protocol certified product has detailed test reports available. These documents prove
            that our gear meets the standards we claim.
          </p>
        </div>

        <PatriotRule label="Available Reports" className="container-width" />

        <div className="space-y-6">
          {protocolReports.map((report) => {
            const product = products.find((p) => p.handle === report.productSlug);
            const passedTests = report.tests.filter((t) => t.result === "pass").length;
            
            return (
              <div
                key={report.id}
                className="border border-[var(--border)] bg-surface rounded-sm p-6 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-[var(--accent-secondary)]" />
                      <h3 className="text-xl font-semibold">
                        {product?.title || report.productSlug}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Run ID: {report.runId}</span>
                      <span>Date: {new Date(report.date).toLocaleDateString()}</span>
                      <span>{report.labLocation}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--accent-secondary)]">
                      {passedTests}/{report.tests.length} Tests Passed
                    </span>
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent-secondary)]" />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{report.resultsSummary}</p>

                <div className="grid gap-3 md:grid-cols-2">
                  {report.tests.map((test) => (
                    <div
                      key={test.name}
                      className="flex items-start gap-3 p-3 bg-surface-strong rounded-sm"
                    >
                      <div className={`flex-shrink-0 mt-0.5 ${
                        test.result === "pass" ? "text-[var(--accent-secondary)]" : "text-muted-foreground"
                      }`}>
                        {test.result === "pass" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{test.name}</p>
                        <p className="text-xs text-muted-foreground">{test.standard}</p>
                        <p className="text-xs text-muted-foreground mt-1">{test.details}</p>
                      </div>
                    </div>
                  ))}
                </div>

	                <div className="flex items-center gap-4 pt-4 border-t border-[var(--border)]">
	                  <ButtonLink href={`/us-protocol/reports/${report.id}`} variant="outline" size="sm">
	                    View Full Report
	                  </ButtonLink>
	                  {report.downloadUrl && (
	                    <a
	                      href={report.downloadUrl}
	                      download
	                      className={buttonVariants({ variant: "outline", size: "sm" })}
	                    >
	                      <Download className="h-4 w-4 mr-2" />
	                      Download PDF
	                    </a>
	                  )}
	                  {product && (
	                    <ButtonLink href={`/products/${product.handle}`} variant="ghost" size="sm">
	                      View Product
	                    </ButtonLink>
	                  )}
	                </div>
	              </div>
	            );
	          })}
        </div>
      </section>
    </div>
  );
}


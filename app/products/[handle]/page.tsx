import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/product-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { buildCanonical } from "@/lib/utils";
import { publicEnv } from "@/lib/env";
import {
  findProductByHandle,
  getProductHandles,
  getRelatedProducts,
} from "@/lib/tap-products";
import { getLatestReportByProduct } from "@/lib/data/protocol-reports";

type PageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
  return getProductHandles().map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: PageProps) {
  const { handle } = await params;
  const product = findProductByHandle(handle);
  if (!product) return {};
  return {
    title: `${product.title} | TAP`,
    description: product.description,
    alternates: {
      canonical: buildCanonical(`/products/${product.handle}`, publicEnv.siteUrl),
    },
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: buildCanonical(product.image.src, publicEnv.siteUrl),
          alt: product.image.alt,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [buildCanonical(product.image.src, publicEnv.siteUrl)],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = findProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const recommendations = getRelatedProducts(handle, 3);
  const latestReport = getLatestReportByProduct(product.handle);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.gallery.map((image) => buildCanonical(image.src, publicEnv.siteUrl)),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: product.status === "available" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      url: buildCanonical(`/products/${product.handle}`, publicEnv.siteUrl),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Shop",
        item: buildCanonical("/shop", publicEnv.siteUrl),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.title,
        item: buildCanonical(`/products/${product.handle}`, publicEnv.siteUrl),
      },
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-background py-16">
        <div className="container-width">
          <ProductDetail 
            product={product} 
            recommendations={recommendations}
            latestReport={latestReport ? {
              id: latestReport.id,
              runId: latestReport.runId,
              date: latestReport.date,
            } : undefined}
          />
        </div>
      </section>
    </>
  );
}

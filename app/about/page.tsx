export const metadata = {
  title: "About TAP",
  description: "Next.js ecommerce blueprint for hero-grade safety standards.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Safety Standards",
      copy: "We pressure test every product for tensile strength, reflective visibility, and hardware failure rates. Reports publish quarterly.",
    },
    {
      title: "Testing Partners",
      copy: "TAP collaborates with K9 SAR units, therapy dog orgs, and military trainers across Virginia and Colorado.",
    },
    {
      title: "Impact Receipts",
      copy: "2% for the Pack grants are issued with transparent receipts so customers know which rescue they fueled.",
    },
  ];

  return (
    <section className="container-width py-16 space-y-10">
      <div className="space-y-4">
        <p className="eyebrow text-muted-foreground">
          About
        </p>
        <h1 className="text-4xl font-bold">True American Pets</h1>
        <p className="text-lg text-muted-foreground">
          Mission-led commerce for the heroes at your feet. TAP is the reference architecture for Shopify + Next.js deployments that put safety first.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((value) => (
          <div key={value.title} className="border border-border p-4">
            <h2 className="text-xl font-semibold">{value.title}</h2>
            <p className="text-sm text-muted-foreground">{value.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

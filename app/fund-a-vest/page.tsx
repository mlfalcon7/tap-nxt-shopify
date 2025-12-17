import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata = {
  title: "Fund a Vest",
  description: "Micro-donations to outfit working dogs across the U.S.",
};

export default function FundVestPage() {
  return (
    <section className="container-width py-16 space-y-10">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Action Center
        </p>
        <h1 className="text-4xl font-bold">Fund a Vest</h1>
        <p className="text-muted-foreground max-w-2xl">
          Every $150 deploys a ballistic-certified vest with ID patches and reflective upgrades. Choose a campaign and we’ll ship directly to the handler.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((tier) => (
          <div key={tier} className="border border-border p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Tier {tier}</h2>
            <p className="text-sm text-muted-foreground">
              {tier === 1
                ? "Contribute reflective panels + ID tags."
                : tier === 2
                ? "Cover the full TAP Service Vest."
                : "Outfit a hero with vest + Starter Pack bundle."}
            </p>
            <Button className="w-full">Donate ${tier * 75}</Button>
          </div>
        ))}
      </div>
      <ButtonLink href="/impact" variant="outline" className="inline-flex">
        See impact receipts
      </ButtonLink>
    </section>
  );
}

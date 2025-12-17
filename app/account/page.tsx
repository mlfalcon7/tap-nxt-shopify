import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { User, Package, Heart, Settings } from "lucide-react";

export const metadata = {
  title: "Account",
  description: "Manage your TAP account, orders, and preferences.",
};

export default function AccountPage() {
  return (
    <div className="container-width py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">Account</p>
          <h1 className="h1">My Account</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/account/orders"
            className="group flex flex-col gap-4 rounded-sm border border-border bg-surface p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-surface-strong">
                <Package className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Orders</h2>
                <p className="text-sm text-muted-foreground">View order history and tracking</p>
              </div>
            </div>
          </Link>

          <Link
            href="/account/wishlist"
            className="group flex flex-col gap-4 rounded-sm border border-border bg-surface p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-surface-strong">
                <Heart className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Wishlist</h2>
                <p className="text-sm text-muted-foreground">Saved items and favorites</p>
              </div>
            </div>
          </Link>

          <Link
            href="/account/settings"
            className="group flex flex-col gap-4 rounded-sm border border-border bg-surface p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-surface-strong">
                <Settings className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Settings</h2>
                <p className="text-sm text-muted-foreground">Account preferences and notifications</p>
              </div>
            </div>
          </Link>

          <Link
            href="/account/profile"
            className="group flex flex-col gap-4 rounded-sm border border-border bg-surface p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-surface-strong">
                <User className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Profile</h2>
                <p className="text-sm text-muted-foreground">Personal information and address</p>
              </div>
            </div>
          </Link>
        </div>

	        <div className="pt-8 border-t border-border">
	          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
	          <div className="flex flex-wrap gap-4">
	            <ButtonLink href="/cart" variant="outline">
	              View Cart
	            </ButtonLink>
	            <ButtonLink href="/shop" variant="outline">
	              Continue Shopping
	            </ButtonLink>
	            <ButtonLink href="/impact" variant="outline">
	              Impact Ledger
	            </ButtonLink>
	          </div>
	        </div>
      </div>
    </div>
  );
}


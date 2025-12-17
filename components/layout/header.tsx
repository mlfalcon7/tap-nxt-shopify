"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X, Search, User } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { UtilityBar } from "./utility-bar";
import { MegaMenu } from "./mega-menu";
import { TAPMark } from "@/components/brand";
import type { ComponentProps } from "react";

type LinkHref = ComponentProps<typeof Link>["href"];

const navLinks: { name: string; href: LinkHref; hasMegaMenu?: boolean }[] = [
  { name: "Shop", href: "/shop", hasMegaMenu: true },
  { name: "Bundles", href: "/bundles/hero-starter-pack" },
  { name: "Hall of Heroes", href: "/hall-of-heroes" },
  { name: "Manifesto", href: "/manifesto" },
  { name: "Campaigns", href: "/campaigns" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();
  const cartCount = cart?.totalQuantity ?? 0;

  return (
    <header className="sticky top-0 z-50 w-full">
      <UtilityBar />

      <div className="w-full border-b border-border bg-background transition-shadow duration-300 ease-out shadow-sm hover:shadow-md">
        <div className="container-width flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center py-4">
            <TAPMark variant="header" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const href = typeof link.href === "string" ? link.href : "";
              const isActive = href === "/" ? pathname === href : pathname.startsWith(href);
              const baseClasses =
                "relative text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 ease-out hover:text-foreground hover:scale-105 after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:bg-[var(--accent-secondary)] after:opacity-0 after:transition-opacity after:duration-200 heritage-stripe";

              if (link.hasMegaMenu) {
                return (
                  <div key={link.name} className="relative">
                    <button
                      className={cn(baseClasses, isActive && "text-foreground after:opacity-100")}
                      onMouseEnter={() => setMegaMenuOpen(true)}
                      onMouseLeave={() => setMegaMenuOpen(false)}
                      onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                    >
                      {link.name}
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(baseClasses, isActive && "text-foreground after:opacity-100")}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            {searchOpen ? (
              <div className="hidden md:flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                <input
                  type="search"
                  placeholder="Search gear..."
                  autoFocus
                  className="h-10 w-64 rounded-full border border-border bg-surface px-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                  onBlur={() => setSearchOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = e.currentTarget.value;
                      if (value) {
                        window.location.href = `/search?q=${encodeURIComponent(value)}`;
                      }
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Link href="/account" className="hidden md:block">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div
          className="relative hidden lg:block"
          onMouseEnter={() => setMegaMenuOpen(true)}
          onMouseLeave={() => setMegaMenuOpen(false)}
        >
          <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
        </div>
      </div>

      {mobileOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 z-50 bg-black/30 animate-in fade-in duration-200" 
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className="lg:hidden fixed left-0 top-0 z-50 h-full w-[320px] max-w-[85vw] bg-background shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-300"
            style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={(e) => {
              if (e.key === "Escape") setMobileOpen(false);
            }}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <TAPMark variant="header" width={120} height={30} className="h-7 w-auto" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="p-6 space-y-1">
              {/* Search in mobile */}
              <div className="mb-6">
                <input
                  type="search"
                  placeholder="Search gear..."
                  className="w-full h-11 px-4 text-sm bg-surface border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = e.currentTarget.value;
                      if (value) {
                        window.location.href = `/search?q=${encodeURIComponent(value)}`;
                        setMobileOpen(false);
                      }
                    }
                  }}
                />
              </div>

              <div className="space-y-1 mb-6">
                <p className="px-3 py-2 eyebrow text-muted-foreground">Shop</p>
                {navLinks.filter(link => link.name === "Shop" || link.name === "Bundles").map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-3 px-3 text-base font-semibold text-foreground hover:bg-surface-strong rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-1 mb-6">
                <p className="px-3 py-2 eyebrow text-[var(--accent-secondary)]">Mission</p>
                <Link
                  href="/action-center"
                  className="block py-3 px-3 text-base font-semibold text-foreground hover:bg-surface-strong rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                  onClick={() => setMobileOpen(false)}
                >
                  Action Center
                </Link>
                <Link
                  href="/stories"
                  className="block py-3 px-3 text-base font-semibold text-foreground hover:bg-surface-strong rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                  onClick={() => setMobileOpen(false)}
                >
                  Stories
                </Link>
                {navLinks.filter(link => ["Hall of Heroes", "Manifesto", "Campaigns", "About"].includes(link.name)).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-3 px-3 text-base font-semibold text-foreground hover:bg-surface-strong rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-border space-y-1">
                <p className="px-3 py-2 eyebrow text-muted-foreground">More</p>
                <Link
                  href="/account"
                  className="block py-3 px-3 text-base font-medium text-foreground hover:bg-surface-strong rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                  onClick={() => setMobileOpen(false)}
                >
                  Account
                </Link>
                <Link
                  href="/tools"
                  className="block py-3 px-3 text-base font-medium text-foreground hover:bg-surface-strong rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                  onClick={() => setMobileOpen(false)}
                >
                  Tools
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

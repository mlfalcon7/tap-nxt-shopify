import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Home, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="container-width py-24 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="flex justify-center mb-4">
          <Image
            src="/brand/logo-v2.png"
            alt="True American Pets"
            width={140}
            height={36}
            className="h-10 w-auto"
          />
        </div>
        <div className="space-y-4">
          <h1 className="h1 text-6xl md:text-7xl font-bold">404</h1>
          <h2 className="h2">Page Not Found</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonLink href="/" size="lg" className="w-full sm:w-auto">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </ButtonLink>
          <ButtonLink href="/shop" variant="outline" size="lg" className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse Shop
          </ButtonLink>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/shop" className="text-sm text-link hover:underline">
              Shop
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/stories" className="text-sm text-link hover:underline">
              Stories
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/hall-of-heroes" className="text-sm text-link hover:underline">
              Hall of Heroes
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/about" className="text-sm text-link hover:underline">
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

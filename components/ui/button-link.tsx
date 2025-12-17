"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className" | "children"> &
  Pick<ButtonProps, "variant" | "size"> & {
    className?: string;
    children: React.ReactNode;
  };

export function ButtonLink({ className, variant, size, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </Link>
  );
}

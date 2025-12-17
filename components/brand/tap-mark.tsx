import Image from "next/image";
import { cn } from "@/lib/utils";

type TAPMarkProps = {
  variant?: "header" | "headerCompact" | "footer";
  className?: string;
  width?: number;
  height?: number;
};

export function TAPMark({ variant = "header", className, width, height }: TAPMarkProps) {
  const config = {
    header: {
      alt: "True American Pets",
      defaultWidth: 140,
      defaultHeight: 36,
    },
    headerCompact: {
      src: "/brand/logo-v2-icon-blue.png",
      alt: "TAP",
      defaultWidth: 32,
      defaultHeight: 32,
    },
    footer: {
      src: "/brand/logo-v2-white-and-red.png",
      alt: "True American Pets",
      defaultWidth: 100,
      defaultHeight: 26,
    },
  };

  const { alt, defaultWidth, defaultHeight } = config[variant];

  if (variant === "header") {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <Image
          src="/brand/logo-v2.png"
          alt={alt}
          width={width ?? defaultWidth}
          height={height ?? defaultHeight}
          className={cn("h-8 w-auto tap-logo-light")}
          priority
        />
        <Image
          src="/brand/logo-v2-white-and-red.png"
          alt={alt}
          width={width ?? defaultWidth}
          height={height ?? defaultHeight}
          className={cn("h-8 w-auto tap-logo-dark")}
          priority
        />
      </span>
    );
  }

  const src =
    variant === "headerCompact"
      ? "/brand/logo-v2-icon-blue.png"
      : "/brand/logo-v2-white-and-red.png";

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? defaultWidth}
      height={height ?? defaultHeight}
      className={cn(
        "h-auto",
        variant === "headerCompact" && "h-8 w-8",
        variant === "footer" && "h-6 w-auto",
        className
      )}
      priority={false}
    />
  );
}


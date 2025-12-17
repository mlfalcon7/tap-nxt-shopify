import Image from "next/image";
import { cn } from "@/lib/utils";

type TAPWatermarkProps = {
  tone?: "light" | "dark";
  className?: string;
  opacity?: number;
};

export function TAPWatermark({ tone = "light", className, opacity }: TAPWatermarkProps) {
  const config = {
    light: {
      src: "/brand/logo-v2-icon-blue.png",
      defaultOpacity: 0.06, // 6% opacity
    },
    dark: {
      src: "/brand/logo-v2-icon-white.png",
      defaultOpacity: 0.05, // 5% opacity
    },
  };

  const { src, defaultOpacity } = config[tone];
  const finalOpacity = opacity ?? defaultOpacity;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 flex items-center justify-center",
        className
      )}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt=""
        width={400}
        height={400}
        className="h-auto w-full max-w-[60vw] object-contain"
        style={{ opacity: finalOpacity }}
        priority={false}
      />
    </div>
  );
}



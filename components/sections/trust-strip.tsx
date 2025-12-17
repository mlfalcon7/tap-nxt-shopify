import { cn } from "@/lib/utils";

const defaultPoints = [
  "Designed & Engineered in USA",
  "TAP Certified Safety",
  "2% for the Pack",
  "Lifetime Hero Guarantee",
] as const;

type TrustStripProps = {
  points?: readonly string[];
  className?: string;
  compact?: boolean;
};

export function TrustStrip({ points = defaultPoints, className, compact = false }: TrustStripProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 text-sm font-medium",
        compact ? "pt-2" : "pt-4",
        className
      )}
    >
      {points.map((point, index) => (
        <span key={point} className="flex items-center gap-2">
          <span aria-hidden className="text-[var(--accent-secondary)]">★</span>
          <span>{point}</span>
          {index < points.length - 1 && <span className="opacity-50">/</span>}
        </span>
      ))}
    </div>
  );
}

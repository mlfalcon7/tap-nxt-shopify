import { cn } from "@/lib/utils";

type USABadgeProps = {
  variant?: "default" | "small" | "stamp";
  className?: string;
};

export function USABadge({ variant = "default", className }: USABadgeProps) {
  const sizeClasses = {
    default: "px-3 py-1.5 text-xs",
    small: "px-2 py-1 text-[10px]",
    stamp: "px-4 py-2 text-sm",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-[var(--accent-secondary)] bg-[color-mix(in_srgb,var(--surface)_95%,transparent)] font-semibold uppercase tracking-wide text-[var(--accent-secondary)]",
        sizeClasses[variant],
        className
      )}
      role="img"
      aria-label="Made or Engineered in USA"
    >
      <span className="text-[var(--accent-secondary)]" aria-hidden>
        ★
      </span>
      <span>ENGINEERED IN USA</span>
    </div>
  );
}



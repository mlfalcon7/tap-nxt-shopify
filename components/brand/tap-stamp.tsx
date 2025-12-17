import { cn } from "@/lib/utils";

type TAPStampProps = {
  label: string;
  variant?: "default" | "small" | "large";
  className?: string;
};

export function TAPStamp({ label, variant = "default", className }: TAPStampProps) {
  const sizeClasses = {
    default: "px-3 py-1.5 text-xs",
    small: "px-2 py-1 text-[10px]",
    large: "px-4 py-2 text-sm",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-secondary)] bg-[color-mix(in_srgb,var(--surface)_95%,transparent)] font-semibold uppercase tracking-wide text-[var(--accent-secondary)]",
        sizeClasses[variant],
        className
      )}
      role="img"
      aria-label={label}
    >
      <span className="text-[var(--accent-secondary)] text-[0.7em]" aria-hidden>
        ★
      </span>
      <span>{label}</span>
    </div>
  );
}



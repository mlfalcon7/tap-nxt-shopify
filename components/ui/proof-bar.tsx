import { cn } from "@/lib/utils";

type ProofBarProps = {
  items: readonly string[];
  className?: string;
  variant?: "default" | "compact";
};

export function ProofBar({ items, className, variant = "default" }: ProofBarProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 lg:grid-cols-4",
        variant === "compact" ? "pt-3" : "pt-4",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item}
          className="flex min-h-12 items-center justify-center rounded-sm border border-[color-mix(in_srgb,var(--action-band-text)_35%,transparent)] bg-[color-mix(in_srgb,var(--action-band-bg)_35%,transparent)] px-4 py-3 text-center"
        >
          <span className="star-separator text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--action-band-text)_90%,transparent)]">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}


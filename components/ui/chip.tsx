import { cn } from "@/lib/utils";

type ChipProps = {
  label: string;
  variant?: "default" | "small" | "outline";
  className?: string;
};

export function Chip({ label, variant = "default", className }: ChipProps) {
  const sizeClasses = {
    default: "px-3 py-1 text-xs",
    small: "px-2 py-0.5 text-[10px]",
    outline: "px-3 py-1 text-xs border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold uppercase tracking-wide",
        variant === "default" && "bg-surface-strong text-foreground border border-[var(--border)]",
        variant === "small" && "bg-surface-strong text-foreground border border-[var(--border)]",
        variant === "outline" && "bg-transparent text-foreground border-[var(--border)]",
        sizeClasses[variant],
        className
      )}
    >
      {label}
    </span>
  );
}



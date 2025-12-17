import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  kicker?: string;
  title: string;
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({ kicker, title, className, titleClassName }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {kicker && (
        <div className="flex items-center gap-2">
          <span className="h-px w-8 border-t border-[var(--accent-secondary)]" aria-hidden />
          <span className="text-xs text-[var(--accent-secondary)]" aria-hidden>
            ★
          </span>
          <span className="eyebrow text-[var(--accent-secondary)]">{kicker}</span>
          <span className="text-xs text-[var(--accent-secondary)]" aria-hidden>
            ★
          </span>
          <span className="flex-1 h-px border-t border-[var(--accent-secondary)]" aria-hidden />
        </div>
      )}
      <h2 className={cn("h2", titleClassName)}>{title}</h2>
    </div>
  );
}



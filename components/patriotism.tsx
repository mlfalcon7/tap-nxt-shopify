import Image from "next/image";
import { cn } from "@/lib/utils";

type PatriotRuleProps = {
  label?: string;
  className?: string;
  tone?: "light" | "dark";
};

export function PatriotRule({ label, className, tone = "light" }: PatriotRuleProps) {
  const iconSrc = tone === "dark" ? "/brand/logo-v2-icon-white.png" : "/brand/logo-v2-icon.png";

  return (
    <div
      className={cn(
        "flex items-center gap-4 py-10 text-[var(--text-secondary)] heritage-stripe",
        className
      )}
      role="separator"
      aria-orientation="horizontal"
    >
      <span className="flex items-center gap-2">
        <span className="text-xs text-[var(--accent-secondary)]" aria-hidden>
          ★
        </span>
        <span className="h-px w-12 border-t border-dashed border-[var(--border-strong)]" aria-hidden />
      </span>
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          {label}
        </span>
      )}
      <span className="flex-1 h-px border-t border-dashed border-[var(--border)]" aria-hidden />
      <span className="flex items-center gap-2" aria-hidden>
        <span className="h-[2px] w-5 bg-[var(--accent-secondary)]" />
        <Image src={iconSrc} alt="" width={14} height={14} className="opacity-80" />
        <span className="text-xs text-[var(--accent-secondary)] rotate-180">★</span>
      </span>
    </div>
  );
}

const patchLabels = {
  US_PROTOCOL: "US PROTOCOL",
  K9: "K9 ISSUE",
  K9_ISSUE: "K9 ISSUE",
  VETERANS: "VETERANS",
  SHELTERS: "SHELTERS",
  LIMITED: "LIMITED DROP",
} as const;

export type PatchBadgeVariant = keyof typeof patchLabels;

type PatchBadgeProps = {
  variant?: PatchBadgeVariant;
  className?: string;
};

export function PatchBadge({ variant = "US_PROTOCOL", className }: PatchBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-[var(--secondary)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] px-2 py-1 uppercase tracking-[0.22em]",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-secondary)]" aria-hidden />
      <span className="text-xs font-semibold text-[var(--accent)] whitespace-nowrap">
        {patchLabels[variant]}
      </span>
    </div>
  );
}

type StampProps = {
  title: string;
  subtitle?: string;
  size?: "sm" | "md";
  tone?: "light" | "inverse";
  className?: string;
};

export function Stamp({
  title,
  subtitle,
  size = "sm",
  tone = "light",
  className,
}: StampProps) {
  const toneClass =
    tone === "inverse"
      ? "bg-[color-mix(in_srgb,var(--action-band-text)_12%,transparent)]"
      : "bg-[color-mix(in_srgb,var(--surface)_92%,transparent)]";

  const sizeClass =
    size === "md"
      ? "px-5 py-2 text-[0.65rem] gap-1.5"
      : "px-4 py-1.5 text-[0.55rem] gap-1";

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center border border-dashed border-[var(--accent)] text-[var(--accent)] font-semibold uppercase tracking-[0.22em]",
        toneClass,
        sizeClass,
        className
      )}
      role="note"
      aria-label={subtitle ? `${title} — ${subtitle}` : title}
    >
      <span className="flex items-center gap-1">
        <span aria-hidden>★</span>
        {title}
      </span>
      {subtitle && (
        <span className="text-xs tracking-wide font-medium opacity-80">
          {subtitle}
        </span>
      )}
    </div>
  );
}

type TapSealProps = {
  label: string;
  detail?: string;
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
};

export function TapSeal({ label, detail, tone = "light", compact = false, className }: TapSealProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-4",
        compact ? "py-1" : "py-1.5",
        tone === "dark" ? "text-[var(--action-band-text)]" : "text-[var(--text-primary)]",
        "text-xs font-semibold uppercase tracking-wide",
        className
      )}
    >
      <span className="text-[var(--accent)] text-xs" aria-hidden>
        ★
      </span>
      <span>{label}</span>
      {detail && (
        <>
          <span className="text-[var(--border)]">/</span>
          <span className="tracking-[0.22em]">{detail}</span>
        </>
      )}
    </div>
  );
}

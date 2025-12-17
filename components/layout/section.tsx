import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: "default" | "muted" | "navy";
  id?: string;
};

export function Section({
  children,
  className,
  containerClassName,
  tone = "default",
  id,
}: SectionProps) {
  const toneClass =
    tone === "muted"
      ? "bg-surface-strong"
      : tone === "navy"
      ? "bg-[var(--action-band-bg)] text-[var(--action-band-text)]"
      : "bg-background";

  return (
    <section id={id} className={cn("py-16 sm:py-20", toneClass, className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

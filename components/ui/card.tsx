import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-[var(--border)] bg-surface p-6 shadow-sm",
        hover && "transition-all duration-200 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}



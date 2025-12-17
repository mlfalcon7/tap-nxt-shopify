import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] hover:-translate-y-0.5 active:translate-y-0",
                destructive: "bg-danger text-primary-foreground hover:bg-[color-mix(in_srgb,var(--danger)_85%,black)] hover:-translate-y-0.5 active:translate-y-0",
                outline: "border border-[var(--border-strong)] bg-transparent text-[var(--text-primary)] hover:bg-[color-mix(in_srgb,var(--surface-strong)_85%,transparent)] hover:text-[var(--text-primary)] hover:-translate-y-0.5 active:translate-y-0",
                secondary: "bg-secondary text-secondary-foreground hover:bg-[var(--secondary-hover)] active:bg-[var(--secondary-active)] hover:-translate-y-0.5 active:translate-y-0",
                ghost: "text-[var(--text-primary)] hover:bg-[color-mix(in_srgb,var(--surface-strong)_65%,transparent)]",
                link: "text-link underline-offset-4 hover:text-link-hover hover:underline",
                cta: "bg-accent text-accent-foreground hover:bg-[color-mix(in_srgb,var(--accent)_90%,black)] hover:-translate-y-0.5 active:translate-y-0",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-12 px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

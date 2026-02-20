import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "success" | "warning" | "destructive" | "primary";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ variant = "default", className = "", children, ...props }, ref) => {
        const variantStyles = {
            default: "text-foreground bg-muted",
            success: "text-checkout-success bg-checkout-success-light",
            warning: "text-yellow-600 bg-yellow-100",
            destructive: "text-destructive bg-destructive/10",
            primary: "text-primary-foreground bg-checkout-badge",
        };

        return (
            <span
                ref={ref}
                className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${variantStyles[variant]} ${className}`}
                {...props}
            >
                {children}
            </span>
        );
    }
);

Badge.displayName = "Badge";

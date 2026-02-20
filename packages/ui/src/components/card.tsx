import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "bordered";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ variant = "default", className = "", children, ...props }, ref) => {
        const baseStyles = "rounded-lg";
        const variantStyles = {
            default: "bg-card",
            bordered: "bg-card border border-border",
        };

        return (
            <div
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

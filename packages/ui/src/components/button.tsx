import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
        const baseStyles = "rounded-lg font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer inline-flex items-center justify-center";
        
        const variantStyles = {
            primary: "bg-primary text-primary-foreground hover:opacity-90",
            secondary: "border border-input bg-card text-foreground hover:border-muted-foreground/40",
            outline: "border border-input text-foreground hover:bg-accent",
            ghost: "text-foreground hover:bg-accent",
        };

        const sizeStyles = {
            sm: "px-3 py-2 text-xs",
            md: "px-4 py-3 text-sm",
            lg: "px-6 py-3.5 text-sm",
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

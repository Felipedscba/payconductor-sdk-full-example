import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    required?: boolean;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, required, error, className = "", ...props }, ref) => {
        return (
            <div>
                {label && (
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                        {label}{" "}
                        {required && <span className="text-destructive">*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
                        error ? "border-destructive" : ""
                    } ${className}`}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs text-destructive">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

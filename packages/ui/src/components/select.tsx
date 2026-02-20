import React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    required?: boolean;
    error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, required, error, className = "", children, ...props }, ref) => {
        return (
            <div>
                {label && (
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                        {label}{" "}
                        {required && <span className="text-destructive">*</span>}
                    </label>
                )}
                <select
                    ref={ref}
                    className={`w-full rounded-lg border border-input bg-card px-3 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all appearance-none ${
                        error ? "border-destructive" : ""
                    } ${className}`}
                    {...props}
                >
                    {children}
                </select>
                {error && (
                    <p className="mt-1 text-xs text-destructive">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";

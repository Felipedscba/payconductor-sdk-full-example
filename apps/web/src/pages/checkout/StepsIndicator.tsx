interface StepsIndicatorProps {
    currentStep: "data" | "address" | "payment";
}

export function StepsIndicator({ currentStep }: StepsIndicatorProps) {
    const steps = [
        { id: "data", label: "1. Dados pessoais" },
        { id: "address", label: "2. Endereço" },
        { id: "payment", label: "3. Pagamento" },
    ];

    const currentIndex = steps.findIndex((s) => s.id === currentStep);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
            <div className="flex items-center gap-3 text-sm">
                {steps.map((step, index) => (
                    <div key={step.id}>
                        <span
                            className={`font-medium ${
                                index < currentIndex
                                    ? "text-checkout-success"
                                    : index === currentIndex
                                      ? "text-foreground"
                                      : "text-muted-foreground"
                            }`}
                        >
                            {step.label}
                        </span>
                        {index < steps.length - 1 && (
                            <span key={`arrow-${index}`} className="text-muted-foreground">
                                →
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

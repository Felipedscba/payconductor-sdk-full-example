import { Lock } from "lucide-react";

export function CheckoutHeader() {
    return (
        <header className="border-b border-border bg-card">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-foreground tracking-tight">
                    checkout
                </h1>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Ambiente seguro</span>
                </div>
            </div>
        </header>
    );
}

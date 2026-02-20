import {
    Lock,
    Info,
    CreditCard,
    Smartphone,
    Receipt,
} from "lucide-react";
import { Button } from "@repo/ui";
import { useState } from "react";
import type { BuyerData } from "./step01-buyer-data-form";
import type { AddressData } from "./step02-address-form";

interface PaymentFormProps {
    buyerData: BuyerData;
    addressData: AddressData;
    cartItems: Array<{ id: string; qty: number }>;
}

type PaymentMethod = "credit" | "pix" | "boleto";

export function PaymentForm(_: PaymentFormProps) {
    const [selectedMethod, setSelectedMethod] =
        useState<PaymentMethod>("credit");

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
                Método de pagamento
            </h2>

            {/* Digital Wallets */}
            <div className="flex items-center justify-center gap-3">
                <button className="border border-border rounded-lg px-8 py-4 hover:bg-accent transition-colors flex items-center gap-2">
                    <img className="w-14" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1280px-Google_Pay_Logo.svg.png"/>
                </button>
                <button className="border border-border rounded-lg px-8 py-4 hover:bg-accent transition-colors flex items-center gap-2">
                    <img className="w-14" src="https://www.shutterstock.com/image-illustration/apple-pay-logo-on-transparent-600nw-2311644815.jpg"/>
                </button>
            </div>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        OU
                    </span>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
                {/* Crédito */}
                <button
                    onClick={() => setSelectedMethod("credit")}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg border transition-colors ${
                        selectedMethod === "credit"
                            ? "bg-primary/10 border-primary"
                            : "bg-background border-border hover:bg-accent"
                    }`}
                >
                    <div className="p-3 bg-gray-400/10 rounded-full text-primary">
                        <CreditCard className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-foreground">Crédito</span>
                </button>

                {/* Pix */}
                <button
                    onClick={() => setSelectedMethod("pix")}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2 rounded-lg border transition-colors ${
                        selectedMethod === "pix"
                            ? "bg-primary/10 border-primary"
                            : "bg-background border-border hover:bg-accent"
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gray-400/10 rounded-full text-primary">
                            <Smartphone className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-foreground">Pix</span>
                    </div>
                    <span className="text-xs text-primary/70">
                        com desconto
                    </span>
                </button>

                {/* Boleto */}
                <button
                    onClick={() => setSelectedMethod("boleto")}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2 rounded-lg border transition-colors ${
                        selectedMethod === "boleto"
                            ? "bg-primary/10 border-primary"
                            : "bg-background border-border hover:bg-accent"
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gray-400/10 rounded-full text-primary">
                            <Receipt className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-foreground">
                            Boleto
                        </span>
                    </div>
                    <span className="text-xs text-primary/70">
                        com desconto
                    </span>
                </button>
            </div>

            <Button variant="primary" size="lg" className="w-full">
                Confirmar pagamento
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                <span>Pagamento protegido</span>
                <Info className="h-3.5 w-3.5" />
            </div>
        </div>
    );
}

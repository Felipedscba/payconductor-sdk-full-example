import { useState, useEffect } from "react";
import { Button, Card } from "@repo/ui";
import { BuyerDataForm, type BuyerData } from "./BuyerDataForm";
import { AddressForm, type AddressData } from "./AddressForm";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { OrderSummary } from "./OrderSummary";
import { CheckoutHeader } from "./CheckoutHeader";
import { StepsIndicator } from "./StepsIndicator";
import { getCart, type TApiCartResponse } from "../../modules/api";

export function CheckoutPage() {
    const [step, setStep] = useState<"data" | "address" | "payment">("data");
    const [buyerData, setBuyerData] = useState<BuyerData | null>(null);
    const [addressData, setAddressData] = useState<AddressData | null>(null);
    const [cartData, setCartData] = useState<TApiCartResponse | null>(null);

    useEffect(() => {
        getCart()
            .then((data) => setCartData(data))
            .catch((error) =>
                console.error("Erro ao carregar carrinho:", error),
            );
    }, []);

    const handleContinueData = (data: BuyerData) => {
        setBuyerData(data);
        setStep("address");
    };

    const handleContinueAddress = (data: AddressData) => {
        setAddressData(data);
        setStep("payment");
    };
    
    return (
        <div className="min-h-screen bg-background">
            <CheckoutHeader />
            <StepsIndicator currentStep={step} />

            {/* Main content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
                    <Card variant="bordered" className="p-6 sm:p-8">
                        {step === "data" && (
                            <BuyerDataForm
                                onContinue={handleContinueData}
                                initialData={buyerData || undefined}
                            />
                        )}

                        {step === "address" && (
                            <div>
                                <Button
                                    onClick={() => setStep("data")}
                                    variant="ghost"
                                    className="text-sm text-primary hover:underline mb-6 px-0"
                                >
                                    ← Voltar para dados pessoais
                                </Button>
                                <AddressForm
                                    onContinue={handleContinueAddress}
                                    initialData={addressData || undefined}
                                />
                            </div>
                        )}

                        {step === "payment" && (
                            <div>
                                <Button
                                    onClick={() => setStep("address")}
                                    variant="ghost"
                                    className="text-sm text-primary hover:underline mb-6 px-0"
                                >
                                    ← Voltar para endereço
                                </Button>
                                {buyerData && addressData && cartData && (
                                    <PaymentMethodSelector
                                        buyerData={buyerData}
                                        addressData={addressData}
                                        cartItems={cartData.products.map(
                                            (p) => ({
                                                id: p.id,
                                                qty: p.qty,
                                            }),
                                        )}
                                    />
                                )}
                            </div>
                        )}
                    </Card>
                    <aside>
                        <OrderSummary />
                    </aside>
                </div>
            </main>
        </div>
    );
}

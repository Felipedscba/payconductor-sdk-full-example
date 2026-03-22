import { useState } from "react";
import { Input, Button } from "@repo/ui";
import { createOrder, type TApiCreateOrderRequest } from "../../modules/api";
import type { BuyerData } from "./step01-buyer-data-form";
import type { AddressData } from "./step02-address-form";
import {
    PayConductor,
    PayConductorCheckoutElement,
    usePayConductor,
    usePayconductorElement,
} from "@payconductor/react";
import { env } from "../../modules/env";

interface PaymentFormProps {
    buyerData: BuyerData;
    addressData: AddressData;
    cartItems: Array<{ id: string; qty: number }>;
}

export function PaymentForm(props: PaymentFormProps) {
    function handleEvent(name: string, content?: any) {
        alert(`Evento: ${name}\nConteúdo: ${JSON.stringify(content)}`);
    }

    return (
        <PayConductor
            publicKey={env.PAYCONDUCTOR_PUBLIC_KEY}
            theme={{ primaryColor: "#0066ff" }}
            locale="pt-BR"
            showPaymentButtons={false}
            onPaymentComplete={(result) =>
                handleEvent("paymentComplete", result)
            }
        >
            <PaymentFormContent {...props} />
        </PayConductor>
    );
}

function PaymentFormContent({
    buyerData,
    addressData,
    cartItems,
}: PaymentFormProps) {
    const [loading, setLoading] = useState(false);
    const { error } = usePayConductor();
    const [paymentResult, setPaymentResult] = useState<{
        pix?: { qrCodeUrl: string; copyAndPasteCode: string };
    }>(null);
    const { confirmPayment } = usePayconductorElement();

    const handleFinalize = async () => {
        let step = "criar pedido";
        setLoading(true);
        try {
            const orderRequest: TApiCreateOrderRequest = {
                items: cartItems,
                customer: {
                    ...buyerData,
                    address: addressData,
                },
            };

            const response = await createOrder(orderRequest);
            console.log("Pedido criado:", response);
            step = "confirmar pagamento";
            const result = await confirmPayment({ orderId: response.id });
            console.log("Resultado do pagamento:", result);
            setPaymentResult(result);
        } catch (error: any) {
            let message = "";
            if (error.response?.data?.message) {
                message = error.response.data?.message;
            }
            if (!message) {
                message = error.message || "Unknown error";
            }
            console.error(`Erro ao ${step}:`, error);
            alert(`Erro ao ${step}: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">
                    Método de pagamento
                </h2>
                {error && (
                    <div className="min-h-100 flex items-center justify-center text-red-500">
                        Erro ao carregar método de pagamento: {error}
                    </div>
                )}
                <div className={paymentResult ? "hidden" : ""}>
                    <PayConductorCheckoutElement />

                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={handleFinalize}
                        disabled={loading}
                    >
                        {loading ? "Processando..." : "Finalizar compra"}
                    </Button>
                </div>
                {paymentResult?.pix && (
                    <div className="mt-4 p-4 border rounded bg-green-50">
                        <h3 className="font-semibold">
                            Pagamento Pix - QR Code
                        </h3>
                        <p>
                            Use o QR Code abaixo para finalizar seu pagamento
                            via Pix:
                        </p>
                        <img
                            src={paymentResult.pix.qrCodeUrl}
                            alt="QR Code Pix"
                            className="mt-2 w-48 h-48 object-contain"
                        />
                        <p className="mt-2 text-sm text-gray-600">
                            Ou copie e cole o código abaixo no seu app de banco:
                        </p>
                        <Input
                            type="text"
                            readOnly
                            value={paymentResult.pix.copyAndPasteCode}
                            className="mt-1 w-full"
                        />
                    </div>
                )}
            </div>
        </>
    );
}

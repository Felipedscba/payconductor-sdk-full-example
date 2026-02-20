import { useState } from "react";
import { Lock, Info } from "lucide-react";
import { Button } from "@repo/ui";
import { createOrder, type TApiCreateOrderRequest } from "../../modules/api";
import type { BuyerData } from "./step01-buyer-data-form";
import type { AddressData } from "./step02-address-form";
import PayConductor, {
    useElement,
    usePayConductor,
} from "@payconductor-sdk-web/library-react";
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
            onReady={() => handleEvent("Ready", null)}
            onPaymentComplete={(result) =>
                handleEvent("paymentComplete", result)
            }
        >
            <PaymentFormContent {...props} />
        </PayConductor>
    );
}

function PayConductorCheckoutElement() {
    return <div></div>
}

function PaymentFormContent({
    buyerData,
    addressData,
    cartItems,
}: PaymentFormProps) {
    const [loading, setLoading] = useState(false);
    const { isReady, error } = usePayConductor();
    const { } = useElement()

    const handleFinalize = async () => {
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
            alert(`Pedido criado com sucesso! ID: ${response.externalId}`);
        } catch (error: any) {
            let message = "Unknown error";
            if (error?.response) {
                message = error.response.data?.message || message;
            }
            if (!message) {
                message = error.message || message;
            }
            console.error("Erro ao criar pedido:", error);
            alert(`Erro ao criar pedido: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!isReady && (
                <div className="min-h-100 flex items-center justify-center">
                    <div>Carregando método de pagamento...</div>
                </div>
            )}
            {error && (
                <div className="min-h-100 flex items-center justify-center text-red-500">
                    Erro ao carregar método de pagamento: {error}
                </div>
            )}
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">
                    Método de pagamento
                </h2>

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

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Pagamento protegido</span>
                    <Info className="h-3.5 w-3.5" />
                </div>
            </div>
        </>
    );
}

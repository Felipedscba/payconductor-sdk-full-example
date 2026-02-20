import { useState } from "react";
import { Lock, Info } from "lucide-react";
import { Button } from "@repo/ui";
import { createOrder, type TApiCreateOrderRequest } from "../../modules/api";
import type { BuyerData } from "./BuyerDataForm";
import type { AddressData } from "./AddressForm";
import PayConductor, {
    usePayConductor,
} from "@payconductor-sdk-web/library-react";

interface PaymentMethodSelectorProps {
    buyerData: BuyerData;
    addressData: AddressData;
    cartItems: Array<{ id: string; qty: number }>;
}

export function PaymentMethodSelector({
    buyerData,
    addressData,
    cartItems,
}: PaymentMethodSelectorProps) {
    const [loading, setLoading] = useState(false);
    const { isReady, error } = usePayConductor();

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
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            alert("Erro ao criar pedido. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    function handleEvent(name: string, content?: any) {
        alert(`Evento: ${name}\nConteúdo: ${JSON.stringify(content)}`);
    }

    if (error) {
        return (
            <div className="min-h-100 flex items-center justify-center">
                <div>Erro ao carregar PayConductor: {error}</div>
            </div>
        );
    }

    if (!isReady) {
        return (
            <div className="min-h-100 flex items-center justify-center">
                <div>Carregando...</div>
            </div>
        );
    }

    return (
        <PayConductor
            publicKey="pk_test_123"
            theme={{ primaryColor: "#0066ff" }}
            locale="pt-BR"
            onReady={() => handleEvent("Ready", null)}
            onPaymentComplete={(result) =>
                handleEvent("paymentComplete", result)
            }
        >
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">
                    Método de pagamento
                </h2>

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
        </PayConductor>
    );
}

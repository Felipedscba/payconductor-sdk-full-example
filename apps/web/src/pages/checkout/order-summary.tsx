import { useState, useEffect } from "react";
import { Badge, Card } from "@repo/ui";
import { getCart, type TApiCartResponse } from "../../modules/api";

export function OrderSummary() {
    const [cartData, setCartData] = useState<TApiCartResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCart()
            .then((data) => {
                setCartData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao carregar carrinho:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Card
                variant="bordered"
                className="p-6 space-y-6 lg:sticky lg:top-8"
            >
                <div>Carregando...</div>
            </Card>
        );
    }

    if (!cartData) {
        return (
            <Card
                variant="bordered"
                className="p-6 space-y-6 lg:sticky lg:top-8"
            >
                <div>Erro ao carregar carrinho</div>
            </Card>
        );
    }

    const items = cartData.products;
    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.qty,
        0,
    );

    const shipping = cartData.shippingFee;
    const total = subtotal + shipping;

    const fmt = (v: number) =>
        v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    return (
        <Card variant="bordered" className="p-6 space-y-6 lg:sticky lg:top-8">
            <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Checkout
                </span>
                <h2 className="text-2xl font-bold text-foreground mt-1">
                    Resumo da compra
                </h2>
            </div>

            <div className="space-y-4">
                {items.map(item => (
                    <Card key={item.id} variant="bordered" className="p-4 space-x-3 flex items-center">
                        <div className="size-12">
                        <img src={item.photo} alt={item.name} className="max-w-full max-h-full object-cover rounded-md m-auto" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">
                                {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                            <div className="flex items-center justify-between pt-1 w-full">
                                <Badge
                                    variant="primary"
                                    className="font-semibold"
                                >
                                    {item.qty}{" "}
                                    {item.qty > 1 ? "unidades" : "unidade"}
                                </Badge>
                                <span className="text-sm font-semibold text-foreground ms-auto">
                                    {fmt(item.price)} /un.
                                </span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card variant="bordered" className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                        {fmt(subtotal)}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="font-medium text-foreground">
                        {fmt(shipping)}
                    </span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                    <span className="font-semibold text-foreground">
                        Total a pagar
                    </span>
                    <span className="font-bold text-lg text-foreground">
                        {fmt(total)}
                    </span>
                </div>
            </Card>
        </Card>
    );
}

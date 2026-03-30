import { useState } from "react";
import { Card } from "@repo/ui";
import { useTokenize } from "@payconductor/react";
import { env } from "../../modules/env";
import { createOrder, type TApiCreateOrderRequest } from "../../modules/api";
import { TokenizeForm, type TokenizeFormData } from "./tokenize-form";
import { TokenizeResult } from "./tokenize-result";

export type TokenizePageResult = {
	cardToken: string;
	orderId?: string;
	paymentStatus?: string;
};

export function TokenizePage() {
	const [result, setResult] = useState<TokenizePageResult | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { tokenizeCard } = useTokenize({
		publicKey: env.PAYCONDUCTOR_PUBLIC_KEY,
		onSuccess: (token) => console.log("Token gerado:", token),
		onError: (err) => setError(err.message),
	});

	const handleTokenize = async (formData: TokenizeFormData) => {
		setLoading(true);
		setError(null);
		setResult(null);

		try {
			const cardToken = await tokenizeCard({
				customer: {
					name: formData.customerName,
					email: formData.customerEmail,
					documentNumber: formData.customerDocument,
					documentType: formData.customerDocumentType === "CPF" ? "Cpf" as const : "Cnpj" as const,
					phoneNumber: formData.customerPhone,
				},
				card: {
					number: formData.cardNumber,
					holderName: formData.cardHolderName,
					cvv: formData.cardCvv,
					expiration: {
						month: Number(formData.cardExpMonth),
						year: Number(formData.cardExpYear),
					},
				},
			});

			if (!cardToken) return;

			const orderRequest: TApiCreateOrderRequest = {
				items: [{ id: "test-product-001", qty: 1 }],
				customer: {
					name: formData.customerName,
					email: formData.customerEmail,
					documentType: formData.customerDocumentType,
					documentNumber: formData.customerDocument,
					phoneNumber: formData.customerPhone,
					address: {
						street: formData.street,
						number: formData.addressNumber,
						neighborhood: formData.neighborhood,
						city: formData.city,
						state: formData.state,
						country: "BR",
						zipCode: formData.zipCode,
					},
				},
			};

			const order = await createOrder(orderRequest);

			setResult({
				cardToken,
				orderId: order.externalId,
				paymentStatus: "Token gerado e pedido criado",
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Erro desconhecido";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<header className="border-b border-border bg-surface">
				<div className="max-w-4xl mx-auto px-4 py-4">
					<h1 className="text-xl font-semibold text-foreground">
						PayConductor - Teste de Tokenizacao
					</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Tokenize um cartao e crie um pedido de teste
					</p>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
					<Card variant="bordered" className="p-6">
						<TokenizeForm onSubmit={handleTokenize} loading={loading} />
						{error && (
							<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
								{error}
							</div>
						)}
					</Card>

					<aside>
						<TokenizeResult result={result} />
					</aside>
				</div>
			</main>
		</div>
	);
}

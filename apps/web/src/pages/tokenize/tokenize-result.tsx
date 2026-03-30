import { Card } from "@repo/ui";
import type { TokenizePageResult } from "./page";

interface TokenizeResultProps {
	result: TokenizePageResult | null;
}

export function TokenizeResult({ result }: TokenizeResultProps) {
	return (
		<Card variant="bordered" className="p-6 sticky top-8">
			<h3 className="text-lg font-medium text-foreground mb-4">Resultado</h3>

			{!result && (
				<p className="text-sm text-muted-foreground">
					Preencha o formulario e clique em tokenizar para ver o resultado.
				</p>
			)}

			{result && (
				<div className="space-y-3">
					<ResultRow label="Card Token" value={result.cardToken} />
					{result.orderId && <ResultRow label="Order ID" value={result.orderId} />}
					{result.paymentStatus && <ResultRow label="Status" value={result.paymentStatus} />}
				</div>
			)}
		</Card>
	);
}

function ResultRow({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<span className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">
				{label}
			</span>
			<span className="block text-sm text-foreground font-mono mt-0.5 break-all">
				{value}
			</span>
		</div>
	);
}

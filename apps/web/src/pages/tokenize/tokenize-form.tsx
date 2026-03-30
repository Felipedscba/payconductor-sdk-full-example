import { useState } from "react";
import { Button } from "@repo/ui";

export type TokenizeFormData = {
	customerName: string;
	customerEmail: string;
	customerDocument: string;
	customerDocumentType: "CPF" | "CNPJ";
	customerPhone: string;
	cardNumber: string;
	cardHolderName: string;
	cardExpMonth: string;
	cardExpYear: string;
	cardCvv: string;
	street: string;
	addressNumber: string;
	neighborhood: string;
	city: string;
	state: string;
	zipCode: string;
};

const defaultData: TokenizeFormData = {
	customerName: "Joao Silva",
	customerEmail: "joao@teste.com",
	customerDocument: "12345678901",
	customerDocumentType: "CPF",
	customerPhone: "11999999999",
	cardNumber: "4111111111111111",
	cardHolderName: "JOAO SILVA",
	cardExpMonth: "12",
	cardExpYear: "2028",
	cardCvv: "123",
	street: "Rua Teste",
	addressNumber: "100",
	neighborhood: "Centro",
	city: "Sao Paulo",
	state: "SP",
	zipCode: "01001000",
};

interface TokenizeFormProps {
	onSubmit: (data: TokenizeFormData) => void;
	loading: boolean;
}

export function TokenizeForm({ onSubmit, loading }: TokenizeFormProps) {
	const [form, setForm] = useState<TokenizeFormData>(defaultData);

	const update = (field: keyof TokenizeFormData, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(form);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Dados do cliente */}
			<fieldset className="space-y-3">
				<legend className="text-lg font-medium text-foreground">Dados do cliente</legend>
				<div className="grid grid-cols-2 gap-3">
					<Input label="Nome" value={form.customerName} onChange={(v) => update("customerName", v)} />
					<Input label="Email" value={form.customerEmail} onChange={(v) => update("customerEmail", v)} />
				</div>
				<div className="grid grid-cols-3 gap-3">
					<Input label="Documento" value={form.customerDocument} onChange={(v) => update("customerDocument", v)} />
					<div>
						<label className="block text-sm font-medium text-foreground mb-1">Tipo</label>
						<select
							className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
							value={form.customerDocumentType}
							onChange={(e) => update("customerDocumentType", e.target.value)}
						>
							<option value="CPF">CPF</option>
							<option value="CNPJ">CNPJ</option>
						</select>
					</div>
					<Input label="Telefone" value={form.customerPhone} onChange={(v) => update("customerPhone", v)} />
				</div>
			</fieldset>

			{/* Dados do cartao */}
			<fieldset className="space-y-3">
				<legend className="text-lg font-medium text-foreground">Dados do cartao</legend>
				<Input label="Numero do cartao" value={form.cardNumber} onChange={(v) => update("cardNumber", v)} />
				<Input label="Nome no cartao" value={form.cardHolderName} onChange={(v) => update("cardHolderName", v)} />
				<div className="grid grid-cols-3 gap-3">
					<Input label="Mes" value={form.cardExpMonth} onChange={(v) => update("cardExpMonth", v)} />
					<Input label="Ano" value={form.cardExpYear} onChange={(v) => update("cardExpYear", v)} />
					<Input label="CVV" value={form.cardCvv} onChange={(v) => update("cardCvv", v)} />
				</div>
			</fieldset>

			{/* Endereco */}
			<fieldset className="space-y-3">
				<legend className="text-lg font-medium text-foreground">Endereco</legend>
				<div className="grid grid-cols-[1fr_100px] gap-3">
					<Input label="Rua" value={form.street} onChange={(v) => update("street", v)} />
					<Input label="Numero" value={form.addressNumber} onChange={(v) => update("addressNumber", v)} />
				</div>
				<div className="grid grid-cols-3 gap-3">
					<Input label="Bairro" value={form.neighborhood} onChange={(v) => update("neighborhood", v)} />
					<Input label="Cidade" value={form.city} onChange={(v) => update("city", v)} />
					<Input label="Estado" value={form.state} onChange={(v) => update("state", v)} />
				</div>
				<Input label="CEP" value={form.zipCode} onChange={(v) => update("zipCode", v)} />
			</fieldset>

			<Button
				variant="primary"
				size="lg"
				className="w-full"
				type="submit"
				disabled={loading}
			>
				{loading ? "Tokenizando..." : "Tokenizar cartao e criar pedido"}
			</Button>
		</form>
	);
}

function Input({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<div>
			<label className="block text-sm font-medium text-foreground mb-1">{label}</label>
			<input
				type="text"
				className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}

import { useState } from "react";
import { Input, Select, Button } from "@repo/ui";

export type BuyerData = {
    email: string;
    name: string;
    documentType: string;
    documentNumber: string;
    phoneNumber: string;
};

interface BuyerDataFormProps {
    onContinue: (data: BuyerData) => void;
    initialData?: BuyerData;
}

export function BuyerDataForm({ onContinue, initialData }: BuyerDataFormProps) {
    const [formData, setFormData] = useState<BuyerData>(
        initialData || {
            email: "ana.silva@exemplo.com",
            name: "Ana Cristina da Silva",
            documentType: "Cpf",
            documentNumber: "123.456.789-00",
            phoneNumber: "(11) 9 8765-4321",
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onContinue(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            <h2 className="text-xl font-semibold text-foreground">
                Dados pessoais
            </h2>

            <div className="space-y-4">
                <Input
                    type="email"
                    label="E-mail"
                    placeholder="anasilva@exemplo.com"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    required
                />

                <Input
                    type="text"
                    label="Nome completo"
                    placeholder="Ana Cristina da Silva"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    required
                />

                <div className="grid grid-cols-[140px_1fr] gap-3">
                    <Select
                        label="Documento"
                        value={formData.documentType}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                documentType: e.target.value,
                            })
                        }
                    >
                        <option value="CPF">CPF</option>
                        <option value="CNPJ">CNPJ</option>
                    </Select>
                    <Input
                        type="text"
                        label="Número do documento"
                        placeholder={
                            formData.documentType === "Cpf"
                                ? "000.000.000-00"
                                : "00.000.000/0000-00"
                        }
                        value={formData.documentNumber}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                documentNumber: e.target.value,
                            })
                        }
                        required
                    />
                </div>

                <div className="grid grid-cols-[140px_1fr] gap-3">
                    <Select label="Código do país">
                        <option>Brasil (+55)</option>
                        <option>EUA (+1)</option>
                        <option>Portugal (+351)</option>
                    </Select>
                    <Input
                        type="tel"
                        label="Celular com DDD"
                        placeholder="(00) 0 0000-0000"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phoneNumber: e.target.value,
                            })
                        }
                        required
                    />
                </div>
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
            >
                Continuar para endereço
            </Button>
        </form>
    );
}

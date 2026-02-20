import { useState } from "react";
import { Input, Button } from "@repo/ui";

export type AddressData = {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
};

interface AddressFormProps {
    onContinue: (data: AddressData) => void;
    initialData?: AddressData;
}

export function AddressForm({ onContinue, initialData }: AddressFormProps) {
    const [formData, setFormData] = useState<AddressData>(
        initialData || {
            street: "Rua das Flores",
            number: "123",
            neighborhood: "Centro",
            city: "São Paulo",
            state: "SP",
            country: "BR",
            zipCode: "01234-567",
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onContinue(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            <h2 className="text-xl font-semibold text-foreground">
                Endereço de entrega
            </h2>

            <div className="space-y-4">
                <Input
                    type="text"
                    label="CEP"
                    placeholder="00000-000"
                    value={formData.zipCode}
                    onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                    }
                    required
                />

                <Input
                    type="text"
                    label="Rua"
                    placeholder="Rua das Flores"
                    value={formData.street}
                    onChange={(e) =>
                        setFormData({ ...formData, street: e.target.value })
                    }
                    required
                />

                <div className="grid grid-cols-[1fr_120px] gap-3">
                    <Input
                        type="text"
                        label="Bairro"
                        placeholder="Centro"
                        value={formData.neighborhood}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                neighborhood: e.target.value,
                            })
                        }
                        required
                    />
                    <Input
                        type="text"
                        label="Número"
                        placeholder="123"
                        value={formData.number}
                        onChange={(e) =>
                            setFormData({ ...formData, number: e.target.value })
                        }
                        required
                    />
                </div>

                <div className="grid grid-cols-[1fr_100px] gap-3">
                    <Input
                        type="text"
                        label="Cidade"
                        placeholder="São Paulo"
                        value={formData.city}
                        onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                        }
                        required
                    />
                    <Input
                        type="text"
                        label="UF"
                        placeholder="SP"
                        value={formData.state}
                        onChange={(e) =>
                            setFormData({ ...formData, state: e.target.value })
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
                Continuar para pagamento
            </Button>
        </form>
    );
}

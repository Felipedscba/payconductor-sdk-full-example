import axios from "axios";

export const api = axios.create({
    baseURL: '/api',
});

export type TApiCartResponse = {
    products: Array<{
        id: string;
        name: string;
        description: string;
        price: number;
        qty: number;
    }>;
    shippingFee: number;
};

export type TApiCreateOrderRequest = {
    items: Array<{
        id: string;
        qty: number;
    }>;
    customer: {
        name: string;
        email: string;
        documentType: string;
        documentNumber: string;
        phoneNumber: string;
        address: {
            street: string;
            number: string;
            neighborhood: string;
            city: string;
            state: string;
            country: string;
            zipCode: string;
        };
    };
};

export type TApiCreateOrderResponse = {
    id: string;
    externalId: string;
    chargeAmount: number;
    // adicione outros campos conforme necessário
};

export async function getCart(): Promise<TApiCartResponse> {
    const { data } = await api.get<TApiCartResponse>("/cart");
    return data;
}

export async function createOrder(
    request: TApiCreateOrderRequest
): Promise<TApiCreateOrderResponse> {
    const { data } = await api.post<TApiCreateOrderResponse>(
        "/order/create",
        request
    );
    return data;
}
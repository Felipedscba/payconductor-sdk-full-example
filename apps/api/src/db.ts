type DB = {
    shippingFee: 200,
    products: {
        id: string;
        name: string;
        description: string;
        price: number;
    }[];
};
export const db: DB = {
    shippingFee: 200,
    products: [
        {
            id: "product-1",
            name: "Curso de VibeCodagem 2.0",
            description: "",
            price: 35,
        },
    ],
};

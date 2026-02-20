type DB = {
    shippingFee: 200,
    products: {
        id: string;
        name: string;
        photo: string;
        description: string;
        price: number;
    }[];
};
export const db: DB = {
    shippingFee: 200,
    products: [
        {
            id: "product-1",
            name: "Apple iPhone 14 128GB 5G",
            photo: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTRImPb3yFuP8bzSwRUapd5a-Ep2-IbQCQYsGAaBGXtjKJcyTPy3pKz4MU1vO6ER7neQ9aWQTihIJ9K3eCETyhwoCJ-aH2s1g",
            description: "",
            price: 2508.26,
        },
    ],
};

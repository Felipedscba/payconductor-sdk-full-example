import express from "express";
import cors from "cors";
import { payconductorApi } from "./api";
import { db } from "./db";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/cart", (req, res) => {
    res.json({
        products: db.products.map((product) => {
            return {
                ...product,
                qty: 1,
            };
        }),
        shippingFee: db.shippingFee,
    });
});

app.post("/order/create", async (req, res) => {
    const randomId = Math.random().toString(36).substring(2, 15);
    const items = (req.body.items as any[]).map(
        (item: { id: string; qty: number }) => {
            const product = db.products.find((p) => p.id === item.id);
            if (!product) {
                throw new Error(`Product with id ${item.id} not found`);
            }
            return {
                id: product.id,
                qty: item.qty,
                isPhysical: true,
                name: product.name,
                unitPrice: product.price,
            };
        },
    );

    const productsAmount = items.reduce(
        (total, item) => total + item.unitPrice * item.qty,
        0,
    );

    const shippingFee = db.shippingFee;

    const content = {
        externalId: "sdk_" + randomId,
        chargeAmount: productsAmount + shippingFee,
        discountAmount: 0,
        shippingFee,
        taxFee: 0,
        clientIp: req.ip,
        customer: {
            name: req.body.customer.name,
            email: req.body.customer.email,
            documentType: req.body.customer.documentType,
            documentNumber: req.body.customer.documentNumber,
            phoneNumber: req.body.customer.phoneNumber,
            address: {
                street: req.body.customer.address.street,
                number: req.body.customer.address.number,
                neighborhood: req.body.customer.address.neighborhood,
                city: req.body.customer.address.city,
                state: req.body.customer.address.state,
                country: req.body.customer.address.country,
                zipCode: req.body.customer.address.zipCode,
            },
        },
        payment: {
            paymentMethod: "Draft",
            expirationInSeconds: 1,
            availablePaymentMethods: ["Pix", "CreditCard"],
        },
        items,
    };
    const { data } = await payconductorApi.post("/orders", content, {});
    console.log("Response: ", data);
    res.json(data);
});

app.listen(3000, () => {
    console.log("✅ API running on 3000");
});

import axios from "axios";
import { env } from "./env";

export const payconductorApi = axios.create({
    baseURL: "https://app.payconductor.ai/api/v1",
    auth: {
        username: env.PAYCONDUCTOR_PUBLIC_KEY,
        password: env.PAYCONDUCTOR_SECRET_KEY,
    },
});

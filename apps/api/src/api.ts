import axios from "axios";
import { env } from "./env";

const isLocal = env.NODE_ENV === "local";

const productionUrl = "https://app.payconductor.ai/api/v1";
const localUrl = "http://localhost:3000/api/v1";

export const payconductorApi = axios.create({
    baseURL: isLocal ? localUrl : productionUrl,
    auth: {
        username: env.PAYCONDUCTOR_PUBLIC_KEY,
        password: env.PAYCONDUCTOR_SECRET_KEY,
    },
});

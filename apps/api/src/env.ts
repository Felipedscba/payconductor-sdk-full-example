export const env = {
    PAYCONDUCTOR_PUBLIC_KEY: process.env.PAYCONDUCTOR_PUBLIC_KEY || "",
    PAYCONDUCTOR_SECRET_KEY: process.env.PAYCONDUCTOR_SECRET_KEY || "",
    NODE_ENV: process.env.NODE_ENV || "production" as 'local' | 'production',
}
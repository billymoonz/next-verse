/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GITHUB_ID: process.env.GITHUB_ID,
        
        GITHUB_SECRET: process.env.GITHUB_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

        STRIPE_API_KEY: process.env.STRIPE_API_KEY,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
        STRIPE_MONTHLY_PLAN_ID: process.env.STRIPE_MONTHLY_PLAN_ID
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig

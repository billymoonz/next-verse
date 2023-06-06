import { getServerSession } from "next-auth/next"
import { authOptions } from "@/libs/auth"
import { stripe } from "@/libs/stripe"
import { getUserSubscription } from "@/libs/subscription"

const billingUrl = process.env.NEXTAUTH_URL + "/course/billing"

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user || !session?.user.email) {
            return new Response(null, { status: 403 })
        }
        const subscriptionPlan = await getUserSubscription(session.user.id)
        if (subscriptionPlan.isSubscribed && subscriptionPlan.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: subscriptionPlan.stripeCustomerId,
                return_url: billingUrl,
            })
            return new Response(JSON.stringify({ url: stripeSession.url }))
        }
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: billingUrl,
            cancel_url: billingUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: session.user.email,
            line_items: [
                {
                    price: process.env.STRIPE_MONTHLY_PLAN_ID,
                    quantity: 1,
                },
            ],
            metadata: {
                userId: session.user.id,
            },
        })
        return new Response(JSON.stringify({ url: stripeSession.url }))
    } catch (error) {
        return new Response(null, { status: 500 })
    }
}
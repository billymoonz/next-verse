import { database } from "@/libs/db"
import { stripe } from "@/libs/stripe";

const db = database();

export const getUserSubscription = async (userId) => {
    const user = await db.user.findFirst({
        where: {
            id: userId,
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        },
    })

    if (!user) {
        throw new Error("User not found")
    }

    const isSubscribed =
        user.stripePriceId &&
        user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

    return {
        ...user,
        stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
        isSubscribed,
    }
}

export async function getBillingData(userId) {
    const user = await db.user.findFirst({
        where: {
            id: userId,
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        },
    })

    if (!user) {
        throw new Error("User not found")
    }

    const isSubscribed =
        user.stripePriceId &&
        user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

    let invoices = [];

    if (user.stripeSubscriptionId !== null) {
        invoices = await stripe.invoices.list({
            subscription: user.stripeSubscriptionId,
            expand: ['data.charge']
        });
        invoices = invoices.data
        invoices = invoices.map((inv) => {
            return {
                id: inv.number,
                amount: inv.amount_due,
                method: inv.charge.payment_method_details.type,
                state: inv.charge.status
            }
        })
    }

    return {
        ...user,
        stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
        invoices,
        isSubscribed,
    }
}
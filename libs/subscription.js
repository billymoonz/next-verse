import { database } from "@/libs/db"

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
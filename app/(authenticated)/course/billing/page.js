import { BillingForm } from "@/components/billing-form"

import { redirect } from "next/dist/server/api-utils"

import { stripe } from "@/libs/stripe"
import { getCurrentUser } from "@/libs/session"
import { getBillingData } from "@/libs/subscription"

export const metadata = {
    title: 'Billing'
}

export default async function Billing() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    const subscriptionPlan = await getBillingData(user.id)

    let isCanceled = false
    if (subscriptionPlan.isSubscribed && subscriptionPlan.stripeSubscriptionId) {
        const stripePlan = await stripe.subscriptions.retrieve(
            subscriptionPlan.stripeSubscriptionId
        )
        isCanceled = stripePlan.cancel_at_period_end
    }

    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Billing</h1>
        <p className="text-lg text-muted-foreground">Manage billing and your subscription.</p>
        <BillingForm
            subscriptionPlan={{
                ...subscriptionPlan,
                isCanceled,
            }}
        />
    </div>)
}
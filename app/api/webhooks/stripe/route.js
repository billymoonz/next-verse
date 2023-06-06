import { headers } from "next/headers"
import { database } from "@/libs/db"
import { stripe } from "@/libs/stripe"
import { buffer } from 'micro'

export async function GET(req) {
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = headers().get("stripe-signature")
  let bufferedReq = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      bufferedReq,
      signature,
      signingSecret
    )
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const db = database();
  const session = event.data.object

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    )

    await db.user.update({
      where: {
        id: session?.metadata?.userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    )

    await db.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  return new Response(null, { status: 200 })
}
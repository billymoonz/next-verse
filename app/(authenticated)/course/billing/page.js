import { BillingForm } from "@/components/billing-form"

export const metadata = {
    title: 'Billing'
}

export default async function Billing() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Billing</h1>
        <p className="text-lg text-muted-foreground">Manage billing and your subscription.</p>
        <BillingForm/>
    </div>)
}
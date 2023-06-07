import { BillingSkeleton } from "@/components/billing-form"

export default function BillingLoading() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Billing</h1>
        <p className="text-lg text-muted-foreground">Manage billing and your subscription.</p>
        <BillingSkeleton/>
    </div>)
}
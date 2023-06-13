import { SubscriptionSkeleton } from '@/components/admin-subscriptions'

export default function SubsLoading() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Subscriptions</h1>
        <p className="text-lg text-muted-foreground">View exportable table of subscriptions.</p>
        <SubscriptionSkeleton/>
    </div>)
}
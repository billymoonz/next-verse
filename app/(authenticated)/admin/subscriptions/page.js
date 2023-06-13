import { getSubscriptions } from '@/libs/admin-actions'

import { Subscriptions } from '@/components/admin-subscriptions'

import { redirect } from 'next/navigation';

export const metadata = {
    title: {
        absolute: 'Admin | Subscriptions'
    }
}
export default async function AdminSubscriptions() {
    const data = await getSubscriptions();

    if (!data) {
        redirect('/admin');
    }

    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Subscriptions</h1>
        <p className="text-lg text-muted-foreground">View exportable table of subscriptions.</p>
        <Subscriptions data={data} />
    </div>)
}
export const metadata = {
    title: {
        absolute: 'Admin | Subscriptions'
    }
}
export default async function AdminSubscriptions() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Subscriptions</h1>
        <p className="text-lg text-muted-foreground">View a log of subscription events and more.</p>
    </div>)
}
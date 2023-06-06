export const metadata = {
    title: {
        absolute: 'Admin | Dashboard'
    }
}

export default async function AdminDashboard() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Dashboard</h1>
        <p className="text-lg text-muted-foreground">View course analytics from admin dashboard.</p>
    </div>)
}
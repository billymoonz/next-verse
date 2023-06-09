export const metadata = {
    title: {
        absolute: 'Admin | Dashboard'
    }
}

export default async function AdminDashboard() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Dashboard</h1>
        <p className="text-lg text-muted-foreground">View course analytics from admin dashboard.</p>
        <ul>
            <li>Exportable Analytics</li>
            <li>Favorite Lesson Stats</li>
            <li>Lesson View Stats</li>
            <li>Lesson Quiz Stats</li>
            <li>Subscription Stats</li>
        </ul>
    </div>)
}
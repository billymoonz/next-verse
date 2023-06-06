export const metadata = {
    title: 'Dashboard'
}

export default async function Dashboard() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Dashboard</h1>
        <p className="text-lg text-muted-foreground">View course chapters, lessons & progress.</p>
    </div>)
}
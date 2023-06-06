export const metadata = {
    title: {
        absolute: 'Admin | Chapters'
    }
}
export default async function AdminChapters() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Chapters</h1>
        <p className="text-lg text-muted-foreground">View & manage course chapters.</p>
    </div>)
}
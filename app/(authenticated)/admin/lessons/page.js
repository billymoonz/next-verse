export const metadata = {
    title: {
        absolute: 'Admin | Lessons'
    }
}
export default async function AdminLessons() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Lessons</h1>
        <p className="text-lg text-muted-foreground">View & manage course lessons.</p>
    </div>)
}
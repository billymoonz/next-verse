import { Chapters } from "@/components/admin-chapters";

import { getChapters } from "@/libs/admin-actions";

export const metadata = {
    title: {
        absolute: 'Admin | Chapters'
    }
}

export default async function AdminChapters() {
    const chapters = await getChapters();

    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Chapters</h1>
        <p className="text-lg text-muted-foreground">View & manage course chapters.</p>
        <Chapters chapters={chapters} />
    </div>)
}
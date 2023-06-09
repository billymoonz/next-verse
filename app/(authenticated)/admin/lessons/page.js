import { Lessons } from "@/components/admin-lessons"

import { getLessons } from "@/libs/admin-actions"
import { redirect } from "next/navigation";

export const metadata = {
    title: {
        absolute: 'Admin | Lessons'
    }
}
export default async function AdminLessons() {
    const data = await getLessons();

    if(!data) {
        redirect('/admin')
    }

    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Lessons</h1>
        <p className="text-lg text-muted-foreground">View & manage course lessons.</p>
        <Lessons lessons={data.lessons} chapters={data.chapters} />
    </div>)
}
import { Chapters } from "@/components/chapter-list"
import { getDashboardData } from "@/libs/course-actions"

import { redirect } from "next/navigation";

export const metadata = {
    title: 'Dashboard'
}

export default async function Dashboard() {
    let data = await getDashboardData();

    if (!data) {
        redirect('/login');
    }

    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Dashboard</h1>
        <p className="text-lg text-muted-foreground">View course chapters, lessons & progress.</p>
        <Chapters chapters={data.chapters} />
    </div>)
}
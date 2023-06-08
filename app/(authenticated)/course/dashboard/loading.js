import { ChapterSkeleton } from "@/components/chapter-list";

export default function DashboardLoading() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Dashboard</h1>
        <p className="text-lg text-muted-foreground">View course chapters, lessons & progress.</p>
        <ChapterSkeleton />
    </div>)
}
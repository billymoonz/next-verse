import { ChapterSkeleton } from "@/components/chapter-list";

export default function DashboardLoading() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Chapters</h1>
        <p className="text-lg text-muted-foreground">Showcases course chapters & your progress.</p>
        <ChapterSkeleton />
    </div>)
}
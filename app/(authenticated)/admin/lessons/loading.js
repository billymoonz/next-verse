import { LessonsSkeleton } from "@/components/admin-lessons";

export default function LessonsLoading() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Lessons</h1>
        <p className="text-lg text-muted-foreground">View & manage course lessons.</p>
        <LessonsSkeleton />
    </div>)
}
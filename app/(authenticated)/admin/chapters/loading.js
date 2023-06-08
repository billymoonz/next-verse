import { ChapterSkeleton } from "@/components/admin-chapters";

export default function AdminChapterSkeleton(){
    return(<div>
        <h1 className="font-bold text-3xl md:text-4xl">Chapters</h1>
        <p className="text-lg text-muted-foreground">View & manage course chapters.</p>
        <ChapterSkeleton/>
    </div>)
}
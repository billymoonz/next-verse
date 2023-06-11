import { QuestionsSkeleton } from "@/components/admin-lesson-questions";

export default function LessonQuestionsLoading() {
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Lesson Questions</h1>
        <p className="text-lg text-muted-foreground">View & manage lesson quiz questions.</p>
        <QuestionsSkeleton />
    </div>)
}
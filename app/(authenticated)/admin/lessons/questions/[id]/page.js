import { Questions } from "@/components/admin-lesson-questions";
import { getLessonQuestions } from "@/libs/admin-actions";
import { redirect } from "next/navigation";

export const metadata = {
    title: {
        absolute: 'Admin | Lesson Questions'
    }
}

export default async function LessonQuestions(props) {
    let id = props.params.id;

    let data = await getLessonQuestions(id);

    if (!data) {
        redirect('/admin/lessons');
    }

    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Lesson Questions</h1>
        <p className="text-lg text-muted-foreground">View & manage lesson quiz questions.</p>
        <Questions data={data}/>
    </div>)
}
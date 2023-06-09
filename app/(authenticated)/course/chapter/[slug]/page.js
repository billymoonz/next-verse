import { redirect } from "next/navigation";

import { getChapterData } from "@/libs/course-actions";
import { Chapter, ChapterSkeleton } from '@/components/chapter';

export async function generateMetadata({ params }) {
    let slug = params.slug;
    const data = await getChapterData(slug);
    if (data) {
        return {
            title: data.name
        }
    } else {
        return null
    }
}


export default async function ChapterPage(props) {
    const slug = props.params.slug;
    const data = await getChapterData(slug);

    if (!data) {
        redirect('/course/dashboard');
    }

    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">{data.name}</h1>
        <p className="text-lg text-muted-foreground">{data.description}</p>
        <Chapter chapter={data}/>
    </div>)
}
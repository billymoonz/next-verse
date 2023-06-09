import { redirect } from "next/navigation";

import { getLessonData } from "@/libs/course-actions";

import { Chapter } from "@/components/lesson";
import { VideoPlayer } from "@/components/video-player";

export async function generateMetadata({ params }) {
    const { slug, lesson } = params;
    let data = await getLessonData(slug, lesson);

    if (!data) return null;
    return {
        title: data.lesson.name
    }
}

export default async function LessonPage(props) {
    const { slug, lesson } = props.params;
    let data = await getLessonData(slug, lesson);

    if (!data) {
        redirect('/course/dashboard');
    }

    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">{data.lesson.name}</h1>
        <p className="text-lg text-muted-foreground">{data.lesson.description}</p>
        <VideoPlayer url={data.lesson.url} thumbnail={data.lesson.thumbnail} />
        <Chapter data={data} />
    </div>)
}
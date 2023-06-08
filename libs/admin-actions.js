'use server'

import { database } from "@/libs/db";

const db = database();

export async function getChapters() {
    return await db.chapter.findMany({});
}

export async function getLessons() {
    let lessons = await db.lesson.findMany({ select: { name: true, slug: true, description: true, id: true, chapterId: true, chapter: { select: { slug: true }} } });
    let chapters = await db.chapter.findMany({});
    return {
        lessons,
        chapters
    }
}
'use server'

import { database } from "@/libs/db";

const db = database();

export async function getChapters() {
    return await db.chapter.findMany({});
}

export async function getLessons() {
    let lessons = await db.lesson.findMany({ select: { id: true, name: true, slug: true, description: true, id: true, chapterId: true, chapter: { select: { slug: true } } } });
    let chapters = await db.chapter.findMany({});
    return {
        lessons,
        chapters
    }
}

export async function getLessonQuestions(id) {
    let lesson = await db.lesson.findUnique({ where: { id }, select: { name: true, description: true, questions: { select: { id: true, question: true, answers: { select: { id: true, answer: true, correct: true } } } } } })
    if (!lesson) return null;
    return lesson;
}
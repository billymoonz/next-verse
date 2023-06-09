'use server';

import { database } from "@/libs/db";
import { getCurrentUser } from "@/libs/session";
import { getUserSubscription } from "@/libs/subscription";

const db = database();

export async function getDashboardData() {
    let user = await getCurrentUser();
    if (!user) return null;
    let chapters = await db.chapter.findMany({ select: { name: true, slug: true, description: true, updatedAt: true, lessons: { select: { name: true, slug: true, description: true, thumbnail: true, updatedAt: true } } } });
    return {
        chapters,
        user
    }
}

export async function getChapterData(slug) {
    let user = await getCurrentUser();
    if (!user) return null;
    return await db.chapter.findUnique({ where: { slug }, select: { name: true, slug: true, description: true, updatedAt: true, lessons: { select: { id: true, name: true, slug: true, description: true, thumbnail: true, updatedAt: true } } } })
}

export async function getLessonData(slug, lessonSlug) {
    let user = await getCurrentUser();
    if (!user) return null;
    let chapter = await getChapterData(slug)
    if (!chapter) return null;
    if (chapter.lessons.filter((les) => les.slug == lessonSlug).length === 0) return null;
    let lesson = chapter.lessons.find((les) => les.slug === lessonSlug);
    return {
        chapter,
        lesson
    }
}
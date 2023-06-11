'use server';

import { database } from "@/libs/db";
import { getCurrentUser } from "@/libs/session";
import { getUserSubscription } from "@/libs/subscription";

const db = database();

export async function getDashboardData() {
    let user = await getCurrentUser();
    if (!user) return null;
    let chapters = await db.chapter.findMany({ select: { name: true, slug: true, description: true, updatedAt: true, lessons: { select: { name: true } } } });
    return {
        chapters,
        user
    }
}

export async function getChapterData(slug) {
    let user = await getCurrentUser();
    if (!user) return null;
    let chapter = await db.chapter.findUnique({ where: { slug }, select: { name: true, slug: true, description: true, updatedAt: true, lessons: { select: { favorited: { select: { userId: true } }, questions: true, entries: { include: { responses: true } }, id: true, name: true, slug: true, description: true, thumbnail: true, updatedAt: true } } } })
    chapter.lessons.forEach((lesson) => {
        lesson.favorited = lesson.favorited.filter((fav) => fav.userId === user.id).length === 1;
        let questions = lesson.questions;
        let entries = lesson.entries;
        lesson.questions = questions.length >= 1;
        let entryId = null;
        let entered = entries.filter((ent) => ent.userId === user.id).length === 1;
        let successRate = 0;
        let complete = false;
        if (entered) {
            let entry = entries.find((ent) => ent.userId === user.id);
            entryId = entry.id;
            successRate = entry.responses ? (entry.responses.filter((r) => r.correct).length / questions.length * 100) : 0;
            complete = entry.responses !== undefined ? entry.responses.length === questions.length : false;
        }
        lesson.entry = {
            entryId,
            entered,
            successRate,
            complete
        }
        lesson.entries = null;
    })
    return chapter;
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

export async function getUserFavorites() {
    let user = await getCurrentUser();
    if (!user) return null;
    let data = await db.user.findUnique({ where: { id: user.id }, select: { favoriteLessons: { select: { lesson: { select: { chapter: { select: { slug: true } }, name: true, slug: true, description: true, thumbnail: true, updatedAt: true } } } } } })
    if (!data) return null;
    return data.favoriteLessons.map((favorite) => favorite.lesson);
}
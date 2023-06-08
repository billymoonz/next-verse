'use server';

import { database } from "@/libs/db";
import { getCurrentUser } from "@/libs/session";

const db = database();

export async function getDashboardData() {
    let user = await getCurrentUser();
    if(!user) return null;
    let chapters = await db.chapter.findMany({ select: { name: true, slug: true, description: true, updatedAt: true, lessons: { select: { name: true, slug: true, description: true, thumbnail: true, updatedAt: true } } } });
    return {
        chapters,
        user
    }
}
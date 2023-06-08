import { database } from "@/libs/db";
import { getCurrentUser } from "@/libs/session";
import { userAgent } from "next/server";

const db = database();

export async function DELETE(req) {
    let auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });
    if (!auth.admin) return new Response(null, { status: 403 });

    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);

    if (params.has('id')) {
        let deleted = await db.chapter.delete({ where: { id: params.get('id') } });
        if (deleted) {
            return new Response(null, { status: 200 });
        } else {
            return new Response(null, { status: 500 });
        }
    } else {
        return new Response(null, { status: 400 });
    }
}

export async function POST(req) {
    let auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });
    if (!auth.admin) return new Response(null, { status: 403 });

    let body = await req.json();
    if (is(body, 'name') && is(body, 'description') && is(body, 'slug') && is(body, 'chapter') && is(body, 'thumbnail') && is(body, 'video')) {
        let { name, slug, description, chapter, thumbnail, video } = body;
        if (name.trim().length === 0 || slug.trim().length === 0 || description.trim().length === 0 || chapter.trim().length === 0 || thumbnail.trim().length === 0 || video.trim().length === 0) return new Response(null, { status: 400, statusText: 'Missing important fields!' });
        let data = await db.lesson.findUnique({ where: { slug } });
        if (data) {
            return new Response(null, { status: 400, statusText: 'Slug is already in use!' })
        } else {
            try {
                let lesson = await db.lesson.create({
                    data: {
                        name,
                        slug,
                        description,
                        chapterId: chapter,
                        authorId: auth.id,
                        thumbnail,
                        video
                    }
                });
                if (lesson) {
                    return new Response(null, { status: 200 });
                } else {
                    return new Response(null, { status: 500 });
                }
            } catch (e) {
                console.log(e);
                return new Response(null, { status: 500 });
            }
        }
    } else {
        return new Response(null, { status: 400 });
    }
}

export async function PATCH(req) {
    let auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });
    if (!auth.admin) return new Response(null, { status: 403 });

    let body = await req.json();
    if (is(body, 'id') && is(body, 'name') && is(body, 'description') && is(body, 'slug') && is(body, 'chapter') && is(body, 'thumbnail') && is(body, 'video')) {
        let { id, name, slug, description, chapter, thumbnail, video } = body;
        if (name.trim().length === 0 || slug.trim().length === 0 || description.trim().length === 0 || chapter.trim().length === 0) return new Response(null, { status: 400, statusText: 'Missing important fields!' });
        let exists = await db.lesson.findUnique({ where: { id } });
        if (exists) {
            try {
                let update = await db.lesson.update({
                    where: { id },
                    data: {
                        name,
                        slug,
                        description,
                        chapterId: chapter,
                        thumbnail: thumbnail.trim().length === 0 ? exists.thumbnail : thumbnail,
                        video: video.trim().length === 0 ? exists.video : video,
                        updatedAt: new Date()
                    }
                });
                if (update) {
                    return new Response(null, { status: 200 });
                } else {
                    return new Response(null, { status: 500 });
                }
            } catch (e) {
                console.log(e);
                return new Response(null, { status: 500 });
            }
        } else {
            return new Response(null, { status: 400 })
        }
    } else {
        return new Response(null, { status: 400 });
    }
}

const is = (body, data) => {
    return body.hasOwnProperty(data)
}

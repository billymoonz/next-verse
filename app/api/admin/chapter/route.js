import { database } from "@/libs/db";
import { getCurrentUser } from "@/libs/session";

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

export async function PATCH(req) {
    let auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });
    if (!auth.admin) return new Response(null, { status: 403 });

    let body = await req.json();
    if (is(body, 'id') && is(body, 'name') && is(body, 'slug') && is(body, 'description')) {
        let { id, name, slug, description } = body;
        if (name.trim().length === 0 || slug.trim().length === 0 || description.trim().length === 0) return new Response(null, { status: 400, statusText: 'Missing important fields!' });
        let data = await db.chapter.findUnique({
            where: { id }
        });
        if (data) {
            let update = await db.chapter.update({
                where: { id },
                data: {
                    name,
                    description,
                    slug,
                    updatedAt: new Date()
                }
            });
            if (update) {
                return new Response(null, { status: 200 });
            } else {
                return new Response(null, { status: 500 });
            }
        } else {
            return new Response(null, { status: 403 })
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
    if (is(body, 'name') && is(body, 'slug') && is(body, 'description')) {
        let { name, slug, description } = body;
        if (name.trim().length === 0 || slug.trim().length === 0 || description.trim().length === 0) return new Response(null, { status: 400, statusText: 'Missing important fields!' });
        let data = await db.chapter.findUnique({
            where: { slug }
        });
        if (data) {
            return new Response(null, { status: 403, statusText: 'Slug is already in use!' })
        } else {
            let chapter = await db.chapter.create({ data: { name, slug, description } });
            if (chapter) {
                return new Response(null, { status: 200 });
            } else {
                return new Response(null, { status: 500 })
            }
        }
    } else {
        return new Response(null, { status: 400 });
    }
}

const is = (body, data) => {
    return body.hasOwnProperty(data)
}

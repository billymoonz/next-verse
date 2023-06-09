import { database } from "@/libs/db";

import { getCurrentUser } from "@/libs/session";

const db = database();

export async function POST(req) {
    let auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });

    let body = await req.json();
    if (is(body, 'id')) {
        let id = body.id;

        let lesson = await db.lesson.findUnique({ where: { id }, select: { favorited: { select: { userId: true } } } });

        if (!lesson) return new Response(null, { status: 500 });

        if (lesson.favorited.filter((obj) => obj.userId === auth.id).length === 1) {
            await db.lessonFavorite.delete({
                where: {
                    userId_lessonId: {
                        userId: auth.id,
                        lessonId: id
                    }
                }
            })
        } else {
            await db.lessonFavorite.create({
                data: {
                    userId: auth.id,
                    lessonId: id
                }
            })
        }
        return new Response(null, { status: 200 });
    } else {
        return new Response(null, { status: 400 });
    }
}

const is = (body, data) => body.hasOwnProperty(data);
import { getCurrentUser } from "@/libs/session";
import { getUserSubscription } from "@/libs/subscription";
import { database } from "@/libs/db";

const db = database();

export async function GET(req, context) {
    const auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });
    
    if(!auth.admin) {
        const subscription = await getUserSubscription(auth.id)
        if (!subscription.isSubscribed) return new Response(null, { status: 403 })
    }

    const { params } = context;

    if (params.hasOwnProperty('id')) {
        let id = params.id;
        let lesson = await db.lesson.findUnique({ where: { id }, select: { video: true } });

        if (!lesson) return new Response(null, { status: 500 });

        const videoResponse = await fetch(lesson.video);
        const videoBlob = await videoResponse.blob();

        return new Response(videoBlob, {
            headers: {
                'Content-Type': 'video/mp4',
                'Content-Disposition': 'inline'
            }
        });
    } else {
        return new Response(null, { status: 400 });
    }
}
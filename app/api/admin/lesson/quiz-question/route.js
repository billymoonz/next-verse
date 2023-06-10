import { database } from "@/libs/db";

import { getCurrentUser } from "@/libs/session";

export async function POST(req) {
    let auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });
    if (!auth.admin) return new Response(null, { status: 403 });

    let body = await req.json();
    if (is(body, '')) {

    } else {
        return new Response(null, { status: 400 });
    }
}

const is = (body, data) => body.hasOwnProperty(data);
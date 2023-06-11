import { database } from "@/libs/db";

import { getCurrentUser } from "@/libs/session";

const db = database();

export async function DELETE(req) {
    let auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });
    if (!auth.admin) return new Response(null, { status: 403 });

    let url = new URL(req.url);
    let params = new URLSearchParams(url.search);
    if (params.has("id")) {
        let id = params.get("id");
        let data = await db.lessonQuestion.delete({
            where: { id }
        });
        if (!data) return new Response(null, { status: 500 });
        return new Response(null, { status: 200 })
    } else {
        return new Response(null, { status: 400 })
    }
}

export async function POST(req) {
    let auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });
    if (!auth.admin) return new Response(null, { status: 403 });

    let body = await req.json();
    if (is(body, 'id') && is(body, 'question') && is(body, 'a1') && is(body, 'a2') && is(body, 'a3') && is(body, 'a4')) {
        let { id, question, a1, a2, a3, a4 } = body;
        if (question.trim().length === 0 || (!a1?.answer || a1.answer.trim().length === 0) || (!a2?.answer || a2.answer.trim().length === 0) || (!a3?.answer || a3.answer.trim().length === 0) || (!a4?.answer || a4.answer.trim().length === 0)) return new Response(null, { status: 400, statusText: 'Missing important fields!' });
        let lesson = await db.lesson.findUnique({ where: { id } });
        if (!lesson) return new Response(null, { status: 500 });
        let data = await db.lessonQuestion.create({
            data: {
                question,
                lessonId: lesson.id,
                answers: {
                    create: [
                        { answer: a1.answer, correct: a1.correct },
                        { answer: a2.answer, correct: a2.correct },
                        { answer: a3.answer, correct: a3.correct },
                        { answer: a4.answer, correct: a4.correct }
                    ]
                }
            }
        });
        if (!data) return new Response(null, { status: 500 });
        return new Response(null, { status: 200 });
    } else {
        return new Response(null, { status: 400 });
    }
}

export async function PATCH(req) {
    let auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });
    if (!auth.admin) return new Response(null, { status: 403 });

    let body = await req.json();
    if (is(body, 'id') && is(body, 'question') && is(body, 'a1') && is(body, 'a2') && is(body, 'a3') && is(body, 'a4')) {
        let { id, question, a1, a2, a3, a4 } = body;
        if (question.trim().length === 0 || (!a1?.answer || a1.answer.trim().length === 0) || (!a2?.answer || a2.answer.trim().length === 0) || (!a3?.answer || a3.answer.trim().length === 0) || (!a4?.answer || a4.answer.trim().length === 0)) return new Response(null, { status: 400, statusText: 'Missing important fields!' });
        let update = await db.lessonQuestion.update({
            where: { id }, data: { question }
        });
        if (!update) return new Response(null, { status: 500 });
        try {
            await db.questionAnswer.update({ where: { id: a1.id }, data: { answer: a1.answer, correct: a1.correct } })
            await db.questionAnswer.update({ where: { id: a2.id }, data: { answer: a2.answer, correct: a2.correct } })
            await db.questionAnswer.update({ where: { id: a3.id }, data: { answer: a3.answer, correct: a3.correct } })
            await db.questionAnswer.update({ where: { id: a4.id }, data: { answer: a4.answer, correct: a4.correct } })
            return new Response(null, { status: 200 });
        } catch {
            return new Response(null, { status: 500 });
        }
    } else {
        return new Response(null, { status: 400 });
    }
}

// I know this is boilerplate, it is what it is...
const is = (body, data) => body.hasOwnProperty(data); 
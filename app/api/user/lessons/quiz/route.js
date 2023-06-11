import { database } from "@/libs/db";
import { getCurrentUser } from "@/libs/session";
import { getUserSubscription } from "@/libs/subscription";

const db = database();

export async function DELETE(req) {
    const auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });

    if (!auth.admin) {
        const subscription = await getUserSubscription(auth.id)
        if (!subscription.isSubscribed) return new Response(null, { status: 403 })
    }

    let url = new URL(req.url);
    let params = new URLSearchParams(url.search);

    if (params.has('id')) {
        let id = params.get('id');
        let entry = await db.lessonEntry.findUnique({ where: { id } });
        if (!entry) return new Response(null, { status: 500 });
        if (entry.userId !== auth.id) return new Response(null, { status: 403 });
        let deleted = await db.lessonEntry.delete({
            where: {
                id
            }
        });
        if (!deleted) return new Response(null, { status: 500 });
        return new Response(null, { status: 200 });
    } else {
        return new Response(null, { status: 200 });
    }
}

export async function PATCH(req) {
    const auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });

    if (!auth.admin) {
        const subscription = await getUserSubscription(auth.id)
        if (!subscription.isSubscribed) return new Response(null, { status: 403 })
    }

    let body = await req.json();

    if (is(body, 'entryId') && is(body, 'questionId') && is(body, 'answerId')) {
        let { entryId, questionId, answerId } = body;
        let entry = await db.lessonEntry.findUnique({ where: { id: entryId }, include: { responses: true } });
        if (entry.userId !== auth.id) return new Repsonse(null, { status: 403 });
        if (entry.responses?.length >= 1 && entry.responses.filter((res) => res.questionId === questionId).length === 1) return new Response(null, { status: 400 });
        let question = await db.lessonQuestion.findUnique({ where: { id: questionId } });
        if (!question) return new Response(null, { status: 500 })
        if (question.lessonId !== entry.lessonId) return new Response(null, { status: 400 });
        let answer = await db.questionAnswer.findUnique({ where: { id: answerId } });
        if (!answer) return new Response(null, { status: 500 });
        if (answer.questionId !== questionId) return new Response(null, { status: 400 })
        let questionResponse = await db.questionResponse.create({
            data: {
                answerId: answer.id,
                correct: answer.correct,
                questionId: question.id,
                lessonEntryId: entry.id
            }
        })
        if (!questionResponse) return new Response(null, { status: 500 });
        return new Response(null, { status: 200 });
    } else {
        return new Response(null, { status: 400 });
    }
}

export async function GET(req) {
    const auth = await getCurrentUser();

    if (!auth) return new Response(null, { status: 401 });

    if (!auth.admin) {
        const subscription = await getUserSubscription(auth.id)
        if (!subscription.isSubscribed) return new Response(null, { status: 403 })
    }

    let url = new URL(req.url);
    let params = new URLSearchParams(url.search);

    if (params.has("id")) {
        let id = params.get('id');
        let entry = await db.lessonEntry.findFirst({
            where: {
                lessonId: {
                    equals: id
                },
                userId: {
                    equals: auth.id
                }
            },
            include: {
                responses: true
            }
        });
        if (!entry) entry = await db.lessonEntry.create({
            data: {
                lessonId: id,
                userId: auth.id
            },
            include: {
                responses: true
            }
        })
        if (!entry) return new Response(null, { status: 500 });
        let questions = await db.lessonQuestion.findMany({ where: { lessonId: id }, include: { answers: true } });
        if (!questions) return new Response(null, { status: 500 });
        if (entry.responses.length === questions.length) return new Response(null, { status: 204 });
        let result = null;
        questions.forEach((q) => {
            if (result === null && entry.responses.filter((re) => re.questionId === q.id).length === 0) result = q
        })
        if (result === null) return new Response(null, { status: 204 });
        let question = {
            entryId: entry.id,
            questionId: result.id,
            question: result.question,
            answers: result.answers.map((a) => {
                return {
                    answer: a.answer,
                    id: a.id
                }
            })
        }
        return new Response(JSON.stringify(question), { status: 200 });
    } else {
        return new Response(null, { status: 400 });
    }
}

const is = (body, data) => body.hasOwnProperty(data);
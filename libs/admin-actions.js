'use server'

import { stripe } from "@/libs/stripe";
import { database } from "@/libs/db";

const db = database();

export async function getChapters() {
    return await db.chapter.findMany({});
}

export async function getLessons() {
    let lessons = await db.lesson.findMany({ select: { id: true, name: true, slug: true, description: true, id: true, chapterId: true, chapter: { select: { slug: true } } } });
    let chapters = await db.chapter.findMany({});
    return {
        lessons,
        chapters
    }
}

export async function getLessonQuestions(id) {
    let lesson = await db.lesson.findUnique({ where: { id }, select: { id: true, name: true, description: true, questions: { select: { id: true, question: true, responses: true, answers: { select: { id: true, answer: true, correct: true, responses: true } } } } } })
    if (!lesson) return null;
    return lesson;
}

export async function getSubscriptions() {
    let subscriptions = await stripe.subscriptions.list({
        price: process.env.STRIPE_MONTHLY_PLAN_ID,
        expand: ['data.customer', 'data.default_payment_method']
    });
    let data = subscriptions.data;
    data = data.map((obj) => {
        return {
            customer_email: obj.customer.email,
            customer_name: obj.customer.name,
            current_period_end: obj.current_period_end * 1000,
            current_period_start: obj.current_period_start * 1000,
            cancel_at: obj.cancel_at,
            total: obj.plan.amount,
            state: serializeSubState(obj.status)
        }
    })
    return data;
}

const serializeSubState = (value) => {
    let v = '';
    for (let i = 0; i < value.length; i++) {
        let char = value[i];
        if (i === 0) char = char.toUpperCase();
        v = v + char;
    }
    switch (value) {
        case 'active' || 'trialing':
            return {
                value: v,
                class: ''
            }
        case 'canceled' || 'incomplete' || 'incomplete_expired' || 'unpaid' || 'past_due':
            return {
                value: value.replace('_', ' '),
                class: 'bg-destructive hover:bg-destructive text-primary'
            }
        default:
            return {
                value,
                class: 'bg-secondary hover:bg-secondary text-muted-foreground'
            }
    }
}
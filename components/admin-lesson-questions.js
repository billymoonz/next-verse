'use client';

import React from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Icons } from "@/components/icons";

import { toast } from "@/components/ui/use-toast"

export function Questions({ data }) {
    return (<div className="mt-[24px]">
        {data.questions.length >= 1 && <div>
            <div className="flex gap-4 w-full items-center">
                <QuestionBuilder lessonId={data.id} />
                <p className="text-foreground text-sm">{data.name} Quiz</p>
            </div>
            <div className="mt-[24px] grid lg:grid-cols-2 xl:grid-cols-3 gap-4 flow">
                {data.questions.map((question, index) => {
                    return (<Question data={question} key={question.id} index={index} />)
                })}
            </div>
        </div>}
        {data.questions.length === 0 && <EmptyQuestions data={data} />}
    </div>)
}

function Question({ data, index }) {
    return (<div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
        <div>
            <h1 className="font-bold text-lg flex w-full justify-between items-center">#{index + 1} {data.question}</h1>
            <ul>
                {data.answers.map((a, i) => {
                    return (<li key={i} className="flex items-center text-muted-foreground">
                        {a.correct ? <Icons.check className="text-teal-900 mr-2 h-4 w-4" /> : <Icons.close className="text-red-900 mr-2 h-4 w-4" />}{a.answer}
                    </li>)
                })}
            </ul>
        </div>
        <QuestionEditor data={data} />
    </div>)
}

function EmptyQuestions({ data }) {
    return (<div className="h-[250px] w-full flex gap-2 flex-col items-center justify-center border-2 border border-dashed rounded-xl">
        <h1 className="font-bold text-xl">Looks Empty</h1>
        <p className="text-muted-foreground text-sm max-w-[90%] text-center">There is currently no questions available for {data.name}.</p>
        <QuestionBuilder lessonId={data.id} />
    </div>)
}

function QuestionBuilder({ lessonId }) {
    const router = useRouter();

    const [wait, setWait] = React.useState(false);

    const [question, setQuestion] = React.useState('');
    const [a1, setA1] = React.useState({ answer: '', correct: false });
    const [a2, setA2] = React.useState({ answer: '', correct: false });
    const [a3, setA3] = React.useState({ answer: '', correct: false });
    const [a4, setA4] = React.useState({ answer: '', correct: false });

    const onSubmit = async () => {
        if (wait) return;
        setWait(true);
        let response = await fetch('/api/admin/lesson/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: lessonId,
                question,
                a1,
                a2,
                a3,
                a4
            })
        });

        setWait(false);

        if (!response?.ok) {
            if (!response?.statusText) return toast({
                title: "Something went wrong.",
                description: "Please refresh the page and try again.",
                variant: "destructive",
            })
            if (response?.statusText) return toast({
                description: response.statusText,
                variant: "destructive",
            })
        }

        setQuestion('');
        setA1({ answer: '', correct: false });
        setA2({ answer: '', correct: false });
        setA3({ answer: '', correct: false });
        setA4({ answer: '', correct: false });

        toast({
            title: 'Success',
            description: 'Question successfully created!'
        })

        router.refresh();
    }

    return (<Dialog>
        <DialogTrigger asChild>
            <Button disabled={wait} variant="secondary">{wait && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}Create Question</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create Question</DialogTitle>
                <DialogDescription>
                    Fill in the each field to proceed & select checkboxs for correct answers.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                    <Label htmlFor="question" className="text-right">
                        Question
                    </Label>
                    <Input value={question} onChange={(e) => setQuestion(e.target.value)} id="question" placeholder="Question" className="col-span-3" />
                </div>
                <div className="flex items-center gap-4">
                    <Label htmlFor="answer-1" className="text-right whitespace-nowrap">
                        Answer 1
                    </Label>
                    <Input value={a1.answer} onChange={(e) => setA1({ ...a1, answer: e.target.value })} id="answer-1" placeholder='Answer' className="col-span-3" />
                    <Checkbox checked={a1.correct} onCheckedChange={(c) => setA1({ ...a1, correct: c })} className="w-10 h-10" />
                </div>
                <div className="flex items-center gap-4">
                    <Label htmlFor="answer-2" className="text-right whitespace-nowrap">
                        Answer 2
                    </Label>
                    <Input value={a2.answer} onChange={(e) => setA2({ ...a2, answer: e.target.value })} id="answer-2" placeholder='Answer' className="col-span-3" />
                    <Checkbox checked={a2.correct} onCheckedChange={(c) => setA2({ ...a2, correct: c })} className="w-10 h-10" />
                </div>
                <div className="flex items-center gap-4">
                    <Label htmlFor="answer-3" className="text-right whitespace-nowrap">
                        Answer 3
                    </Label>
                    <Input value={a3.answer} onChange={(e) => setA3({ ...a3, answer: e.target.value })} id="answer-3" placeholder='Answer' className="col-span-3" />
                    <Checkbox checked={a3.correct} onCheckedChange={(c) => setA3({ ...a3, correct: c })} className="w-10 h-10" />
                </div>
                <div className="flex items-center gap-4">
                    <Label htmlFor="answer-4" className="text-right whitespace-nowrap">
                        Answer 4
                    </Label>
                    <Input value={a4.answer} onChange={(e) => setA4({ ...a4, answer: e.target.value })} id="answer-4" placeholder='Answer' className="col-span-3" />
                    <Checkbox checked={a4.correct} onCheckedChange={(c) => setA4({ ...a4, correct: c })} className="w-10 h-10" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" disabled={wait} onClick={onSubmit}>{wait && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}Create Question</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>)
}

function QuestionEditor({ data }) {
    const router = useRouter();

    const [wait, setWait] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);

    const [question, setQuestion] = React.useState(data.question);
    const [a1, setA1] = React.useState({ ...data.answers[0] });
    const [a2, setA2] = React.useState({ ...data.answers[1] });
    const [a3, setA3] = React.useState({ ...data.answers[2] });
    const [a4, setA4] = React.useState({ ...data.answers[3] });

    const onSubmit = async () => {
        if (wait || deleting) return;
        setWait(true);
        let response = await fetch('/api/admin/lesson/question', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.id,
                question,
                a1,
                a2,
                a3,
                a4
            })
        });

        setWait(false);

        if (!response?.ok) {
            if (!response?.statusText) return toast({
                title: "Something went wrong.",
                description: "Please refresh the page and try again.",
                variant: "destructive",
            })
            if (response?.statusText) return toast({
                description: response.statusText,
                variant: "destructive",
            })
        }

        toast({
            title: 'Success',
            description: 'Question successfully saved!'
        })

        router.refresh();
    }

    const onDelete = async () => {
        if (wait || deleting) return;
        setDeleting(true);

        let response = await fetch(`/api/admin/lesson/question?id=${data.id}`, {
            method: 'DELETE'
        });

        if (!response.ok) return toast({
            title: "Something went wrong.",
            description: "Please refresh the page and try again.",
            variant: "destructive",
        })

        toast({
            title: 'Success',
            description: 'Question successfully deleted!'
        })

        setDeleting(false);

        router.refresh()
    }

    return (<Dialog>
        <DialogTrigger asChild>
            <Button disabled={wait || deleting} variant="default">{wait && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}Edit Question</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Question</DialogTitle>
                <DialogDescription>
                    Fill in the each field to proceed & select checkboxs for correct answers.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                    <Label htmlFor="question" className="text-right">
                        Question
                    </Label>
                    <Input value={question} onChange={(e) => setQuestion(e.target.value)} id="question" placeholder="Question" className="col-span-3" />
                </div>
                <div className="flex items-center gap-4">
                    <Label htmlFor="answer-1" className="text-right whitespace-nowrap">
                        Answer 1
                    </Label>
                    <Input value={a1.answer} onChange={(e) => setA1({ ...a1, answer: e.target.value })} id="answer-1" placeholder='Answer' className="col-span-3" />
                    <Checkbox checked={a1.correct} onCheckedChange={(c) => setA1({ ...a1, correct: c })} className="w-10 h-10" />
                </div>
                <div className="flex items-center gap-4">
                    <Label htmlFor="answer-2" className="text-right whitespace-nowrap">
                        Answer 2
                    </Label>
                    <Input value={a2.answer} onChange={(e) => setA2({ ...a2, answer: e.target.value })} id="answer-2" placeholder='Answer' className="col-span-3" />
                    <Checkbox checked={a2.correct} onCheckedChange={(c) => setA2({ ...a2, correct: c })} className="w-10 h-10" />
                </div>
                <div className="flex items-center gap-4">
                    <Label htmlFor="answer-3" className="text-right whitespace-nowrap">
                        Answer 3
                    </Label>
                    <Input value={a3.answer} onChange={(e) => setA3({ ...a3, answer: e.target.value })} id="answer-3" placeholder='Answer' className="col-span-3" />
                    <Checkbox checked={a3.correct} onCheckedChange={(c) => setA3({ ...a3, correct: c })} className="w-10 h-10" />
                </div>
                <div className="flex items-center gap-4">
                    <Label htmlFor="answer-4" className="text-right whitespace-nowrap">
                        Answer 4
                    </Label>
                    <Input value={a4.answer} onChange={(e) => setA4({ ...a4, answer: e.target.value })} id="answer-4" placeholder='Answer' className="col-span-3" />
                    <Checkbox checked={a4.correct} onCheckedChange={(c) => setA4({ ...a4, correct: c })} className="w-10 h-10" />
                </div>
            </div>
            <DialogFooter>
                <Button type='submit' disabled={wait || deleting} variant="destructive" onClick={onDelete}>{deleting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}Delete</Button>
                <Button type="submit" onClick={onSubmit} disabled={wait || deleting}>{wait && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>)
}
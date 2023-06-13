'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Icons } from '@/components/icons';
import { toast } from "@/components/ui/use-toast"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { formatDate } from '@/libs/date';

import { Player, BigPlayButton, ControlBar, ReplayControl, ForwardControl, VolumeMenuButton } from 'video-react';

import "node_modules/video-react/dist/video-react.css";

export function LessonSkeleton() {
    return (<div>
        <Skeleton className="h-10 w-[140px]" />
        <Skeleton className="mt-[8px] h-6 w-3/4" />
        <div className="mt-[24px]">
            <Player />
        </div>
        <div className='flex flex-col gap-4 mt-[24px]'>
            <div className='flex gap-4'>
                <Skeleton className="h-8 w-[120px]" />
                <Skeleton className="h-8 w-[120px]" />
            </div>
            <div className="flex flex-col gap-4">
                <div className="border border-1 rounded-lg p-5">
                    <div className="flex gap-4">
                        <Skeleton className="h-20 w-[140px] rounded-sm" />
                        <div style={{ width: 'calc(100% - 148px)' }}>
                            <Skeleton className="h-5 w-1/2 lg:w-1/4" />
                            <Skeleton className="mt-[8px] h-8 w-full" />
                        </div>
                    </div>
                </div>
                <div className="border border-1 rounded-lg p-5">
                    <div className="flex gap-4">
                        <Skeleton className="h-20 w-[140px] rounded-sm" />
                        <div style={{ width: 'calc(100% - 148px)' }}>
                            <Skeleton className="h-5 w-1/2 lg:w-1/4" />
                            <Skeleton className="mt-[8px] h-8 w-full" />
                        </div>
                    </div>
                </div>
                <div className="border border-1 rounded-lg p-5">
                    <div className="flex gap-4">
                        <Skeleton className="h-20 w-[140px] rounded-sm" />
                        <div style={{ width: 'calc(100% - 148px)' }}>
                            <Skeleton className="h-5 w-1/2 lg:w-1/4" />
                            <Skeleton className="mt-[8px] h-8 w-full" />
                        </div>
                    </div>
                </div>
                <div className="border border-1 rounded-lg p-5">
                    <div className="flex gap-4">
                        <Skeleton className="h-20 w-[140px] rounded-sm" />
                        <div style={{ width: 'calc(100% - 148px)' }}>
                            <Skeleton className="h-5 w-1/2 lg:w-1/4" />
                            <Skeleton className="mt-[8px] h-8 w-full" />
                        </div>
                    </div>
                </div>
                <div className="border border-1 rounded-lg p-5">
                    <div className="flex gap-4">
                        <Skeleton className="h-20 w-[140px] rounded-sm" />
                        <div style={{ width: 'calc(100% - 148px)' }}>
                            <Skeleton className="h-5 w-1/2 lg:w-1/4" />
                            <Skeleton className="mt-[8px] h-8 w-full" />
                        </div>
                    </div>
                </div>
                <div className="border border-1 rounded-lg p-5">
                    <div className="flex gap-4">
                        <Skeleton className="h-20 w-[140px] rounded-sm" />
                        <div style={{ width: 'calc(100% - 148px)' }}>
                            <Skeleton className="h-5 w-1/2 lg:w-1/4" />
                            <Skeleton className="mt-[8px] h-8 w-full" />
                            <Skeleton className="mt-[8px] h-4 w-[100px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export function VideoPlayer({ data }) {
    return (<div className="mt-[24px]">
        <Player autoPlay poster={data.lesson.thumbnail} src={`https://nz.billymoonz.org/api/lesson-video/${data.lesson.id}`}>
            <ControlBar autoHide={true}>
                <ReplayControl seconds={30} order={2.1} />
                <ForwardControl seconds={30} order={2.2} />
                <VolumeMenuButton order={3} />
            </ControlBar>
            <BigPlayButton position='center' />
        </Player>
    </div>)
}

export function Chapter({ data }) {
    return (<div className="flex flex-col gap-4 mt-[24px]">
        <div className='flex flex-col sm:items-center sm:flex-row gap-4'>
            <FavoriteButton favorited={data.lesson.favorited} lessonId={data.lesson.id} />
            {data.lesson.questions && <Quiz data={data.lesson} />}
            {data.lesson.questions && data.lesson.entry.entered && data.lesson.entry.complete && <p className='text-muted-foreground text-sm'>Quiz Result • {Math.round(data.lesson.entry.successRate)}%</p>}
        </div>
        {data.chapter.lessons.map((lesson, index) => {
            return (<Lesson
                index={index}
                key={index}
                data={lesson}
                chapter={data.chapter}
            />)
        })}
    </div>)
}

function Quiz({ data }) {
    const router = useRouter();

    const lessonId = data.id;

    const [loaded, setLoaded] = React.useState(false);
    const [question, setQuestion] = React.useState(null);
    const [restarting, setRestarting] = React.useState(false);

    const loadQuestion = async () => {
        let response = await fetch(`/api/user/lessons/quiz?id=${lessonId}`);
        if (response?.status === 204) return toast({
            title: "Quiz Complete",
            description: "You have answered every question!",
        })
        if (!response.ok) return toast({
            title: "Something went wrong.",
            description: "Please refresh the page and try again.",
            variant: "destructive",
        })
        let json = await response.json();
        setQuestion(json);
        setLoaded(true);
    }


    React.useEffect(() => {
        setRestarting(false);
        if (!data.entry.complete && question === null) {
            loadQuestion();
        } else {
            setLoaded(true)
        }
    }, [data.entry.complete]);

    const handleRestart = async () => {
        if (restarting) return;
        setRestarting(true);
        let response = await fetch(`/api/user/lessons/quiz?id=${data.entry.entryId}`, {
            method: 'DELETE'
        });

        if (!response.ok) return toast({
            title: "Something went wrong.",
            description: "Please refresh the page and try again.",
            variant: "destructive",
        })

        setLoaded(false);
        loadQuestion();
        router.refresh();
    }

    const handleAnswer = async (answerId) => {
        setRestarting(false);
        setLoaded(false);
        let response = await fetch('/api/user/lessons/quiz', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                entryId: question.entryId,
                questionId: question.questionId,
                answerId,
            })
        })


        if (!response?.ok) return toast({
            title: "Something went wrong.",
            description: response?.statusText ? response.statusText : "Please refresh the page and try again.",
            variant: "destructive",
        })

        setQuestion(null);
        loadQuestion();

        router.refresh();
    }

    return (<Dialog>
        <DialogTrigger asChild>
            <Button variant='outline' disabled={restarting}>{restarting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}{data.entry.entered ? data.entry.complete ? 'Restart Quiz' : 'Complete Quiz' : 'Complete Quiz'}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            {data.entry.entered && data.entry.complete && <DialogHeader>
                <DialogTitle>Restart Quiz</DialogTitle>
                <DialogDescription>
                    Please confirm if you wish to restart the quiz.
                </DialogDescription>
            </DialogHeader>}
            {!data.entry.complete && <DialogHeader>
                <DialogTitle> Quiz</DialogTitle>
                <DialogDescription>
                    Select an answer to proceed to the next question.
                </DialogDescription>
            </DialogHeader>}
            {!data.entry.complete && <div className="grid gap-4 py-4">
                {(!loaded || question === null) && <div className='flex flex-col gap-4'>
                    <Skeleton className='h-6 w-3/4' />
                    <Skeleton className='h-10 w-full' />
                    <Skeleton className='h-10 w-full' />
                    <Skeleton className='h-10 w-full' />
                    <Skeleton className='h-10 w-full' />
                </div>}
                {loaded && question && <div className="flex flex-col gap-4">
                    <h1>{question.question}</h1>
                    {question.answers.map((a, i) => {
                        return (<Button variant='secondary' key={i} onClick={() => handleAnswer(a.id)}>{a.answer}</Button>)
                    })}
                </div>}
            </div>}
            {data.entry.entered && data.entry.complete && <DialogFooter>
                <Button disabled={restarting} onClick={handleRestart}>{restarting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}Restart</Button>
            </DialogFooter>}
        </DialogContent>
    </Dialog>)
}

function FavoriteButton({ lessonId, favorited }) {
    const [wait, setWait] = React.useState(false);
    const [state, setState] = React.useState(favorited);

    const onClick = async () => {
        if (wait) return;
        setWait(true);

        let response = await fetch('/api/user/lessons/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: lessonId
            })
        });

        setWait(false);

        if (!response?.ok) return toast({
            title: "Something went wrong.",
            description: "Please refresh the page and try again.",
            variant: "destructive",
        })

        setState(!state);
    }

    return (<Button disabled={wait} onClick={onClick} variant='secondary'>{wait ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : state ? <Icons.unheart className='text-destructive mr-2 h-4 w-4' /> : <Icons.heart className='text-destructive mr-2 h-4 w-4' />}{state ? 'Unfavorite' : 'Favorite'}</Button>)
}

function Lesson({ chapter, data, index }) {
    return (<Link href={`/course/chapters/${chapter.slug}/${data.slug}`} className="border border-1 rounded-lg p-5">
        <div>
            <div className="flex gap-4">
                <img alt='thumbnail' src={data.thumbnail} className="h-20 rounded-sm" />
                <div>
                    <h1 className="font-bold text-lg flex w-full justify-between items-center">#{index + 1} {data.name}</h1>
                    <p className="text-muted-foreground text-sm">{data.description}</p>
                    <p className="text-muted-foreground text-xs">{formatDate(data.updatedAt, '%B%e, %Y')}</p>
                </div>
            </div>
        </div>
    </Link>)
}   
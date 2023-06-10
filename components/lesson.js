'use client';

import React from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "@/components/ui/use-toast"
import { Icons } from '@/components/icons';

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
        <Player autoPlay poster={data.lesson.thumbnail} src={`http://localhost:3000/api/lesson-video/${data.lesson.id}`}>
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
        <div className='flex gap-4'>
            <FavoriteButton favorited={data.lesson.favorited} lessonId={data.lesson.id} />
            <QuizButton />
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

function QuizButton({ started, completed }) {
    return (<Button variant='outline'>Start Quiz</Button>)
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
    return (<Link href={`/course/chapter/${chapter.slug}/${data.slug}`} className="border border-1 rounded-lg p-5">
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
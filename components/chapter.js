'use client';

import Link from "next/link";

import { Skeleton } from "./ui/skeleton";
import { Progress } from "@/components/ui/progress";

import { formatDate } from "@/libs/date";

import sugar from 'sugar';

sugar.String.extend();

export function Chapter({ chapter }) {
    return (<div>
        {chapter.lessons.length === 0 && <div>
            <p className="text-destructive">Nothing here..</p>
        </div>}
        {chapter.lessons.length >= 1 && <div className="flex gap-2 items-center mt-[12px]">
            <Progress value={Math.round(chapter.successRate)} />
            <p className="text-xs whitespace-nowrap">{Math.round(chapter.successRate).toString().replace('NaN', '0')}% Complete</p>
        </div>}
        {chapter.lessons.length >= 1 && <div className="flex flex-col gap-4 mt-[24px]">
            {chapter.lessons.map((lesson, index) => {
                return (<Lesson
                    index={index}
                    key={index}
                    data={lesson}
                    chapter={chapter}
                />)
            })}
        </div>}
    </div>)
}

function Lesson({ chapter, data, index }) {
    return (<Link href={`/course/chapters/${chapter.slug}/${data.slug}`} className="border border-1 rounded-lg p-5">
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <img alt='thumbnail' src={data.thumbnail} className="h-20 rounded-sm" />
                <div>
                    <h1 className="font-bold text-lg flex w-full justify-between items-center">#{index + 1} {data.name}</h1>
                    <p className="text-muted-foreground text-sm">{sugar.String.truncate(data.description, 150)}</p>
                    <p className="text-muted-foreground text-xs">{formatDate(data.updatedAt, '%B %e, %Y')}</p>
                </div>
            </div>
            {data.questions && data.entry.entered && data.entry.complete && <div className="flex gap-2 items-center">
                <Progress value={Math.round(data.entry.successRate)} />
                <p className="text-xs whitespace-nowrap">{Math.round(data.entry.successRate).toString().replace('NaN', '0')}% Complete</p>
            </div>}
        </div>
    </Link>)
}

export function ChapterSkeleton() {
    return (<div>
        <Skeleton className="h-10 w-[140px]" />
        <Skeleton className="mt-[8px] h-6 w-3/4" />
        <div className="mt-[12px] flex gap-2 items-center">
            <Skeleton className="w-full h-2" />
            <Skeleton className="w-[90px] h-2" />
        </div>
        <div className="mt-[24px]">
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
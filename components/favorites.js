'use client';

import Link from 'next/link'

import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/libs/date";

export function FavoriteList({ array }) {
    return <div className="mt-[24px]">
        {array.length === 0 && <div>
            <p className="text-destructive">Nothing here..</p>
        </div>}
        {array.length >= 1 && <div className="flex flex-col gap-4">
            {array.map((lesson, index) => {
                return (<Lesson
                    index={index}
                    key={index}
                    data={lesson}
                    chapter={lesson.chapter}
                />)
            })}
        </div>}
    </div>;
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

export function FavoritesSkeleton() {
    return (<div className="mt-[24px]">
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
    </div>)
}
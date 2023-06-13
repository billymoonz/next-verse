'use client';

import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function Chapters({ chapters, successRate }) {
    return (<div className="mt-[12px]">
        <div className="flex gap-2 items-center">
            <Progress value={successRate} />
            <p className="text-xs whitespace-nowrap">{Math.round(successRate).toString().replace('NaN', '0')}% Complete</p>
        </div>
        <div className="mt-[24px] grid lg:grid-cols-2 xl:grid-cols-3 gap-4 flow">
            {chapters.map((chapter, index) => {
                return (<Chapter
                    index={index}
                    item={chapter}
                    key={chapter.slug}
                />)
            })}
        </div>
    </div>)
}

function Chapter({ item, index }) {
    return (<div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
        <div>
            <h1 className="font-bold text-lg flex w-full justify-between items-center">#{index + 1} {item.name}<span className="text-muted-foreground text-xs">{Math.round(item.successRate).toString().replace('NaN', '0')}% Complete</span></h1>
            <p className="text-muted-foreground text-sm">{item.description}</p>
        </div>
        <Link className={buttonVariants()} href={`/course/chapters/${item.slug}`}>{item.lessons.length} Lesson(s)</Link>
    </div>)
}

export function ChapterSkeleton() {
    return (<div className="mt-[12px]">
        <div className="flex gap-2 items-center">
            <Skeleton className="w-full h-2" />
            <Skeleton className="w-[90px] h-2" />
        </div>
        <div className="mt-[24px] grid lg:grid-cols-2 xl:grid-cols-3 gap-4 flow">
            <div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
                <div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-1/5" />
                        <Skeleton className="h-2 w-[60px]"/>
                    </div>
                    <Skeleton className="mt-[8px] h-12 w-full" />
                </div>
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
                <div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-1/5" />
                        <Skeleton className="h-2 w-[60px]"/>
                    </div>
                    <Skeleton className="mt-[8px] h-12 w-full" />
                </div>
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
                <div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-1/5" />
                        <Skeleton className="h-2 w-[60px]"/>
                    </div>
                    <Skeleton className="mt-[8px] h-12 w-full" />
                </div>
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
                <div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-1/5" />
                        <Skeleton className="h-2 w-[60px]"/>
                    </div>
                    <Skeleton className="mt-[8px] h-12 w-full" />
                </div>
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
                <div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-1/5" />
                        <Skeleton className="h-2 w-[60px]"/>
                    </div>
                    <Skeleton className="mt-[8px] h-12 w-full" />
                </div>
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
                <div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-1/5" />
                        <Skeleton className="h-2 w-[60px]"/>
                    </div>
                    <Skeleton className="mt-[8px] h-12 w-full" />
                </div>
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
    </div>)
}
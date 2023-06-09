'use client';

import Link from "next/link";

import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";

export function Chapters({ chapters }) {
    return (<div className="mt-[24px] grid lg:grid-cols-2 xl:grid-cols-3 gap-4 flow">
        {chapters.map((chapter, index) => {
            return (<Chapter
                index={index}
                item={chapter}
                key={chapter.slug}
            />)
        })}
    </div>)
}

function Chapter({ item, index }) {
    return (<div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
        <div>
            <h1 className="font-bold text-lg flex w-full justify-between items-center">#{index + 1} {item.name}</h1>
            <p className="text-muted-foreground text-sm">{item.description}</p>
        </div>
        <Link className={buttonVariants()} href={`/course/chapter/${item.slug}`}>{item.lessons.length} Lesson(s)</Link>
    </div>)
}

export function ChapterSkeleton() {
    return (<div className="mt-[24px] grid lg:grid-cols-2 xl:grid-cols-3 gap-4 flow">
        <div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
            <div>
                <Skeleton className="h-5 w-1/5" />
                <Skeleton className="mt-[8px] h-12 w-full" />
            </div>
            <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
            <div>
                <Skeleton className="h-5 w-1/5" />
                <Skeleton className="mt-[8px] h-12 w-full" />
            </div>
            <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
            <div>
                <Skeleton className="h-5 w-1/5" />
                <Skeleton className="mt-[8px] h-12 w-full" />
            </div>
            <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
            <div>
                <Skeleton className="h-5 w-1/5" />
                <Skeleton className="mt-[8px] h-12 w-full" />
            </div>
            <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
            <div>
                <Skeleton className="h-5 w-1/5" />
                <Skeleton className="mt-[8px] h-12 w-full" />
            </div>
            <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
            <div>
                <Skeleton className="h-5 w-1/5" />
                <Skeleton className="mt-[8px] h-12 w-full" />
            </div>
            <Skeleton className="h-8 w-full" />
        </div>
    </div>)
}
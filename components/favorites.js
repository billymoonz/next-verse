'use client';

import { Skeleton } from "@/components/ui/skeleton";

export function FavoriteList({ array }) {
    return null;
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
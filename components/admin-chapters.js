'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";

import React from "react";

import { toast } from "@/components/ui/use-toast"

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";

import { Skeleton } from "@/components/ui/skeleton";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/libs/utils";

export function ChapterSkeleton() {
    return <div className="mt-[12px]">
        <Skeleton className="h-8 w-[120px]" />
        <div className="mt-[24px] grid lg:grid-cols-2 xl:grid-cols-3 gap-4 flow">
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
        </div>
    </div>;
}

export function Chapters({ chapters }) {
    return (<div className="mt-[12px]">
        {chapters.length === 0 && <EmptyChapters />}
        {chapters.length >= 1 && <ChapterList array={chapters} />}
    </div>)
}

function ChapterList({ array }) {
    return (<div>
        <ChapterBuilder />
        <div className="mt-[24px] grid lg:grid-cols-2 xl:grid-cols-3 gap-4 flow">
            {array.map((item, index) => {
                return (<div key={item.id} className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
                    <div>
                        <h1 className="font-bold text-lg flex w-full justify-between items-center">#{index + 1} {item.name}<span><Link href={`/course/chapters/${item.slug}`}><Icons.link className="h-5 w-5" /></Link></span></h1>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                    <ChapterEditor chapter={item} />
                </div>)
            })}
        </div>
    </div >)
}

function EmptyChapters() {
    return (<div className="h-[250px] w-full flex flex-col items-center justify-center border-2 border border-dashed rounded-xl">
        <h1 className="font-bold text-xl">Looks Empty</h1>
        <p className="text-muted-foreground text-sm max-w-[90%] text-center">There is currently no course chapters available.</p>
        <ChapterBuilder />
    </div>)
}

function ChapterButton({ children, editor }) {
    return (<p className={cn("mt-[12px]", buttonVariants(editor ? {} : { variant: "secondary", size: "sm" }), editor && 'w-full')}>{children}</p>)
}

function ChapterBuilder() {
    const router = useRouter();

    const [wait, setWait] = React.useState(false);

    const [name, setName] = React.useState('');
    const [slug, setSlug] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleBtnEvent = async () => {
        if (wait) return;
        setWait(true);
        let response = await fetch('/api/admin/chapter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                slug,
                description
            })
        });

        setName('');
        setDescription('');
        setSlug('');
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
            description: 'Chapter successfully created!'
        })

        router.refresh();
    }

    return (<Sheet size='full'>
        <SheetTrigger disabled={wait}>
            <ChapterButton>{wait && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}Create Chapter</ChapterButton>
        </SheetTrigger>
        <SheetContent position="right" size="lg">
            <SheetHeader>
                <SheetTitle>Create Chapter</SheetTitle>
                <SheetDescription>
                    Enter details, click create chapter to add as an addition to the course.
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder='Slug' />
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            </div>
            <SheetFooter>
                <SheetClose asChild>
                    <Button onClick={handleBtnEvent} type='submit'>Create Chapter</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>)
}

function ChapterEditor({ chapter }) {
    const router = useRouter();

    const [wait, setWait] = React.useState(false);

    const [name, setName] = React.useState(chapter.name);
    const [slug, setSlug] = React.useState(chapter.slug);
    const [description, setDescription] = React.useState(chapter.description);

    const handleBtnEvent = async () => {
        if (wait) return;
        setWait(true);
        let response = await fetch('/api/admin/chapter', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: chapter.id,
                name,
                slug,
                description
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
            description: 'Chapter successfully saved!'
        })

        router.refresh();
    }

    const deleteEvent = async () => {
        if (wait) return;
        setWait(true);

        let response = await fetch(`/api/admin/chapter?id=${chapter.id}`, {
            method: 'DELETE'
        });

        if (!response?.ok) {
            setWait(false);
            return toast({
                title: "Something went wrong.",
                description: "Please refresh the page and try again.",
                variant: "destructive",
            })
        }

        toast({
            title: 'Success',
            description: 'Chapter successfully saved!'
        })

        router.refresh();
    }

    return (<Sheet size='full'>
        <SheetTrigger disabled={wait}>
            <ChapterButton editor>{wait && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}Manage Chapter</ChapterButton>
        </SheetTrigger>
        <SheetContent position="right" size="lg">
            <SheetHeader>
                <SheetTitle>Manage Chapter</SheetTitle>
                <SheetDescription>
                    Enter details, click save & update the course.
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder='Slug' />
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            </div>
            <SheetFooter className="gap-2 sm:gap-0">
                <SheetClose asChild>
                    <Button onClick={deleteEvent} variant="destructive">Delete</Button>
                </SheetClose>
                <SheetClose asChild>
                    <Button onClick={handleBtnEvent} type='submit'>Save</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>)
}
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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

export function LessonsSkeleton() {
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

export function Lessons({ lessons, chapters }) {
    return (<div className="mt-[12px]">
        {lessons.length === 0 && <EmptyLessons chapters={chapters} />}
        {lessons.length >= 1 && <LessonList chapters={chapters} array={lessons} />}
    </div>)
}

function LessonList({ array, chapters }) {
    return (<div>
        <LessonBuilder chapters={chapters} />
        <div className="mt-[24px] grid lg:grid-cols-2 xl:grid-cols-3 gap-4 flow">
            {array.map((item, index) => {
                return (<div key={item.id} className="flex flex-col justify-between border border-1 rounded-lg p-5 h-[220px]">
                    <div>
                        <h1 className="font-bold text-lg flex w-full justify-between items-center">#{index + 1} {item.name}<span><Link href={`/course/chapter/${item.chapter.slug}/${item.slug}`}><Icons.link className="h-5 w-5" /></Link></span></h1>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                    <LessonEditor lesson={item} chapters={chapters} />
                </div>)
            })}
        </div>
    </div >)
}

function EmptyLessons({ chapters }) {
    return (<div className="h-[250px] w-full flex flex-col items-center justify-center border-2 border border-dashed rounded-xl">
        <h1 className="font-bold text-xl">Looks Empty</h1>
        <p className="text-muted-foreground text-sm max-w-[90%] text-center">There is currently no course lessons available.</p>
        <LessonBuilder chapters={chapters} />
    </div>)
}

function LessonButon({ children, editor }) {
    return (<p className={cn("mt-[12px]", buttonVariants(editor ? {} : { variant: "secondary", size: "sm" }), editor && 'w-full')}>{children}</p>)
}

function LessonBuilder({ chapters }) {
    const router = useRouter();

    const [wait, setWait] = React.useState(false);

    const [name, setName] = React.useState('');
    const [slug, setSlug] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [chapter, setChapter] = React.useState(undefined);
    const [thumbnail, setThumbnail] = React.useState('');
    const [video, setVideo] = React.useState('');

    const handleBtnEvent = async () => {
        if (wait) return;
        setWait(true);
        let response = await fetch('/api/admin/lesson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                slug,
                description,
                chapter: chapter === undefined ? '' : chapter,
                thumbnail,
                video
            })
        });

        setName('');
        setDescription('');
        setSlug('');
        setChapter('');
        setVideo('');
        setThumbnail('');
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
            description: 'Lesson successfully created!'
        })

        router.refresh();
    }

    return (<Sheet size='full' onOpenChange={(v) => {
        const onThumbnailChange = (e) => {
            if (e.target.files.length < 1) return;
            let file = e.target.files[0];
            if (file.size >= (10485760 * 1.5)) {
                document.getElementById('thumbnail').value = null;
                return toast({
                    title: "Whoopsie",
                    description: "Image size is greater than the 15mb limit.",
                    variant: "destructive",
                });
            }
            let fr = new FileReader();
            fr.onload = (e) => {
                setThumbnail(e.target.result);
            }
            fr.readAsDataURL(file);
        }
        const onVideoChange = (e) => {
            if (e.target.files.length < 1) return;
            let file = e.target.files[0];
            if (file.size >= (10485760 * 1.5)) {
                document.getElementById('video').value = null;
                return toast({
                    title: "Whoopsie",
                    description: "Video size is greater than the 15mb limit.",
                    variant: "destructive",
                });
            }
            let fr = new FileReader();
            fr.onload = (e) => {
                setVideo(e.target.result);
            }
            fr.readAsDataURL(file);
        }
        if (v) {
            setTimeout(() => {
                document.getElementById('thumbnail').addEventListener('change', onThumbnailChange);
                document.getElementById('video').addEventListener('change', onVideoChange);
            }, 10)

        } else {
            document.getElementById('thumbnail').removeEventListener('change', onThumbnailChange);
            document.getElementById('video').removeEventListener('change', onThumbnailChange);
        }
    }}>
        <SheetTrigger disabled={wait}>
            <LessonButon>{wait && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}Create Lesson</LessonButon>
        </SheetTrigger>
        <SheetContent position="right" size="lg">
            <SheetHeader>
                <SheetTitle>Create Lesson</SheetTitle>
                <SheetDescription>
                    Enter details, click create lesson to add as an addition to the course.
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder='Slug' />
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <Label htmlFor="chapter">Chapter</Label>
                <Select value={chapter} onValueChange={setChapter}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a chapter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Available Chapters</SelectLabel>
                            {chapters.map((chapter) => {
                                return (<SelectItem key={chapter.id} value={chapter.id}>{chapter.name}</SelectItem>)
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="thumbnail">Thumbnail</Label>
                        <Input id="thumbnail" type='file' accept="image/png, image/jpeg" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="video">Video</Label>
                        <Input id="video" type='file' accept="video/mp4, video/mp3" />
                    </div>
                </div>
            </div>
            <SheetFooter>
                <SheetClose asChild>
                    <Button onClick={handleBtnEvent} type='submit'>Create Lesson</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>)
}

function LessonEditor({ lesson, chapters }) {
    const router = useRouter();

    const [wait, setWait] = React.useState(false);

    const [name, setName] = React.useState(lesson.name);
    const [slug, setSlug] = React.useState(lesson.slug);
    const [description, setDescription] = React.useState(lesson.description);
    const [chapter, setChapter] = React.useState(lesson.chapterId);
    const [thumbnail, setThumbnail] = React.useState('');
    const [video, setVideo] = React.useState('');

    const handleBtnEvent = async () => {
        if (wait) return;
        setWait(true);
        let response = await fetch('/api/admin/lesson', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: lesson.id,
                name,
                slug,
                description,
                chapter: chapter === undefined ? '' : chapter,
                thumbnail,
                video
            })
        });

        setThumbnail('');
        setVideo('');
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
            description: 'Lesson successfully saved!'
        })

        router.refresh();
    }

    const deleteEvent = async () => {
        if (wait) return;
        setWait(true);

        let response = await fetch(`/api/admin/lesson?id=${lesson.id}`, {
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

    return (<Sheet size='full' onOpenChange={(v) => {
        const onThumbnailChange = (e) => {
            if (e.target.files.length < 1) return;
            let file = e.target.files[0];
            if (file.size >= (10485760 * 1.5)) {
                document.getElementById('thumbnail').value = null;
                return toast({
                    title: "Whoopsie",
                    description: "Image size is greater than the 15mb limit.",
                    variant: "destructive",
                });
            }
            let fr = new FileReader();
            fr.onload = (e) => {
                setThumbnail(e.target.result);
            }
            fr.readAsDataURL(file);
        }
        const onVideoChange = (e) => {
            if (e.target.files.length < 1) return;
            let file = e.target.files[0];
            if (file.size >= (10485760 * 1.5)) {
                document.getElementById('video').value = null;
                return toast({
                    title: "Whoopsie",
                    description: "Video size is greater than the 15mb limit.",
                    variant: "destructive",
                });
            }
            let fr = new FileReader();
            fr.onload = (e) => {
                setVideo(e.target.result);
            }
            fr.readAsDataURL(file);
        }
        if (v) {
            setTimeout(() => {
                document.getElementById('thumbnail').addEventListener('change', onThumbnailChange);
                document.getElementById('video').addEventListener('change', onVideoChange);
            }, 10)

        } else {
            document.getElementById('thumbnail').removeEventListener('change', onThumbnailChange);
            document.getElementById('video').removeEventListener('change', onThumbnailChange);
        }
    }}>
        <SheetTrigger disabled={wait}>
            <LessonButon editor>{wait && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}Manage Lesson</LessonButon>
        </SheetTrigger>
        <SheetContent position="right" size="lg">
            <SheetHeader>
                <SheetTitle>Manage Lesson</SheetTitle>
                <SheetDescription>
                    Enter details, click save & update the lesson.
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder='Slug' />
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <Label htmlFor="chapter">Chapter</Label>
                <Select value={chapter} onValueChange={setChapter}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a chapter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Available Chapters</SelectLabel>
                            {chapters.map((chapter) => {
                                return (<SelectItem key={chapter.id} value={chapter.id}>{chapter.name}</SelectItem>)
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="thumbnail">Thumbnail</Label>
                        <Input id="thumbnail" type='file' accept="image/png, image/jpeg" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="video">Video</Label>
                        <Input id="video" type='file' accept="video/mp4, video/mp3" />
                    </div>
                </div>
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
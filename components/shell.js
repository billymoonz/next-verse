'use client';

import { DashNav } from "@/components/nav";
import { Icons } from "@/components/icons";
import { cn } from "@/libs/utils";

import Link from "next/link";

import { usePathname } from "next/navigation";

export function AdminShell({ user, children }) {
    const path = usePathname();

    return (<div>
        <DashNav admin user={user} />
        <div className="container">
            <div className="max-w-[1330px] grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <nav className="grid items-start gap-2">
                        <Link href={'/course/dashboard'}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                )}
                            >
                                <Icons.post className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </span>
                        </Link>
                        <Link href={'/course/favourites'}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                )}
                            >
                                <Icons.heart className="mr-2 h-4 w-4" />
                                <span>Favourites</span>
                            </span>
                        </Link>
                        <Link href={'/course/billing'}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                )}
                            >
                                <Icons.billing className="mr-2 h-4 w-4" />
                                <span>Billing</span>
                            </span>
                        </Link>
                        <Link href={'/admin'}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    "bg-accent"
                                )}
                            >
                                <Icons.user className="mr-2 h-4 w-4" />
                                <span>Admin</span>
                            </span>
                        </Link>
                    </nav>
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    </div>)
}

export function CourseShell({ user, children }) {
    const path = usePathname();

    return (<div>
        <DashNav user={user} />
        <div className="container">
            <div className="max-w-[1330px] grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <nav className="grid items-start gap-2">
                        <Link href={'/course/dashboard'}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    path === '/course/dashboard' ? "bg-accent" : "transparent",
                                )}
                            >
                                <Icons.post className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </span>
                        </Link>
                        <Link href={'/course/favourites'}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    path === '/course/favourites' ? "bg-accent" : "transparent",
                                )}
                            >
                                <Icons.heart className="mr-2 h-4 w-4" />
                                <span>Favourites</span>
                            </span>
                        </Link>
                        <Link href={'/course/billing'}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    path === '/course/billing' ? "bg-accent" : "transparent",
                                )}
                            >
                                <Icons.billing className="mr-2 h-4 w-4" />
                                <span>Billing</span>
                            </span>
                        </Link>
                        <Link href={'/admin'}>
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    path === '/admin' ? "bg-accent" : "transparent",
                                )}
                            >
                                <Icons.user className="mr-2 h-4 w-4" />
                                <span>Admin</span>
                            </span>
                        </Link>
                    </nav>
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    </div>)
}
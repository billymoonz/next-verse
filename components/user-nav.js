"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "./user-avatar"

export function UserAccountNav({ user }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    user={{ name: user.name || null, image: user.image || null }}
                    className="h-8 w-8"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && <p className="font-medium">{user.name}</p>}
                        {user.email && (
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/course/chapters">Chapters</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/course/favorites">Favorites</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/course/billing">Billing</Link>
                </DropdownMenuItem>
                {user.admin && <DropdownMenuItem asChild>
                    <Link href="/admin">Admin</Link>
                </DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(event) => {
                        event.preventDefault()
                        signOut({
                            callbackUrl: `${window.location.origin}/login`,
                        })
                    }}
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
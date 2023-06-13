'use client'

import React from 'react';

import { useSearchParams } from "next/navigation"

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { buttonVariants } from './ui/button';
import { Icons } from '@/components/icons';
import { cn } from '@/libs/utils';

import { toast } from "@/components/ui/use-toast"

import { signIn } from 'next-auth/react';

export function AuthForm({ ...props }) {
    const [isLoading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [isGitHubLoading, setIsGitHubLoading] = React.useState(false);
    const searchParams = useSearchParams()

    const onLogin = async (e) => {
        if(e && e.preventDefault) e.preventDefault();
        if (isLoading || isGitHubLoading) return;
        if (email.trim().length === 0) return;
        setLoading(true)

        const signInResult = await signIn("email", {
            email: email.toLowerCase(),
            redirect: false,
            callbackUrl: searchParams?.get("from") || "/course/chapters",
        })

        console.log(signInResult)

        setLoading(false)

        if (!signInResult?.ok) {
            return toast({
                title: "Something went wrong.",
                description: "Your sign in request failed. Please try again.",
                variant: "destructive",
            })
        }

        return toast({
            title: "Check your email",
            description: "We sent you a login link. Be sure to check your spam too.",
        })
    }

    return (<div>
        <div className={cn("grid gap-6")} {...props}>
            <form onSubmit={onLogin}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoCorrect="off"
                            disabled={isLoading || isGitHubLoading}
                        />
                    </div>
                    <button className={cn(buttonVariants())} disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In with Email
                    </button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <button
                type="button"
                className={cn(buttonVariants({ variant: "outline" }))}
                onClick={() => {
                    setIsGitHubLoading(true)
                    signIn("github")
                }}
                disabled={isLoading || isGitHubLoading}
            >
                {isGitHubLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{" "}
                Github
            </button>
        </div>
    </div>)
}
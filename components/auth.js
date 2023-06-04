'use client'

import Link from 'next/link'

import React from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { buttonVariants } from './ui/button';
import { Icons } from '@/components/icons';
import { cn } from '@/libs/utils';

import { signIn } from 'next-auth/react';

export function AuthForm({ ...props }) {
    const [isLoading, setLoading] = React.useState(false);
    const [isGitHubLoading, setIsGitHubLoading] = React.useState(false);

    return (<div>
        <div className={cn("grid gap-6")} {...props}>
            <form onSubmit={null}>
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
                            autoCorrect="off"
                            disabled={isLoading || isGitHubLoading}
                        />
                        {/* {errors?.email && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.email.message}
                            </p>
                        )} */}
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
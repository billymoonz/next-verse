import Link from 'next/link';
import { redirect } from 'next/navigation';

import { AuthForm } from '@/components/auth'
import { cn } from "@/libs/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { getCurrentUser } from '@/libs/session'

export const metadata = {
    title: 'Login'
}

export default async function LoginPage() {
    let user = await getCurrentUser();

    if (user) {
        redirect('/course/chapters')
    }

    return (<div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
            href="/"
            className={cn(
                buttonVariants({ variant: "ghost" }),
                "absolute left-4 top-4 md:left-8 md:top-8"
            )}
        >
            <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
            </>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Welcome back
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email to sign in to your account
                </p>
            </div>
            <AuthForm />
        </div>
    </div>)
}
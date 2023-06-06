'use client';

import React from "react";

import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import { Icons } from '@/components/icons';

export function BillingForm() {
    const [isLoading, setLoading] = React.useState(false);

    const onSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault()
        setLoading(!isLoading)

        const response = await fetch("/api/user/stripe", {
            method: 'GET',
        })

        if (!response?.ok) {
            return toast({
                title: "Something went wrong.",
                description: "Please refresh the page and try again.",
                variant: "destructive",
            })
        }

        const session = await response.json()
        if (session) {
            window.location.href = session.url
        }
    }

    return (<form className="mt-[24px] border border-1 rounded-lg p-5" onSubmit={onSubmit}>
        <h1 className="font-bold text-lg">Subscription</h1>
        <p className="text-muted-foreground text-sm">You have yet to subscribe to the course.</p>
        <Button className="mt-[12px]" disabled={isLoading}>
            {isLoading &&
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            }
            Subscribe
        </Button>
    </form>)
}
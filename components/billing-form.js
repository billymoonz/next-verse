'use client';

import React from "react";

import { formatDate } from "@/libs/date";

import { toast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from '@/components/icons';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function BillingSkeleton() {
    return (<div className="mt-[24px] border border-1 rounded-lg p-5">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="mt-[4px] h-4 w-3/4" />
        <Skeleton className="mt-[28px] h-8 w-[120px]" />
    </div>)
}

export function BillingForm({ subscriptionPlan }) {
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

    const formatString = (s) => {
        let v = '';
        for (let i = 0; i < s.length; i++) {
            let c = s[i];
            if (i === 0) c = c.toUpperCase();
            v = v + c;
        }
        return v;
    }

    return (<div>
        <form className="mt-[24px] border border-1 rounded-lg p-5" onSubmit={onSubmit}>
            <h1 className="font-bold text-lg">Subscription</h1>
            {!subscriptionPlan.isSubscribed && <p className="text-muted-foreground text-sm">You are currently not subscribing to this course.</p>}
            {subscriptionPlan.isSubscribed && <p className="text-muted-foreground text-sm">You are currently subscribed to this course.</p>}
            <div className="flex flex-col items-start space-y-2 md:items-center md:flex-row md:justify-between md:space-x-0">
                <Button className="mt-[12px]" disabled={isLoading}>
                    {isLoading &&
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    }
                    {subscriptionPlan.isSubscribed ? 'Manage Subscription' : 'Subscribe'}
                </Button>
                {subscriptionPlan.isSubscribed && <p className="rounded-full text-xs font-medium">
                    {subscriptionPlan.isCanceled ? "Cancels on " : "Renews on "}
                    {formatDate(subscriptionPlan.stripeCurrentPeriodEnd, '%B%e, %Y')}.
                </p>}
            </div>
        </form>
        {subscriptionPlan.invoices.length >= 1 && <Table className="mt-[24px]">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {subscriptionPlan.invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium whitespace-nowrap">{invoice.id}</TableCell>
                        <TableCell>{formatString(invoice.state)}</TableCell>
                        <TableCell>{formatString(invoice.method)}</TableCell>
                        <TableCell className="text-right">£{parseFloat(invoice.amount / 100).toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>}
    </div>)
}
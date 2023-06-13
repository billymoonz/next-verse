'use client';

import React from "react";

import { Button } from "@/components/ui/button"
import { Badge } from '@/components/ui/badge';
import { Skeleton } from "@/components/ui/skeleton";

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { formatDate } from "@/libs/date";
import { generateReport } from "@/libs/excel";

const columns = [
    {
        accessorKey: 'state',
        header: 'Status',
        cell: ({ row }) => {
            return (<Badge className={row.getValue("state").class}>{row.getValue("state").value}</Badge>)
        }
    },
    {
        accessorKey: 'customer_email',
        header: 'Email Address',
    },
    {
        accessorKey: 'current_period_start',
        header: <div className="whitespace-nowrap">Period Start</div>,
        cell: ({ row }) => {
            return <div className="font-medium whitespace-nowrap">{formatDate(row.getValue('current_period_start'), '%B%e, %Y')}</div>
        },
    },
    {
        accessorKey: 'current_period_end',
        header: () => <div className="whitespace-nowrap text-right">Period End</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium whitespace-nowrap">{formatDate(row.getValue('current_period_end'), '%B%e, %Y')}</div>
        },
    }
]

export function Subscriptions({ data }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const exportTable = () => {
        let excelData = [
            [
                'Status',
                'Email Address',
                'Period Start',
                'Period End'
            ]
        ]
        data.forEach((row) => {
            excelData = excelData.concat([
                [
                    row.state.value,
                    row.customer_email,
                    formatDate(row.current_period_start, '%d/%m/Y'),
                    formatDate(row.current_period_end, '%d/%m/%Y')
                ]
            ]);
        })
        let blob = generateReport(excelData)
        if (!blob) return;
    }

    return (<div>
        <div className="mt-[12px]">
            <Button onClick={() => exportTable()} size="sm" variant="secondary">Export</Button>
        </div>
        <div className='mt-[24px]'>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, index) => (
                            <TableRow
                                key={index}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell, i) => (
                                    <TableCell key={i}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
        <div className="mt-[12px] flex items-center justify-end">
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>

        </div>
    </div>)
}

export function SubscriptionSkeleton() {
    return (<div>
        <div className="mt-[12px]">
            <Skeleton className="w-[100px] h-8" />
        </div>
        <div className="mt-[24px] flex flex-col gap-4">
            <div className="flex items-center px-2 justify-between h-16 border border-l-0 border-r-0 border-t-0 border-b-1">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[130px]" />
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-6 w-[80px]" />
            </div>
            <div className="flex items-center px-2 justify-between h-10">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[130px]" />
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-6 w-[80px]" />
            </div>
            <div className="flex items-center px-2 justify-between h-10">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[130px]" />
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-6 w-[80px]" />
            </div>
            <div className="flex items-center px-2 justify-between h-10">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[130px]" />
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-6 w-[80px]" />
            </div>
            <div className="flex items-center px-2 justify-between h-10">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[130px]" />
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-6 w-[80px]" />
            </div>
            <div className="flex items-center px-2 justify-between h-10">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[130px]" />
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-6 w-[80px]" />
            </div>
            <div className="flex items-center px-2 justify-between h-10">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[130px]" />
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-6 w-[80px]" />
            </div>
        </div>
        <div className="mt-[12px]">
            <div className="flex gap-2 flex items-center justify-end">
                <Skeleton className="h-8 w-[100px]" />
                <Skeleton className="h-8 w-[100px]" />
            </div>
        </div>
    </div>)
}
'use client';

import React from "react";

import { Button } from "@/components/ui/button";

export function Questions({ data }) {
    return (<div className="mt-[24px]">
        {data.questions.length >= 1 && <div className="flex gap-4 w-full items-center">
            <Button variant="secondary">Create Question</Button>
            <p className="text-foreground text-sm">{data.name} Quiz</p>
        </div>}
        {data.questions.length === 0 && <EmptyQuestions data={data} />}
    </div>)
}

function EmptyQuestions({ data }) {
    return (<div className="h-[250px] w-full flex gap-2 flex-col items-center justify-center border-2 border border-dashed rounded-xl">
        <h1 className="font-bold text-xl">Looks Empty</h1>
        <p className="text-muted-foreground text-sm max-w-[90%] text-center">There is currently no questions available for {data.name}.</p>
        <Button variant="secondary">Create Question</Button>
    </div>)
}

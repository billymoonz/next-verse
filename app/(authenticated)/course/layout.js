import { redirect } from 'next/navigation'

import { getCurrentUser } from "@/libs/session";

import { CourseShell } from "@/components/shell";

export default async function CourseLayout({ children }) {
    let user = await getCurrentUser();

    if (!user) {
        redirect('/login')
    }

    return (<CourseShell user={user}>
        {children}
    </CourseShell>)
}
import { redirect } from 'next/navigation'

import { getCurrentUser } from "@/libs/session";

import { AdminShell } from "@/components/shell";

export default async function AdminLayout({ children }) {
    let user = await getCurrentUser();

    if (!user) {
        redirect('/login')
    }

    if(!user?.admin) {
        redirect('/course/dashboard');
    }

    return (<AdminShell user={user}>
        {children}
    </AdminShell>)
}
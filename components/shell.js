'use client';

import { DashNav } from "./nav";

export function CourseShell({ user, courses, children }) {
    return (<div>
        <DashNav user={user} />
        <div className="container">
            <main>
                {children}
            </main>
        </div>
    </div>)
}
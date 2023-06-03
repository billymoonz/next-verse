'use client'

import Link from 'next/link'

import { signIn } from 'next-auth/react';

export function AuthPage() {
    return (<div className='app-auth'>
        <header>
            <nav>
                <Link href='/'>Back</Link>
            </nav>
        </header>
        <div>
            <h1>NextVerse</h1>
            <h2>Welcome back</h2>
            <button onClick={() => signIn('github')}>GitHub</button>
        </div>
    </div>)
}
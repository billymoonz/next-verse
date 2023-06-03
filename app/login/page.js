import '@/styles/pages/login.scss'

import { redirect } from 'next/navigation';

import { AuthPage } from '@/components/auth'
import { getCurrentUser } from '@/libs/session'

export const metadata = {
    title: 'Login'
}

export default async function LoginPage(){
    let user = await getCurrentUser();

    if(user) {
        redirect('/course/dashboard')
    }

    return(<AuthPage/>)
}
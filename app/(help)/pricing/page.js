import '@/styles/pages/home.scss';

import {Nav} from '@/components/nav';

export const metadata = {
    title: 'What To Expect'
}

export default async function WTEPage() {
    return (<div>
        <Nav/>
        <div className='home-splash-v2'>
            <h1>What to Expect from NextVerse</h1>
            <p>A Sneak Peek into your Next.js Learning Journey</p>
        </div>
    </div>)
}
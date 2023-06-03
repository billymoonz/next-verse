'use client'

import Link from 'next/link'

import {Nav} from '@/components/nav';

import '@/styles/pages/home.scss';

export default function Home() {
    return (<div>
        <Nav/>
        <div className='home-splash'>
            <Link className='home-splash-github' target='_blank' href='https://github.com/billymoonz/next-verse'>Code Available on GitHub</Link>
            <h1>Embark on a Journey to Next.js Mastery</h1>
            <p>Unlock the Power of Next.js and Build Stunning Web Applications with Ease</p>
            <div className='home-splash-links'>
                <Link href='/login'>Get Started</Link>
            </div>
        </div>
        <div className='home-splash-v2'>
            <h1>Get in Touch with Us</h1>
            <p>Reach Out to Us for Inquiries, Support, or Collaboration Opportunities</p>
            <div className='home-splash-links'>
                <Link target='_blank' href='mailto:contact@next-verse.net'>Get In Touch</Link>
            </div>
        </div>
    </div>)
}
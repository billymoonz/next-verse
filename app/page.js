'use client'

import Link from 'next/link'

import {Nav} from '@/components/navigation';

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
            <h1>What to Expect from NextVerse</h1>
            <p>A Sneak Peek into your Next.js Learning Journey</p>
            <div className='home-splash-links'>
                <Link href='/what-to-expect'>Discover</Link>
            </div>
        </div>
        <div className='home-splash-v2'>
            <h1>Stay in the Loop with NextVerse Newsletter</h1>
            <p>Get the Latest Next.js Insights, Tips, and Updates Delivered to Your Inbox</p>
            <div className='home-splash-links'>
                <Link href='/news-letter'>Subscribe</Link>
            </div>
        </div>
        <div className='home-splash-v2'>
            <h1>NextVerse Pricing Plans</h1>
            <p>Choose the Perfect Plan to Elevate Your Next.js Skills</p>
            <div className='home-splash-links'>
                <Link href='/pricing'>View Plans</Link>
            </div>
        </div>
        <div className='home-splash-v2'>
            <h1>Get in Touch with Us</h1>
            <p>Reach Out to Us for Inquiries, Support, or Collaboration Opportunities</p>
            <div className='home-splash-links'>
                <Link href='/pricing'>Get In Touch</Link>
            </div>
        </div>
    </div>)
}
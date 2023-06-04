'use client';

import React from 'react';

import Link from 'next/link';

import { ModeToggle } from '@/components/mode-toggle';
import { UserAccountNav } from '@/components/user-nav';
import { RiMenu5Fill, RiCloseLine } from 'react-icons/ri';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/libs/utils';

import '@/styles/components/navigation/nav.scss';

export function Nav() {
    const [menu, setMenu] = React.useState(false);

    React.useEffect(() => {
        const onClickEvent = () => {
            setMenu(previousValue => {
                if (previousValue) {
                    return false;
                }
                return previousValue;
            })
        }
        window.addEventListener('click', onClickEvent);
        return () => window.removeEventListener('click', onClickEvent);
    })

    const toggleMenu = () => {
        if (menu) {
            setMenu(false);
        } else {
            setTimeout(() => {
                setMenu(true);
            }, 10);
        }
    }

    return (<div>
        {menu && <div className='home-nav-menu'>
            <ul>
                <li><Link href='/what-to-expect'>What to expect</Link></li>
                <li><Link href='/news-letter'>News Letter</Link></li>
                <li><Link href='/pricing'>Pricing</Link></li>
                <li><Link target='_blank' href='mailto:contact@next-verse.net'>Contact Us</Link></li>
            </ul>
            <Link className='home-nav-menu-login bg-secondary hover:bg-secondary/80' href='/login'>Login</Link>
        </div>}
        <header className='home-nav'>
            <nav>
                <button onClick={toggleMenu} type='submit'>{menu ? <RiCloseLine /> : <RiMenu5Fill />}</button>
                <h1><Link href='/'>NextVerse</Link></h1>
                <ul>
                    <li><Link href='/what-to-expect'>What to expect</Link></li>
                    <li><Link href='/news-letter'>News Letter</Link></li>
                    <li><Link href='/pricing'>Pricing</Link></li>
                    <li><Link target='_blank' href='mailto:contact@next-verse.net'>Contact Us</Link></li>
                </ul>
                <div className='home-nav-links'>
                    <ModeToggle/>
                    <Link href='/login' className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}>Login</Link>
                </div>
            </nav>
        </header>
    </div>)
}

export function DashNav({ user }) {
    const [menu, setMenu] = React.useState(false);

    React.useEffect(() => {
        const onClickEvent = () => {
            setMenu(previousValue => {
                if (previousValue) {
                    return false;
                }
                return previousValue;
            })
        }
        window.addEventListener('click', onClickEvent);
        return () => window.removeEventListener('click', onClickEvent);
    })

    const toggleMenu = () => {
        if (menu) {
            setMenu(false);
        } else {
            setTimeout(() => {
                setMenu(true);
            }, 10);
        }
    }

    return (<div>
        {menu && <div className='home-nav-menu home-nav-border-top'>
            <ul>
                <li><Link href='/twitter'>Twitter</Link></li>
                <li><Link href='/discord'>Discord</Link></li>
                <li><Link href='/course-reviews'>Reviews</Link></li>
                <li><Link target='_blank' href='mailto:support@next-verse.net'>Help</Link></li>
            </ul>
        </div>}
        <header className='home-nav home-nav-border'>
            <nav>
                <button onClick={toggleMenu} type='submit'>{menu ? <RiCloseLine /> : <RiMenu5Fill />}</button>
                <h1><Link href='/'>NextVerse</Link></h1>
                <ul>
                    <li><Link href='/twitter'>Twitter</Link></li>
                    <li><Link href='/discord'>Discord</Link></li>
                    <li><Link href='/course-reviews'>Reviews</Link></li>
                    <li><Link target='_blank' href='mailto:support@next-verse.net'>Help</Link></li>
                </ul>
                <div className='home-nav-links'>
                    <ModeToggle/>
                    <UserAccountNav user={user}/>
                </div>
            </nav>
        </header>
    </div>)
}
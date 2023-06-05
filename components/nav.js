'use client';

import React from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { ModeToggle } from '@/components/mode-toggle';
import { UserAccountNav } from '@/components/user-nav';
import { RiMenu5Fill, RiCloseLine } from 'react-icons/ri';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/libs/utils';

import '@/styles/components/navigation/nav.scss';

export function Nav() {
    const path = usePathname()
    const [menu, setMenu] = React.useState(false);

    React.useEffect(() => {
        console.log(path)
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
        {menu && <div className='nav-menu'>
            <ul>
                <li><Link href='/pricing' className={cn(path === '/pricing' && 'text-foreground')}>Pricing</Link></li>
                <li><Link href='/news-letter' className={cn(path === '/news-letter' && 'text-foreground')}>News Letter</Link></li>
                <li><Link target='_blank' href='mailto:contact@next-verse.net'>Contact Us</Link></li>
            </ul>
            <Link className='nav-menu-login bg-secondary hover:bg-secondary/80' href='/login'>Login</Link>
        </div>}
        <header className='nav'>
            <nav>
                <button onClick={toggleMenu} type='submit'>{menu ? <RiCloseLine /> : <RiMenu5Fill />}</button>
                <h1><Link href='/'>NextVerse</Link></h1>
                <ul>
                    <li><Link href='/pricing' className={cn(path === '/pricing' && 'text-foreground')}>Pricing</Link></li>
                    <li><Link href='/news-letter' className={cn(path === '/news-letter' && 'text-foreground')}>News Letter</Link></li>
                    <li><Link target='_blank' href='mailto:contact@next-verse.net'>Contact Us</Link></li>
                </ul>
                <div className='nav-links'>
                    <ModeToggle />
                    <Link href='/login' className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}>Login</Link>
                </div>
            </nav>
        </header>
    </div>)
}

export function DashNav({ user, admin }) {
    const path = usePathname()
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
        {menu && <div className='nav-menu nav-border-top'>
            {!admin && <ul>
                <li><Link href='/twitter'>Twitter</Link></li>
                <li><Link href='/discord'>Discord</Link></li>
                <li><Link href='/course-reviews'>Reviews</Link></li>
                <li><Link target='_blank' href='mailto:support@next-verse.net'>Help</Link></li>
            </ul>}
            {admin && <ul>
                <li><Link href='/admin/chapters' className={cn(path.startsWith('/admin/chapters') && 'text-foreground')}>Chapters</Link></li>
                <li><Link href='/admin/lessons' className={cn(path.startsWith('/admin/lessons') && 'text-foreground')}>Lessons</Link></li>
                <li><Link href='/admin/subscriptions' className={cn(path.startsWith('/admin/subscriptions') && 'text-foreground')}>Subscriptions</Link></li>
            </ul>}
        </div>}
        <header className='nav nav-border'>
            <nav>
                <button onClick={toggleMenu} type='submit'>{menu ? <RiCloseLine /> : <RiMenu5Fill />}</button>
                <h1><Link href='/'>NextVerse</Link></h1>
                {!admin && <ul>
                    <li><Link href='/twitter'>Twitter</Link></li>
                    <li><Link href='/discord'>Discord</Link></li>
                    <li><Link href='/course-reviews'>Reviews</Link></li>
                    <li><Link target='_blank' href='mailto:support@next-verse.net'>Help</Link></li>
                </ul>}
                {admin && <ul>
                    <li><Link href='/admin/chapters' className={cn(path.startsWith('/admin/chapters') && 'text-foreground')}>Chapters</Link></li>
                    <li><Link href='/admin/lessons' className={cn(path.startsWith('/admin/lessons') && 'text-foreground')}>Lessons</Link></li>
                    <li><Link href='/admin/subscriptions' className={cn(path.startsWith('/admin/subscriptions') && 'text-foreground')}>Subscriptions</Link></li>
                </ul>}
                <div className='nav-links'>
                    <ModeToggle />
                    <UserAccountNav user={user} />
                </div>
            </nav>
        </header>
    </div>)
}
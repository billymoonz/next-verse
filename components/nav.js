'use client';

import React from 'react';

import Link from 'next/link';

import { useTheme } from "next-themes"
import { ModeToggle } from './mode-toggle';

import { RiMenu5Fill, RiCloseLine } from 'react-icons/ri';

import { signOut } from 'next-auth/react';

import { buttonVariants } from './ui/button';
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
    const { theme, setTheme } = useTheme();

    const [menu, setMenu] = React.useState(false);
    const [dropdown, setDropdown] = React.useState(false);

    React.useEffect(() => {
        const onClickEvent = () => {
            setMenu(previousValue => {
                if (previousValue) {
                    return false;
                }
                return previousValue;
            })
            setDropdown(previousValue => {
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

    const toggleDropdown = () => {
        if (dropdown) {
            setDropdown(false);
        } else {
            setTimeout(() => {
                setDropdown(true);
            }, 10);
        }
    }

    return (<div>
        {menu && <div className='home-nav-menu'>
            <ul>
                <li><Link href='/twitter'>Twitter</Link></li>
                <li><Link href='/discord'>Discord</Link></li>
                <li><Link href='/course-reviews'>Reviews</Link></li>
                <li><Link target='_blank' href='mailto:support@next-verse.net'>Help</Link></li>
            </ul>
        </div>}
        {dropdown && <div className='home-nav-dropdown'>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <ul>
                <li><Link href='/course/dashboard'>Dashboard</Link></li>
                <li><Link href='/course/favourites'>Favourites</Link></li>
                <li><Link href='/course/billing'>Subscription</Link></li>
            </ul>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? 'Dark Theme' : 'Light Theme'}</button>
            <div />
            <button onClick={() => signOut()}>Sign Out</button>
        </div>}
        <header className='home-nav'>
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
                    <button className='home-nav-links-menu' onClick={toggleDropdown}>Menu</button>
                </div>
            </nav>
        </header>
    </div>)
}
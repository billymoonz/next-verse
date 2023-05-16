'use client';

import React from 'react';

import Link from 'next/link';

import {useTheme} from "@/hooks/theme";

import {RiMenu5Fill, RiCloseLine} from 'react-icons/ri';
import {BsSun, BsMoon} from 'react-icons/bs';

import '@/styles/components/navigation/nav.scss';

export function Nav() {
    const {theme, setTheme} = useTheme();

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
                <li><Link href='/contact-us'>Contact Us</Link></li>
            </ul>
            <Link className='home-nav-menu-login' href='/login'>Login</Link>
        </div>}
        <header className='home-nav'>
            <nav>
                <button onClick={toggleMenu} type='submit'>{menu ? <RiCloseLine/> : <RiMenu5Fill/>}</button>
                <h1><Link href='/'>NextVerse</Link></h1>
                <ul>
                    <li><Link href='/what-to-expect'>What to expect</Link></li>
                    <li><Link href='/news-letter'>News Letter</Link></li>
                    <li><Link href='/pricing'>Pricing</Link></li>
                    <li><Link href='/contact-us'>Contact Us</Link></li>
                </ul>
                <div className='home-nav-links'>
                    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ?
                        <BsMoon/> : <BsSun/>}</button>
                    <Link href='/login'>Login</Link>
                </div>
            </nav>
        </header>
    </div>)
}
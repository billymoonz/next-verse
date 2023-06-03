import '@/styles/globals.scss'
import '@/styles/main.scss';

import { ThemeProvider } from "@/hooks/theme";

export const metadata = {
    title: {
        default: 'NextVerse',
        template: 'NextVerse • %s'
    },
    description: 'NextVerse is your gateway to mastering Next.js, the powerful framework for building dynamic web applications. Join our comprehensive course and unlock the full potential of Next.js. Learn cutting-edge techniques, harness the latest features, and build stunning web experiences. Take your web development skills to the next level with NextVerse today.',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    authors: [
        {
            name: "Billy Mooney",
            url: "https://billymoonz.org",
        },
    ],
    creator: "Billy Mooney",
}

export default function Layout({ children }) {
    return (
        <html lang="en">
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </html>
    )
}

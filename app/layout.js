import '@/styles/globals.css'
import '@/styles/main.scss';

import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

import { ThemeProvider } from "@/hooks/theme";
import { cn } from '@/libs/utils';

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

const fontHeading = localFont({
    src: "../fonts/CalSans-SemiBold.woff2",
    variable: "--font-heading",
})

export const metadata = {
    title: {
        default: 'NextVerse',
        template: 'NextVerse • %s'
    },
    description: 'NextVerse is your gateway to mastering Next.js, the powerful framework for building dynamic web applications. Join our comprehensive course and unlock the full potential of Next.js. Learn cutting-edge techniques, harness the latest features, and build stunning web experiences. Take your web development skills to the next level with NextVerse today.',
    keywords: [
        "Next.js",
        "React",
        "Server Components",
        "Components",
        "Course",
    ],
    creator: 'Billy Moonz',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    authors: [
        {
            name: "Billy Moonz",
            url: "https://billymoonz.org",
        },
    ],
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    }
}

export default function Layout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable,
                    fontHeading.variable
                )}
            >
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}

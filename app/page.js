'use client'

import Link from 'next/link'

import { Nav } from '@/components/nav';
import { cn } from '@/libs/utils';
import { buttonVariants } from '@/components/ui/button';

import '@/styles/pages/home.scss';

export default function Home() {
  return (<div>
    <Nav />
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <Link
          href={'https://github.com/billymoonz/next-verse'}
          className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          target="_blank"
        >
          Source Code available on Github
        </Link>
        <h1 className="max-w-[64rem] font-bold font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Embark on a Journey to Next.js Mastery
        </h1>
        <p className="max-w-[50rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Unlock the Power of Next.js and Build Stunning Web Applications with Ease
        </p>
        <div className="space-x-4">
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
        </div>
      </div>
    </section>
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Get in Touch with Us
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Reach Out to Us for Inquiries, Support, or Collaboration Opportunities        </p>
        <div className="space-x-4">
          <Link className={cn(buttonVariants({ size: 'lg' }))} target='_blank' href='mailto:contact@next-verse.net'>Get In Touch</Link>
        </div>
      </div>
    </section>
  </div>)
}
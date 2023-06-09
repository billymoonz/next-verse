import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/libs/utils';

import Link from 'next/link';

export const metadata = {
    title: 'Pricing',
    description: "Explore the pricing options for NextVerse, an open-source Next.js course. Choose the subscription plan that suits your learning needs and gain access to premium content, live sessions, and comprehensive progress tracking. Empower yourself as a developer with NextVerse's affordable and flexible pricing options.",
    keywords: [
        "NextVerse", "pricing", "subscription plans", "open-source course", "Next.js", "premium content", "live sessions", "progress tracking", "developer", "affordable pricing", "flexible plans"
    ]
}

export default async function PricingPage() {
    return (<div>
        <section className="container w-full flex flex-col gap-6 py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
                <h2 className="font-bold font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Simple, transparent pricing
                </h2>
            </div>
            <div className="grid w-full max-w-[1000px] mx-auto items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
                <div className="grid gap-6">
                    <h3 className="text-xl font-bold sm:text-2xl">
                        What&apos;s included in the subscription plan
                    </h3>
                    <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> All Chapters
                        </li>
                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> All Chapter Lessons
                        </li>

                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> Quizzes
                        </li>
                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> Course Progress Bar
                        </li>
                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> Access to Discord
                        </li>
                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> Premium Support
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4 text-center">
                    <div>
                        <h4 className="text-7xl font-bold">£10</h4>
                        <p className="text-sm font-medium text-muted-foreground">
                            Billed Monthly
                        </p>
                    </div>
                    <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    </div>)
}
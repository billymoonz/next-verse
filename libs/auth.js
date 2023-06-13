import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { database } from '@/libs/db';
import { resend } from '@/libs/resend';

const db = database();

export const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        EmailProvider({
            from: 'noreply@billymoonz.org',
            sendVerificationRequest: async ({ identifier, url, provider }) => {
                const user = await db.user.findUnique({
                    where: {
                        email: identifier,
                    },
                    select: {
                        emailVerified: true,
                    },
                })

                const verified = user?.emailVerified;

                try {
                    await resend().sendEmail({
                        to: identifier,
                        from: provider.from,
                        subject: verified ? 'Sign In' : 'Activate Account',
                        html: verified ?
                            `<h1>Welcome back!</h1><p>Click <a href="${url}">here</a> to sign in!</p>`
                            :
                            `<h1>Welcome to NextVerse!</h1><p>Click <a href="${url}">here</a> to activate account!</p>`
                    });
                } catch (e) {
                    console.log(e)
                    throw new Error('Resend failed to send email!')
                }
            },
        }),
    ],
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/',
        newUser: '/course/billing'
    },
    callbacks: {
        async session({ session, token, user }) {
            let result = { ...session };
            result.user = { id: user.id, name: user.name, email: user.email, image: user.image, joinedAt: user.createdAt, updatedAt: user.updatedAt, admin: user.admin }
            return result;
        }
    }
}
import GithubProvider from "next-auth/providers/github"
import {PrismaAdapter} from "@auth/prisma-adapter";

import { database } from './db';

const db = database();

export const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/'
    }
}
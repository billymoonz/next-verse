import { FavoriteList } from "@/components/favorites";
import { getUserFavorites } from "@/libs/course-actions"

import { redirect } from "next/navigation";

export const metadata = {
    title: 'Favorites'
}

export default async function Favorites() {
    const favorites = await getUserFavorites();

    if (!favorites) {
        redirect('/course/dashboard');
    }

    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Favorites</h1>
        <p className="text-lg text-muted-foreground">Add lessons to favorites for ease of access.</p>
        <FavoriteList array={favorites}/>
    </div>)
}
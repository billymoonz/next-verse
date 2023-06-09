import { FavoritesSkeleton } from "@/components/favorites";

export default function FavoritesLoading(){
    return (<div>
        <h1 className="font-bold text-3xl md:text-4xl">Favorites</h1>
        <p className="text-lg text-muted-foreground">Add lessons to favorites for ease of access.</p>
        <FavoritesSkeleton/>
    </div>)
}
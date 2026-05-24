import { CountryCard } from "@/components/CountryCard";
import { GoBackButton } from "@/components/GoBackButton";
import { useFavourites } from "@/contexts/FavouritesContext";

export function FavouriteCountriesPage() {
    const { favourites } = useFavourites();

    return (
        <div className="grid gap-4">
            <GoBackButton />
            {favourites.map((fav) =>
                <CountryCard country={fav} key={fav.cca3} />
            )}
        </div>
    )
}
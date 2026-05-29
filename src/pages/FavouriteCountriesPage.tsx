import { CountryCard } from "@/components/CountryCard";
import { GoBackButton } from "@/components/GoBackButton";
import { useFavourites } from "@/contexts/FavouritesContext";

export function FavouriteCountriesPage() {
    const { favourites } = useFavourites();

    if (favourites.length === 0) {
        return (
            <div>
                <GoBackButton />
                <div className="fallback -z-10">No countries added to favourites.</div>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            <GoBackButton />
            {favourites.map((fav) =>
                <CountryCard country={fav} key={fav.cca3} />
            )}
        </div>
    )
}
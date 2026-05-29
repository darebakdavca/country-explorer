import type { Country } from "@/types/country.types"
import { createContext, useContext, useState, type ReactNode } from "react"


type FavouritesContextType = {
    favourites: Country[];
    addToFavourites: (country: Country) => void;
    removeFromFavourites: (country: Country) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavourtesProvider = ({ children }: { children: ReactNode }) => {
    const [favourites, setFavourites] = useState<Country[]>([]);

    const addToFavourites = (country: Country) => {
        setFavourites((prev) => [...prev, country])
    }

    const removeFromFavourites = (myCountry: Country) => {
        setFavourites((prev) => prev.filter(country => country !== myCountry))
    }

    return (
        <FavouritesContext.Provider value={{ favourites, addToFavourites, removeFromFavourites }}>
            {children}
        </FavouritesContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavourites() {
    const context = useContext(FavouritesContext);

    if (!context) throw new Error('useFavouries hook must be used within ContriesProvider.')

    return context;
}
import { fetchCountries } from "@/api/countriesApi";
import type { Country } from "@/types/country.types"
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type CountriesContextType = {
    countries: Country[];
    isLoading: boolean;
    isError: boolean;
}

const CountriesContext = createContext<CountriesContextType | undefined>(undefined);

export const CountriesProvider = ({ children }: { children: ReactNode }) => {
    const { data: serverCountries, isLoading, isError } = useQuery({ queryKey: ["countries"], queryFn: fetchCountries })

    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        if (serverCountries) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCountries(serverCountries)
        }
    }, [serverCountries]);
    return (
        <CountriesContext.Provider value={{ countries, isError, isLoading }}>
            {children}
        </CountriesContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCountries() {
    const context = useContext(CountriesContext);

    if (!context) throw new Error('useCountries hook must be used within ContriesProvider.')

    return context;
}
import { fetchCountries } from "@/api/countriesApi";
import type { Country } from "@/types/country.types"
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type RegionType = Country['region'] | 'all';

type CountriesContextType = {
    countries: Country[];
    isLoading: boolean;
    isError: boolean;
    regions: Country['region'][];
    countryName: string;
    selectedRegion: RegionType;
    filterByName: (name: string) => void;
    filterByRegion: (region: RegionType) => void;
}

const CountriesContext = createContext<CountriesContextType | undefined>(undefined);

export const CountriesProvider = ({ children }: { children: ReactNode }) => {
    const { data: serverCountries, isLoading, isError } = useQuery({ queryKey: ["countries"], queryFn: fetchCountries })

    const [selectedRegion, setSelectedRegion] = useState<RegionType>('all');
    const [countryName, setCountryName] = useState('');

    const allCountries = useMemo(() => serverCountries ?? [], [serverCountries]);

    const regions = useMemo(() => {
        return [...new Set(allCountries.map((country) => country.region))].sort();
    }, [allCountries])

    const countries = useMemo(() => {
        const normalizedCountryName = countryName.trim().toLowerCase();

        return allCountries.filter((country) => {
            const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
            const matchesName = normalizedCountryName === ''
                || country.name.common.toLowerCase().includes(normalizedCountryName);

            return matchesRegion && matchesName;
        });
    }, [allCountries, countryName, selectedRegion])

    const filterByName = (name: string) => {
        setCountryName(name)
    }

    const filterByRegion = (region: RegionType) => {
        setSelectedRegion(region)
    }

    return (
        <CountriesContext.Provider value={{ countries, isError, isLoading, regions, countryName, selectedRegion, filterByName, filterByRegion }}>
            {children}
        </CountriesContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCountries() {
    const context = useContext(CountriesContext);

    if (!context) throw new Error('useCountries hook must be used within CountriesProvider.')

    return context;
}

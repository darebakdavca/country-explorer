import { fetchCountries } from "@/api/countriesApi";
import type { Country } from "@/types/country.types"
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type RegionType = Country['region'] | 'all';
export type SortDirectionType = 'ascending' | 'descending' | 'natural';
export type SortFilterType = 'name' | 'population' | 'area'

export type SortConfig = {
    filter: SortFilterType,
    direction: SortDirectionType
}

type CountriesContextType = {
    countries: Country[];
    isLoading: boolean;
    isError: boolean;
    regions: Country['region'][];
    countryName: string;
    selectedRegion: RegionType;
    sortConfig: SortConfig;
    filterByName: (name: string) => void;
    filterByRegion: (region: RegionType) => void;
    sortBy: (filter: SortFilterType, direction: SortDirectionType) => void;
}

const CountriesContext = createContext<CountriesContextType | undefined>(undefined);

export const CountriesProvider = ({ children }: { children: ReactNode }) => {
    const { data: serverCountries, isLoading, isError } = useQuery({ queryKey: ["countries"], queryFn: fetchCountries })

    const [selectedRegion, setSelectedRegion] = useState<RegionType>('all');
    const [countryName, setCountryName] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        filter: 'name',
        direction: 'natural',
    })

    const allCountries = useMemo(() => serverCountries ?? [], [serverCountries]);

    const regions = useMemo(() => {
        return [...new Set(allCountries.map((country) => country.region))].sort();
    }, [allCountries])

    const countries = useMemo(() => {
        const normalizedCountryName = countryName.trim().toLowerCase();

        const filteredCountries = allCountries.filter((country) => {
            const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
            const matchesName = normalizedCountryName === ''
                || country.name.common.toLowerCase().includes(normalizedCountryName);

            return matchesRegion && matchesName;
        });

        if (sortConfig.direction === 'natural') {
            return filteredCountries;
        }

        return [...filteredCountries].sort((countryA, countryB) => {
            const directionModifier = sortConfig.direction === 'ascending' ? 1 : -1;

            if (sortConfig.filter === 'name') {
                return countryA.name.common.localeCompare(countryB.name.common) * directionModifier;
            }

            return (countryA[sortConfig.filter] - countryB[sortConfig.filter]) * directionModifier;
        });
    }, [allCountries, countryName, selectedRegion, sortConfig])

    const filterByName = (name: string) => {
        setCountryName(name)
    }

    const filterByRegion = (region: RegionType) => {
        setSelectedRegion(region)
    }

    const sortBy = (filter: SortFilterType, direction: SortDirectionType) => {
        setSortConfig({ filter, direction })
    }


    return (
        <CountriesContext.Provider value={{ countries, isError, isLoading, regions, countryName, selectedRegion, sortConfig, filterByName, filterByRegion, sortBy }}>
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

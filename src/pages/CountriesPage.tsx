import { CountriesFilter } from "@/components/CountriesFilter";
import { CountryCard } from "@/components/CountryCard";
import { useCountries } from "@/contexts/CountriesContext"


export function CountriesPage() {
    const { countries, isLoading, isError } = useCountries();

    if (isLoading) return <div>načítám</div>
    if (isError) return <div>chyba</div>


    return (
        <>
            <CountriesFilter />
            <div>
                <span className="text-sm text-muted-foreground">
                    {countries.length} countries found
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {countries && countries.map((country) => {
                        return <CountryCard key={country.cca3} country={country} />
                    })}
                </div>
            </div>
        </>
    )
}

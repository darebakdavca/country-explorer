import { BookmarkButton } from "@/components/BookmarkButton";
import { GoBackButton } from "@/components/GoBackButton";
import { useCountries } from "@/contexts/CountriesContext"
import { useParams } from "react-router";

export function CountryDetailPage() {
    const { slug } = useParams();
    const code = slug?.split("-").at(-1);
    const placeholderFlagSrc = `${import.meta.env.BASE_URL}placeholder_flag.png`;

    const { countries, isLoading, isError } = useCountries();

    const country = countries.find((country) => country.cca3 === code)

    const capital = country?.capital?.join(", ") || "No capital";
    const languages = country?.languages ? Object.values(country.languages).join(", ") : "No languages listed";
    const currencies = country?.currencies
        ? Object.values(country.currencies).map((currency) => currency.symbol ? `${currency.name} (${currency.symbol})` : currency.name).join(", ")
        : "No currencies listed";

    if (isLoading) return <div className="fallback">Loading country...</div>
    if (isError) return <div className="fallback text-red-500">Error fetching country</div>
    if (!country) return <div className="fallback">Country not found</div>

    return (
        <div>
            <GoBackButton />
            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
                <div className="grid content-start gap-6">
                    <div className="flex gap-4 justify-between items-center">
                        <div className="text-5xl font-semibold">
                            {country.name.common}
                        </div>
                        <BookmarkButton className="size-10" country={country} />
                    </div>
                    <dl className="grid gap-3 text-base">
                        <div className="flex justify-between gap-4 border-b border-border pb-2">
                            <dt className="text-muted-foreground">Capital</dt>
                            <dd className="text-right">{capital}</dd>
                        </div>
                        <div className="flex justify-between gap-4 border-b border-border pb-2">
                            <dt className="text-muted-foreground">Region</dt>
                            <dd className="text-right">{country.region}</dd>
                        </div>
                        {country.subregion && (
                            <div className="flex justify-between gap-4 border-b border-border pb-2">
                                <dt className="text-muted-foreground">Subregion</dt>
                                <dd className="text-right">{country.subregion}</dd>
                            </div>
                        )}
                        <div className="flex justify-between gap-4 border-b border-border pb-2">
                            <dt className="text-muted-foreground">Population</dt>
                            <dd className="text-right">{country.population.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between gap-4 border-b border-border pb-2">
                            <dt className="text-muted-foreground">Area</dt>
                            <dd className="text-right">{country.area.toLocaleString()} km2</dd>
                        </div>
                        <div className="flex justify-between gap-4 border-b border-border pb-2">
                            <dt className="text-muted-foreground">Languages</dt>
                            <dd className="text-right">{languages}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                            <dt className="text-muted-foreground">Currencies</dt>
                            <dd className="text-right">{currencies}</dd>
                        </div>
                    </dl>
                </div>
                <div className="grid gap-4">
                    <img
                        src={country.flags.svg || country.flags.png || placeholderFlagSrc}
                        alt={country.flags.alt || `${country.name.common} flag`}
                        className="w-full max-h-105 rounded-3xl bg-secondary object-contain p-6"
                    />
                </div>
            </div>
        </div>
    )
}

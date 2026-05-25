import { BookmarkButton } from "@/components/BookmarkButton";
import type { Country } from "@/types/country.types";
import { NavLink } from "react-router";

export function CountryCard({ country }: { country: Country }) {
    const capital = country.capital?.join(", ") ?? "No capital"

    return (
        <NavLink to={`/${country.name.common}`}>
            <article className="bg-secondary overflow-hidden rounded-3xl p-6 grid gap-8  ring ring-transparent cursor-pointer hover:ring-primary hover:-translate-y-0.5 duration-200" key={country.cca3}>
                <div className="flex gap-4 justify-between">
                    <span className="text-2xl font-semibold">
                        {country.name.common}
                    </span>
                    <BookmarkButton country={country} />
                </div>
                <div className="flex justify-between gap-2">
                    <div className="grid gap-1 text-sm">
                        <div className="flex gap-1">
                            <p className="text-muted-foreground">Capital:</p>
                            <p className="">
                                {capital}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-muted-foreground">Region:</p>
                            <p className="">
                                {country.region}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <img src={country.flags.svg ? country.flags.svg : country.flags.png ? country.flags.png : country.flags.svg} alt={country.flags.alt} className="h-10" />
                    </div>
                </div>
            </article >
        </NavLink>
    );
}
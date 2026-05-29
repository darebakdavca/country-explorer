import { BookmarkButton } from "@/components/BookmarkButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCountries } from "@/contexts/CountriesContext";
import type { Country } from "@/types/country.types";
import type { Ref } from "react";
import { IoIosPeople } from "react-icons/io";
import { IoResize } from "react-icons/io5";
import { NavLink, type NavLinkProps } from "react-router";

import slugify from 'slugify'


type CardContentProps = Omit<NavLinkProps, "to"> & {
    country: Country
    ref?: Ref<HTMLAnchorElement>
}

function CardContent({ country, ref, ...props }: CardContentProps) {
    const capital = country.capital?.length
        ? country.capital.join(", ")
        : <span className="italic text-muted-foreground">No capital</span>
    const placeholderFlagSrc = `${import.meta.env.BASE_URL}placeholder_flag.png`;

    return (
        <NavLink ref={ref} to={`/country/${slugify(country.name.common)}-${country.cca3}`} {...props}>
            <article className="bg-secondary overflow-hidden rounded-3xl grow p-6 grid gap-8  ring ring-transparent cursor-pointer hover:ring-primary hover:-translate-y-0.5 duration-200" key={country.cca3}>
                <div className="flex gap-4 justify-between">
                    <span className="text-2xl font-semibold text-start">
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
                        <img src={country.flags.svg ? country.flags.svg : country.flags.png ? country.flags.png : placeholderFlagSrc} alt={country.flags.alt} className="h-10" />
                    </div>
                </div>
            </article >
        </NavLink>
    );
}

CardContent.displayName = "CardContent";

export function CountryCard({ country }: { country: Country }) {
    const { sortConfig } = useCountries();
    const isFilteringByPopulationOrArea = sortConfig.direction !== 'natural' && (sortConfig.filter === 'area' || sortConfig.filter === 'population');
    const sortedValueLabel = sortConfig.filter === 'area' ? 'Area' : 'Population';
    const sortedValueIcon = sortConfig.filter === 'area' ? <IoResize className="size-6" /> : <IoIosPeople className="size-6" />
    const sortedValue = sortConfig.filter === 'area'
        ? `${country.area.toLocaleString()} km2`
        : country.population.toLocaleString();

    if (isFilteringByPopulationOrArea) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <CardContent country={country} />
                </TooltipTrigger>
                <TooltipContent className="text-base">
                    {sortedValueIcon} {sortedValueLabel}: {sortedValue}
                </TooltipContent>
            </Tooltip>
        );
    } else {
        return <CardContent country={country} />
    }
}

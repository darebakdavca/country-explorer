import { BookmarkButton } from '@/components/BookmarkButton';
import { TooltipProvider } from '@/components/ui/tooltip';
import { FavouritesProvider } from '@/contexts/FavouritesContext';
import type { Country } from '@/types/country.types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

const country: Country = {
    cca3: "CZE",
    name: {
        common: "Czechia",
        official: "Czech Republic",
        nativeName: {},
    },
    capital: ["Prague"],
    region: "Europe",
    subregion: "Central Europe",
    population: 10_500_000,
    area: 78_865,
    flags: {
        png: "https://flagcdn.com/w320/cz.png",
        svg: "https://flagcdn.com/cz.svg",
        alt: "The flag of Czechia.",
    },
    languages: {
        ces: "Czech",
    },
    currencies: {
        CZK: {
            name: "Czech koruna",
            symbol: "Kč",
        },
    },
}

describe('BookmarkButton', () => {
    it("adds and removes a country from favourites when clicked", async () => {
        const user = userEvent.setup();

        render(
            <TooltipProvider>
                <FavouritesProvider>
                    <BookmarkButton country={country} />
                </FavouritesProvider>
            </TooltipProvider>
        );

        const addButton = screen.getByRole("button", {
            name: /add to favourites/i,
        });

        await user.click(addButton);

        const removeButton = screen.getByRole('button', {
            name: /remove from favourites/i,
        })

        expect(removeButton).toBeInTheDocument();

        await user.click(removeButton);

        expect(
            screen.getByRole('button', {
                name: /add to favourites/i,
            })
        ).toBeInTheDocument();
    })
})
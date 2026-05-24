import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useFavourites } from "@/contexts/FavouritesContext";
import { cn } from "@/lib/utils";
import type { Country } from "@/types/country.types";
import { StarIcon } from "@heroicons/react/24/outline";

export function BookmarkButton({ country }: { country: Country }) {
    const { favourites, addToFavourites, removeFromFavourites } = useFavourites();

    const isInFavourites = favourites.some((fav) => fav.cca3 === country.cca3)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (isInFavourites) {
            removeFromFavourites(country)
        } else {
            addToFavourites(country);
        }
    }

    return (
        <div className="h-full items-center justify-center flex">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button className="px-0" variant={'ghost'} onClick={handleClick}>
                        <StarIcon className={cn("size-6", { 'fill-white': isInFavourites })} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    {isInFavourites ? 'Remove from favourites' : 'Add to favourites'}
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
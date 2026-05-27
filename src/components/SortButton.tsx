import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type SortDirectionType, type SortFilterType, useCountries } from "@/contexts/CountriesContext";
import { type ReactNode } from "react";
import { LuArrowDown, LuArrowDownUp, LuArrowUp } from "react-icons/lu";

interface SortButtonProps {
    children: ReactNode,
    variant: 'number' | 'letter',
    sortFilter: SortFilterType
}

export function SortButton({ children, sortFilter }: SortButtonProps) {
    const { sortBy, sortConfig } = useCountries();

    const sortDirections: SortDirectionType[] = ['natural', 'ascending', 'descending'];
    const isActiveSort = sortConfig.filter === sortFilter;
    const sortDirection = isActiveSort ? sortConfig.direction : 'natural';

    const tooltipLabel = sortDirection === 'natural' ? `Sort ascending by ${sortFilter}` : sortDirection === 'ascending' ? `Sort descending by ${sortFilter}` : 'Reset sort';

    const handleClick = () => {
        const currentIndex = sortDirections.indexOf(sortDirection);
        const nextDirection = currentIndex !== 2 ? sortDirections[currentIndex + 1] : sortDirections[0];

        sortBy(sortFilter, nextDirection);
    }

    const mutedClass = 'text-muted-foreground';

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={'secondary'} onClick={handleClick} className={isActiveSort && sortDirection !== 'natural' ? 'border-primary' : ''}>
                    {sortDirection === 'natural' ?
                        <LuArrowDownUp className={mutedClass} /> : sortDirection === 'ascending' ? <LuArrowUp className={mutedClass} /> : <LuArrowDown className={mutedClass} />
                    }
                    {children}
                </Button>
            </TooltipTrigger >
            <TooltipContent>
                {tooltipLabel}
            </TooltipContent>
        </Tooltip>

    );
}

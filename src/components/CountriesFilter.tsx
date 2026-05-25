import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type RegionType, useCountries } from "@/contexts/CountriesContext";

export function CountriesFilter() {
    const { regions, countryName, selectedRegion, filterByName, filterByRegion } = useCountries();

    return (
        <div className="grid gap-2">
            <span className="text-muted-foreground">
                Filter by:
            </span>
            <div className="gap-2 flex items-center justify-start">
                <Input
                    className="grow-0 w-80"
                    value={countryName}
                    onChange={(event) => filterByName(event.target.value)}
                    placeholder="Country name"
                />
                <Select value={selectedRegion ?? ''} onValueChange={(value) => {
                    filterByRegion(value as RegionType)
                }}
                >
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder={'Region'} />
                            </SelectTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            Region
                        </TooltipContent>
                    </Tooltip>
                    <SelectContent position="popper">
                        <SelectItem value={"all"}>All</SelectItem>
                        {regions.map((rg) =>
                            <SelectItem value={rg} key={rg}>
                                {rg}
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

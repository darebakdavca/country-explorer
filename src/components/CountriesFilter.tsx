import { SortButton } from "@/components/SortButton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type RegionType, useCountries } from "@/contexts/CountriesContext";
import { FaXmark } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { IoResize } from "react-icons/io5";

export function CountriesFilter() {
    const { regions, countryName, selectedRegion, filterByName, filterByRegion } = useCountries();

    return (
        <div className="grid gap-2">
            <span className="text-muted-foreground">
                Filter by:
            </span>
            <div className="flex justify-between items-center gap-2">
                <div className="gap-2 flex items-center justify-start">
                    <div className="relative w-80">
                        <Input
                            className="pr-9"
                            value={countryName}
                            onChange={(event) => filterByName(event.target.value)}
                            placeholder="Country name"
                            type="text"
                        />
                        {countryName && (
                            <button
                                type="button"
                                className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => filterByName("")}
                            >
                                <FaXmark />
                            </button>
                        )}
                    </div>
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
                <div className="flex items-center justify-end gap-2">
                    <SortButton variant={'letter'} sortFilter={"name"} >
                        AZ
                    </SortButton>
                    <SortButton variant={'number'} sortFilter={'population'}>
                        <IoIosPeople className="size-5" />
                    </SortButton>
                    <SortButton variant={'number'} sortFilter={'area'}>
                        <IoResize className="size-5" />
                    </SortButton>
                </div>
            </div>
        </div>
    );
}

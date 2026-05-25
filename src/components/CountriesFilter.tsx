import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type RegionType, useCountries } from "@/contexts/CountriesContext";

export function CountriesFilter() {
    const { regions, countryName, selectedRegion, filterByName, filterByRegion } = useCountries();

    return (
        <div className="grid gap-2">
            <span className="text-muted-foreground">
                Filter by:
            </span>
            <div className="grid grid-rows-1 grid-cols-12 gap-2">
                <Input
                    className="col-span-4"
                    value={countryName}
                    onChange={(event) => filterByName(event.target.value)}
                    placeholder="Country name"
                />
                <Select value={selectedRegion ?? ''} onValueChange={(value) => {
                    filterByRegion(value as RegionType)
                }}>
                    <SelectTrigger className="">
                        <SelectValue placeholder={'Region'} />
                    </SelectTrigger>
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

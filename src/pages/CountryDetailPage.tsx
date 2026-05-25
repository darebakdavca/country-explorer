import { GoBackButton } from "@/components/GoBackButton";
import { useCountries } from "@/contexts/CountriesContext"
import { useParams } from "react-router";

export function CountryDetailPage() {
    const { name } = useParams();
    const { countries } = useCountries();


    const country = countries.filter((country) => country.name.common === name)[0]

    console.log(country)

    // TODO: finish
    return (
        <div>
            <GoBackButton />
            {country.name.common}
            {country.region}
        </div>
    )
}
import type { RegionType, SortConfig } from "@/contexts/CountriesContext"
import type { Country } from "@/types/country.types"

export function filterAndSortCountries(
  countries: Country[],
  countryName: string,
  selectedRegion: RegionType,
  sortConfig: SortConfig
) {
  const normalizedCountryName = countryName.trim().toLowerCase()

  const filteredCountries = countries.filter((country) => {
    const matchesRegion =
      selectedRegion === "all" || country.region === selectedRegion
    const matchesName =
      normalizedCountryName === "" ||
      country.name.common.toLowerCase().includes(normalizedCountryName)

    return matchesRegion && matchesName
  })

  if (sortConfig.direction === "natural") {
    return filteredCountries
  }

  return [...filteredCountries].sort((countryA, countryB) => {
    const directionModifier = sortConfig.direction === "ascending" ? 1 : -1

    if (sortConfig.filter === "name") {
      return (
        countryA.name.common.localeCompare(countryB.name.common) *
        directionModifier
      )
    }

    return (
      (countryA[sortConfig.filter] - countryB[sortConfig.filter]) *
      directionModifier
    )
  })
}

import type { Country } from "@/types/country.types"

const API_URL = "https://restcountries.com/v3.1"

const COUNTRY_FIELDS = [
  "cca3",
  "name",
  "capital",
  "region",
  "subregion",
  "population",
  "area",
  "flags",
  "languages",
  "currencies",
].join(",")

export async function fetchCountries(): Promise<Country[]> {
  const response = await fetch(`${API_URL}/all?fields=${COUNTRY_FIELDS}`)

  if (!response.ok) {
    throw new Error("Failed to fetch countries")
  }

  return response.json()
}

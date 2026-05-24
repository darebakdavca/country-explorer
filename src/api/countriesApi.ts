import type { Country } from "@/types/country.types"

const API_URL = import.meta.env.VITE_COUNTRY_API_URL
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

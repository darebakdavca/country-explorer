import { describe, expect, it } from "vitest"
import { filterAndSortCountries } from "@/lib/countryFilters"

const countries = [
  {
    cca3: "CZE",
    name: { common: "Czechia", official: "Czech Republic", nativeName: {} },
    region: "Europe",
    population: 10_500_000,
    area: 78_865,
    flags: { png: "", svg: "" },
  },
  {
    cca3: "JPN",
    name: { common: "Japan", official: "Japan", nativeName: {} },
    region: "Asia",
    population: 125_000_000,
    area: 377_975,
    flags: { png: "", svg: "" },
  },
  {
    cca3: "KOR",
    name: {
      common: "South Korea",
      official: "Republic of Korea",
      nativeName: {},
    },
    region: "Asia",
    population: 51_700_000,
    area: 100_210,
    flags: { png: "", svg: "" },
  },
]

describe("filterAndSortCountries", () => {
  it("filters countries by region and sorts the by population descending", () => {
    const result = filterAndSortCountries(countries, "", "Asia", {
      filter: "population",
      direction: "descending",
    })

    expect(result.map((country) => country.name.common)).toEqual([
      "Japan",
      "South Korea",
    ])
  })

  it("filters countries by region and sorts the by population ascending", () => {
    const result = filterAndSortCountries(countries, "", "Asia", {
      filter: "population",
      direction: "ascending",
    })

    expect(result.map((country) => country.name.common)).toEqual([
      "South Korea",
      "Japan",
    ])
  })

  it("filters by all regions and sorts by name ascending", () => {
    const result = filterAndSortCountries(countries, "", "all", {
      filter: "name",
      direction: "ascending",
    })

    expect(result.map((country) => country.name.common)).toEqual([
      "Czechia",
      "Japan",
      "South Korea",
    ])
  })

  it("filters by all regions and sorts by area descending", () => {
    const result = filterAndSortCountries(countries, "", "all", {
      filter: "area",
      direction: "descending",
    })

    expect(result.map((country) => country.name.common)).toEqual([
      "Japan",
      "South Korea",
      "Czechia",
    ])
  })

  it("returns nothing for region 'Americas'", () => {
    const result = filterAndSortCountries(countries, "", "Americas", {
      filter: "name",
      direction: "natural",
    })

    expect(result.map((country) => country.name.common)).toEqual([])
  })
})

export type Country = {
  cca3: string // the unique three letter country code
  name: {
    common: string
    official: string
    nativeName: Record<string, CountryNativeName>
  }
  capital?: string[]
  region: string
  subregion?: string
  population: number
  area: number
  flags: CountryFlags
  languages?: Record<string, string>
  currencies?: Record<string, CountryCurrency>
}

export type CountryNativeName = {
  official: string
  common: string
}

export type CountryFlags = {
  png: string
  svg: string
  alt?: string
}

export type CountryCurrency = {
  name: string
  symbol?: string
}

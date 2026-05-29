import { Layout } from "@/layouts/Layout"
import { CountriesPage } from "@/pages/CountriesPage"
import { CountryDetailPage } from "@/pages/CountryDetailPage"
import { FavouriteCountriesPage } from "@/pages/FavouriteCountriesPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { Route, Routes } from "react-router"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CountriesPage />} />
        <Route path="/country/:slug" element={<CountryDetailPage />} />
        <Route path="/favourites" element={<FavouriteCountriesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

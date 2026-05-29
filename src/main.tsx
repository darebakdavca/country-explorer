import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/contexts/theme-provider.tsx"
import { BrowserRouter } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip.tsx"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { CountriesProvider } from "@/contexts/CountriesContext.tsx"
import { FavouritesProvider } from "@/contexts/FavouritesContext.tsx"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <CountriesProvider>
              <FavouritesProvider>
                <App />
              </FavouritesProvider>
            </CountriesProvider>
          </QueryClientProvider>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)

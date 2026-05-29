# Country Explorer

Semestral React project for browsing countries and their basic geographic, demographic, and administrative data.

The application loads data from the REST Countries API, displays countries in a responsive card grid, and allows users to search, filter, sort, open detail pages, switch theme, and maintain an in-memory list of favourite countries.

## Features

- Browse countries in a responsive grid
- Search countries by name
- Filter countries by region
- Sort by name, population, or area
- Open a country detail page with capital, region, subregion, population, area, languages, currencies, and flag
- Add and remove countries from favourites
- Dedicated favourites page
- Light and dark theme support
- Loading, error, and not-found states

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS 4
- shadcn/ui and Radix UI primitives
- REST Countries API

## Project Structure

```text
src/
  api/                 API requests
  components/          Reusable UI components
  layouts/             Page layout
  contexts/            Countries, favourites, and theme providers
  pages/               Route pages
  types/               TypeScript domain types
```

## Routes

| Route            | Description                                   |
| ---------------- | --------------------------------------------- |
| `/`              | Countries overview with filtering and sorting |
| `/country/:slug` | Country detail page                           |
| `/favourites`    | Favourite countries                           |
| `*`              | Not found page                                |

## Requirements

- Node.js
- npm

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_COUNTRY_API_URL=https://restcountries.com/v3.1
```

Start the development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Available Scripts

| Command             | Description                                     |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Start the Vite development server               |
| `npm run build`     | Type-check and build the app                    |
| `npm run preview`   | Preview the production build locally            |
| `npm run lint`      | Run ESLint                                      |
| `npm run typecheck` | Run TypeScript type checking                    |
| `npm run format`    | Format TypeScript and React files with Prettier |

## Data Source

Country data is fetched from the REST Countries API:

```text
GET https://restcountries.com/v3.1/all
```

The request is limited to the fields used by the application: country code, name, capital, region, subregion, population, area, flags, languages, and currencies.

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { useFavourites } from "@/contexts/FavouritesContext";
import { NavLink, Outlet } from "react-router";

export function Layout() {
    const { favourites } = useFavourites();

    return (
        <div className="mx-auto max-w-5xl p-5 grid gap-4">
            <header className="bg-secondary rounded-full p-5 flex justify-between items-center">
                <NavLink to={'/'}>
                    <div className="flex gap-2 items-center">
                        <img src="/src/assets/icon.png" className="w-8 md:w-10 xl:w-12" />
                        <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">Country eplorer</h1>
                    </div>
                </NavLink>
                <div className="flex items-center gap-4">
                    <NavLink to={'/favourites'}>
                        {({ isActive }) =>
                            <Button variant={'link'} className={isActive ? 'underline' : ''}>
                                Favourites
                                {favourites.length > 0 ? ` (${favourites.length})` : ''}
                            </Button>
                        }
                    </NavLink>
                    <ThemeSwitcher />
                </div>
            </header>
            <main>
                <div className="grid gap-4">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
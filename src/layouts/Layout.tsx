import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { useFavourites } from "@/contexts/FavouritesContext";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";

export function Layout() {
    const { favourites } = useFavourites();
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const updateScrolled = () => {
            setHasScrolled(window.scrollY > 0)
        }

        updateScrolled();

        window.addEventListener('scroll', updateScrolled, { passive: true })

        return () => window.removeEventListener('scroll', updateScrolled)
    }, [])

    return (
        <div className="mx-auto grid max-w-5xl xl:max-w-6xl gap-4 px-4">
            <header
                className={`sticky top-0 z-50 py-5 px-4 transition-colors duration-300`}
            >
                <div
                    className={`flex items-center justify-between rounded-full border p-5 transition-colors duration-300 ${hasScrolled
                        ? "bg-background text-white border border-primary shadow-accent shadow-xl"
                        : "bg-secondary/85 border-transparent"
                        }`}
                >
                    <NavLink to={'/'}>
                        <div className="flex gap-2 items-center">
                            <img src={'/icon.png'} className="w-8 md:w-10 xl:w-12" />
                            <h1 className="text-xl md:text-2xl xl:text-3xl font-bold text-foreground">Country explorer</h1>
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
                </div>
            </header >
            <main>
                <div className="grid gap-4 mb-5">
                    <Outlet />
                </div>
            </main>
        </div >
    );
}

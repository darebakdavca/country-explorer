import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Outlet } from "react-router";

export function Layout() {
    return (
        <div className="mx-auto max-w-5xl p-5 grid gap-4">
            <header className="bg-secondary rounded-full p-5 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <img src="/src/assets/icon.png" className="w-12" />
                    <h1 className="text-3xl font-bold">Country eplorer</h1>
                </div>
                <ThemeSwitcher />
            </header>
            <main>
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
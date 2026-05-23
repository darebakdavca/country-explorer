import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-provider";
import { cn } from "@/lib/utils";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (

    <Button className={cn(className)} variant={'outline'} onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      <span className='inline-flex items-center gap-2'>
        {theme === 'dark' ?
          <>
            <MdOutlineWbSunny />
            <span className="hidden md:block">
              Světlý režim
            </span>

          </>
          :
          <>
            <IoMoonOutline />
            <span className="hidden md:block">
              Tmavý režim
            </span>
          </>
        }
      </span>
    </Button>
  );
}
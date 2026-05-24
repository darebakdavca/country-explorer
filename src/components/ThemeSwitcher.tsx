import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/contexts/theme-provider";
import { cn } from "@/lib/utils";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className={cn(className)} variant={'outline'} onClick={() => setTheme(isDark ? 'light' : 'dark')}>
          <span className='inline-flex items-center gap-2'>
            {theme === 'light' ?
              <>
                <MdOutlineWbSunny />
                <span className="hidden md:block">
                  Light mode
                </span>

              </>
              :
              <>
                <IoMoonOutline />
                <span className="hidden md:block">
                  Dark mode
                </span>
              </>
            }
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div>
          {theme === 'light' ? 'Change to dark mode' : 'Change to light mode'}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
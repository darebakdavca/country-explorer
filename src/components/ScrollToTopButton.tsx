import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import { FaArrowUp } from "react-icons/fa6";

export function ScrollToTopButton() {
    const { hasScrolled } = useScrolled();

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={handleClick}
                    className={cn(
                        hasScrolled
                            ? 'pointer-events-auto translate-y-0 scale-100 bg-background opacity-100'
                            : 'pointer-events-none translate-y-3 scale-95 bg-transparent opacity-0',
                        "sticky bottom-5 justify-self-end w-fit rounded-full border border-transparent p-3 transition-all duration-300 ease-out hover:border-primary xl:p-4"
                    )}
                >
                    <FaArrowUp className="size-6 xl:size-8" />
                </button>
            </TooltipTrigger>
            <TooltipContent>
                Scroll to top
            </TooltipContent>
        </Tooltip >
    );
}

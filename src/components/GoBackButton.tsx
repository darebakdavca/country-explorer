import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router";

export function GoBackButton() {
    const navigate = useNavigate();

    return (
        <div>
            <Button variant={'link'} onClick={() => navigate(-1)} className="flex items-center gap-3">
                <FaArrowLeftLong />
                Go back
            </Button>
        </div>
    )
}
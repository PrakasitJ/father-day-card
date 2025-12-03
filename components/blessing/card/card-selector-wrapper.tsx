import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardSelectorWrapperProps {
    isSelected: boolean;
    onSelect: () => void;
    children: React.ReactNode;
    className?: string;
}

export function CardSelectorWrapper({
    isSelected,
    onSelect,
    children,
    className,
}: CardSelectorWrapperProps) {
    return (
        <div
            onClick={onSelect}
            className={cn(
                "relative cursor-pointer rounded-xl border-2 transition-all duration-200 overflow-hidden",
                isSelected
                    ? "border-blue-500 shadow-md"
                    : "border-transparent hover:border-gray-200",
                className
            )}
        >
            {children}
            {isSelected && (
                <div className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm animate-in zoom-in duration-200">
                    <Check className="h-4 w-4" strokeWidth={3} />
                </div>
            )}
        </div>
    );
}

"use client"

import Image from "next/image";
import { useCardStore } from "@/store/use-card-store";

export function CardPreview({ className }: { className?: string }) {
    const { selectedCardId, senderName, blessingMessage } = useCardStore();

    return (
        <div className={`relative ${className || ''}`}>
            <Image src={`/card/${selectedCardId}.png`} alt="Logo" width={550} height={550} priority className="z- rounded-2xl" />
            <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                <p className="text-2xl font-bold text-[#333333] font-itim whitespace-pre-wrap wrap-break-word w-[280px]">{blessingMessage}</p>
            </div>
            <div className="absolute bottom-12 left-0 w-full text-center px-12">
                <p className="text-xl font-bold text-[#333333] font-itim wrap-break-word">
                    {(() => {
                        const parts = senderName.split(" ");
                        if (parts.length <= 2) {
                            return parts.join("\n");
                        }
                        const firstName = parts[0];
                        const lastName = parts[parts.length - 1];
                        const middleNames = parts.slice(1, parts.length - 1).join(" ");
                        return `${firstName}\n${middleNames}\n${lastName}`;
                    })()}
                </p>
            </div>
        </div>
    );
}

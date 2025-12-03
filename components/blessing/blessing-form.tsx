"use client";

import { useCardStore } from "@/store/use-card-store";
import { useRouter } from "next/navigation";


import { useState } from "react";
import { Loader2 } from "lucide-react";

export function BlessingForm() {
    const { senderName, setSenderName, blessingMessage, setBlessingMessage, selectedCardId } =
        useCardStore();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDone = async () => {
        if (senderName && blessingMessage && !isSubmitting) {
            setIsSubmitting(true);
            try {
                await fetch('/api/blessings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        senderName,
                        blessingMessage,
                        cardId: selectedCardId,
                    }),
                })
                router.push("/download");
            } catch (error) {
                console.error('Failed to save blessing:', error)
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="flex w-full max-w-[500px] flex-col gap-6 rounded-3xl bg-[#ffeebb] p-8 shadow-lg">
            <div className="flex flex-col gap-2">
                <label className="text-lg font-bold text-[#1e3a8a] font-pridi">ชื่อ</label>
                <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-lg border-2 border-[#fcd34d] bg-[#fef3c7] px-4 text-lg text-[#1e3a8a] outline-none focus:border-[#fbbf24] font-itim disabled:opacity-50"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-lg font-bold text-[#1e3a8a] font-pridi">คำอวยพร</label>
                <textarea
                    value={blessingMessage}
                    onChange={(e) => setBlessingMessage(e.target.value)}
                    disabled={isSubmitting}
                    className="h-32 w-full resize-none rounded-lg border-2 border-[#fcd34d] bg-[#fef3c7] p-4 text-lg text-[#1e3a8a] outline-none focus:border-[#fbbf24] font-itim disabled:opacity-50"
                />
            </div>

            <button
                onClick={handleDone}
                disabled={isSubmitting || !senderName || !blessingMessage}
                className="mt-4 h-12 w-full rounded-full bg-[#60a5fa] text-xl font-bold text-white transition-colors hover:bg-[#3b82f6] font-pridi flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        กำลังบันทึก...
                    </>
                ) : (
                    "เสร็จ"
                )}
            </button>

            <p className="text-center text-xs text-gray-500 font-sans">
                Your name will be shared. Never submit passwords.
            </p>
        </div>
    );
}

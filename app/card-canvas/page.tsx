'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function CardCanvasContent() {
    const searchParams = useSearchParams();
    const cardId = searchParams.get("cardId") || "card-1";
    const senderName = searchParams.get("senderName") || "";
    const blessingMessage = searchParams.get("blessingMessage") || "";
    const [isReady, setIsReady] = useState(false);

    // Signal to parent that we are ready
    useEffect(() => {
        if (isReady) {
            window.parent.postMessage({ type: 'CARD_CANVAS_READY' }, '*');
        }
    }, [isReady]);

    return (
        <div
            id="card-canvas-container"
            className="relative overflow-hidden rounded-[60px]"
            style={{
                width: '1200px',
                height: '1600px',
                backgroundColor: 'transparent' // Ensure transparent corners
            }}
        >
            {/* Main Card Image */}
            <img
                src={`/card/${cardId}.png`}
                alt="Card Background"
                className="w-full h-full object-contain"
                onLoad={() => setIsReady(true)}
            />

            {/* Blessing Message */}
            <div className="absolute inset-0 flex items-center justify-center p-36 text-center" style={{ top: '-80px' }}>
                <p
                    className="font-bold text-[#333333] font-itim whitespace-pre-wrap wrap-break-word"
                    style={{
                        fontSize: '72px', // Scaled up from 24px * 3
                        lineHeight: '1.5',
                        width: '840px' // Scaled up from 280px * 3
                    }}
                >
                    {blessingMessage}
                </p>
            </div>

            {/* Sender Name */}
            <div className="absolute bottom-48 left-0 w-full text-center px-36">
                <p
                    className="font-bold text-[#333333] font-itim wrap-break-word"
                    style={{ fontSize: '60px' }} // Scaled up from 20px * 3
                >
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

export default function CardCanvas() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CardCanvasContent />
        </Suspense>
    );
}

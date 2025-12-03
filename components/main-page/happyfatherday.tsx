'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'

export function Happyfatherday() {
    const [showPopup, setShowPopup] = useState(false)

    return (
        <>
            <div
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
                onClick={() => setShowPopup(true)}
            >
                <Image
                    src="/happyfatherday-text.svg"
                    alt="Logo"
                    width={500}
                    height={500}
                    priority
                    className="w-full max-w-[500px] h-auto pt-10"
                />
            </div>

            {showPopup && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer animate-in fade-in duration-300"
                    onClick={() => setShowPopup(false)}
                >
                    <div className="relative animate-in zoom-in-95 duration-300 p-4">
                        <button
                            className="absolute -top-4 -right-4 z-50 bg-white text-red-500 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-transform hover:scale-110"
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowPopup(false)
                            }}
                        >
                            <X size={24} strokeWidth={3} />
                        </button>
                        <Image
                            src="/card/card-6.png"
                            alt="Happy Father's Day Card"
                            width={500}
                            height={500}
                            className="rounded-2xl shadow-2xl w-full max-w-[500px] h-auto"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
                        />
                    </div>
                </div>
            )}
        </>
    )
}
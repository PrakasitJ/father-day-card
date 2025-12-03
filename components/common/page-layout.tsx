import Image from "next/image";
import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
    return (
        <div className={`flex min-h-screen items-center justify-center bg-[#bfe7fc] font-sans dark:bg-black relative overflow-hidden ${className || ""}`}>
            <Image
                src="/sky-bg.svg"
                alt="Background"
                fill
                priority
                className="object-cover object-center z-0"
                quality={100}
            />
            {children}
        </div>
    );
}

import Image from "next/image";
import Link from "next/link";

export function CuteLeftArrow({ width, height, link }: { width: number, height: number, link: string }) {
    return (
        <Link href={link} prefetch="auto" className="fixed bottom-4 left-4 md:bottom-20 md:left-20 z-50">
            <Image
                src="/cute-left-arrow.svg"
                alt="Cute Left Arrow"
                width={width}
                height={height}
                className="w-16 h-auto md:w-auto"
            />
        </Link>
    );
}
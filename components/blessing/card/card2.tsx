import Image from 'next/image'

export function Card2({ width, height }: { width: number; height: number }) {
    return (
        <Image src="/card/card-2.png" alt="Logo" width={width} height={height} priority />
    )
}
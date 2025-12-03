import Image from 'next/image'

export function Card1({ width, height }: { width: number; height: number }) {
    return (
        <Image src="/card/card-1.png" alt="Logo" width={width} height={height} priority />
    )
}
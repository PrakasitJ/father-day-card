import Image from 'next/image'

export function Card3({ width, height }: { width: number; height: number }) {
    return (
        <Image src="/card/card-3.png" alt="Logo" width={width} height={height} priority />
    )
}
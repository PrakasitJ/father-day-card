import Image from 'next/image'

export function Card4({ width, height }: { width: number; height: number }) {
    return (
        <Image src="/card/card-4.png" alt="Logo" width={width} height={height} priority />
    )
}
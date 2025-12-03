import Image from 'next/image'

export function Card5({ width, height }: { width: number; height: number }) {
    return (
        <Image src="/card/card-5.png" alt="Logo" width={width} height={height} priority />
    )
}
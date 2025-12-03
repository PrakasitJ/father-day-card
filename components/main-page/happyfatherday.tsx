import Image from 'next/image'

export function Happyfatherday() {
    return (
        <Image src="/happyfatherday-text.svg" alt="Logo" width={500} height={500} priority className="w-full max-w-[500px] h-auto pt-10" />
    )
}
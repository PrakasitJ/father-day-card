import Image from 'next/image'

export function Butterfly() {
    return (
        <div className="flex absolute gap-5 top-30">
            <Image src="/butterfly-1.svg" alt="Butterfly 1" width={500} height={500} priority />
            <Image src="/butterfly-2.svg" alt="Butterfly 2" width={500} height={500} priority />
        </div>
    )
}
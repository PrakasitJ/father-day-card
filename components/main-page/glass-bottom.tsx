import Image from 'next/image'

export function GlassBottom() {
    return (
        <div className="absolute -bottom-60 w-full h-[500px]">
            <Image src="/glass-bottom.svg" alt="Logo" fill={true} style={{ objectFit: 'cover' }} priority />
        </div>
    )
}
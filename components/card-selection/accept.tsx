interface AcceptProps {
    href?: string;
    text?: string;
    onClick?: () => void;
}

export function Accept({ href, text = "ตกลง", onClick }: AcceptProps) {
    if (onClick) {
        return (
            <button
                onClick={onClick}
                className="bg-[#ffb830] text-2xl text-black font-itim px-20 py-6 rounded-full"
            >
                {text}
            </button>
        );
    }
    return (
        <a
            href={href!}
            className="bg-[#ffb830] text-2xl text-black font-itim px-20 py-6 rounded-full"
        >
            {text}
        </a>
    );
}
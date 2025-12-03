import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
    const getPageUrl = (page: number) => {
        return `${baseUrl}?page=${page}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8 z-50 relative">
            <Link
                href={getPageUrl(currentPage - 1)}
                className={`p-2 rounded-full bg-white/80 hover:bg-white transition-colors ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                    }`}
            >
                <ChevronLeft className="w-6 h-6 text-[#1e3a8a]" />
            </Link>

            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first, last, current, and neighbors
                    if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                        return (
                            <Link
                                key={page}
                                href={getPageUrl(page)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold font-itim transition-all ${currentPage === page
                                        ? "bg-[#1e3a8a] text-white scale-110"
                                        : "bg-white/80 text-[#1e3a8a] hover:bg-white"
                                    }`}
                            >
                                {page}
                            </Link>
                        );
                    }

                    // Show ellipsis
                    if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                    ) {
                        return (
                            <span key={page} className="text-[#1e3a8a] font-bold">
                                ...
                            </span>
                        );
                    }

                    return null;
                })}
            </div>

            <Link
                href={getPageUrl(currentPage + 1)}
                className={`p-2 rounded-full bg-white/80 hover:bg-white transition-colors ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
                    }`}
            >
                <ChevronRight className="w-6 h-6 text-[#1e3a8a]" />
            </Link>
        </div>
    );
}

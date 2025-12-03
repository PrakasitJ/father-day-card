import { prisma } from "@/lib/db";
import { PageLayout } from "@/components/common/page-layout";
import { CuteLeftArrow } from "@/components/common/cute-left-arrow";
import Image from "next/image";
import { Pagination } from "@/components/common/pagination";

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 12;

export default async function AllBlessings({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    const [blessings, totalCount] = await Promise.all([
        prisma.blessing.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            skip,
            take: ITEMS_PER_PAGE,
        }),
        prisma.blessing.count(),
    ]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return (
        <PageLayout className="overflow-y-auto h-auto min-h-screen py-20">
            <div className="container mx-auto px-4 z-50">
                <h1 className="text-4xl font-bold text-[#1e3a8a] font-pridi text-center mb-10">
                    คำอวยพรทั้งหมด
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {blessings?.map((blessing: { id: number, cardId: string, blessingMessage: string, senderName: string }) => (
                        <div key={blessing.id} className="relative aspect-[3/4] w-full">
                            <Image
                                src={`/card/${blessing.cardId}.png`}
                                alt="Card"
                                fill
                                className="rounded-2xl object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                                <p className="text-lg font-bold text-[#333333] font-itim whitespace-pre-wrap wrap-break-word w-full">
                                    {blessing.blessingMessage}
                                </p>
                            </div>
                            <div className="absolute bottom-8 left-0 w-full text-center px-8">
                                <p className="text-base font-bold text-[#333333] font-itim wrap-break-word">
                                    จาก {blessing.senderName}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl="/all-blessings"
                />
            </div>
            <CuteLeftArrow width={100} height={100} link="/" />
        </PageLayout>
    );
}

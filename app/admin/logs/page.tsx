import { prisma } from "@/lib/db";
import { PageLayout } from "@/components/common/page-layout";
import { CuteLeftArrow } from "@/components/common/cute-left-arrow";
import { DataTable } from "@/components/admin/data-table";
import { columns } from "@/components/admin/columns";

export const dynamic = 'force-dynamic';

export default async function AdminLogs() {
    const blessings = await prisma.blessing.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <PageLayout className="overflow-y-auto h-auto min-h-screen py-20">
            <div className="container mx-auto px-4 bg-white/80 rounded-3xl p-8 backdrop-blur-sm">
                <h1 className="text-4xl font-bold text-[#1e3a8a] font-pridi text-center mb-10">
                    Admin Logs
                </h1>
                <DataTable columns={columns} data={blessings} />
            </div>
            <CuteLeftArrow width={100} height={100} link="/" />
        </PageLayout>
    );
}


import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { success: false, error: "Invalid IDs provided" },
                { status: 400 }
            );
        }

        await prisma.blessing.deleteMany({
            where: {
                id: { in: ids }
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting blessings:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete blessings" },
            { status: 500 }
        );
    }
}

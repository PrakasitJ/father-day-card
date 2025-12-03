import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.blessing.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting blessing:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete blessing" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { senderName, blessingMessage } = body;

        await prisma.blessing.update({
            where: { id: Number(id) },
            data: { senderName, blessingMessage }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating blessing:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update blessing" },
            { status: 500 }
        );
    }
}

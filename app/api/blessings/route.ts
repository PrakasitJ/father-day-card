import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const blessings = await prisma.blessing.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })
        return NextResponse.json({ success: true, data: blessings })
    } catch (error) {
        console.error('Failed to get blessings:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to get blessings', details: String(error) },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { senderName, blessingMessage, cardId } = body

        if (!senderName || !blessingMessage || !cardId) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const blessing = await prisma.blessing.create({
            data: {
                senderName,
                blessingMessage,
                cardId,
            },
        })

        return NextResponse.json({ success: true, data: blessing })
    } catch (error) {
        console.error('Failed to save blessing:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to save blessing' },
            { status: 500 }
        )
    }
}

import postgres from 'postgres';

const sql = postgres({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
});

let initPromise: Promise<void> | null = null;

async function ensureSchema() {
    if (!initPromise) {
        initPromise = (async () => {
            await sql`CREATE SCHEMA IF NOT EXISTS father_day`;
            await sql`
                CREATE TABLE IF NOT EXISTS father_day."Blessing" (
                    id SERIAL PRIMARY KEY,
                    "senderName" TEXT NOT NULL,
                    "blessingMessage" TEXT NOT NULL,
                    "cardId" TEXT NOT NULL,
                    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                )
            `;
        })();
    }
    return initPromise;
}

export const prisma = {
    blessing: {
        create: async (data: { data: { senderName: string; blessingMessage: string; cardId: string } }) => {
            await ensureSchema();
            const [result] = await sql`
                INSERT INTO father_day."Blessing" ("senderName", "blessingMessage", "cardId")
                VALUES (${data.data.senderName}, ${data.data.blessingMessage}, ${data.data.cardId})
                RETURNING id, "createdAt"
            `;
            return {
                id: result.id,
                ...data.data,
                createdAt: result.createdAt
            };
        },
        findMany: async (params?: { where?: { cardId?: string }, orderBy?: any, skip?: number, take?: number }) => {
            await ensureSchema();

            let conditions = sql``;
            if (params?.where?.cardId) {
                conditions = sql`WHERE "cardId" = ${params.where.cardId}`;
            }

            // Pagination and ordering
            const limit = params?.take ? sql`LIMIT ${params.take}` : sql``;
            const offset = params?.skip ? sql`OFFSET ${params.skip}` : sql``;

            const rows = await sql`
                SELECT * FROM father_day."Blessing"
                ${conditions}
                ORDER BY "createdAt" DESC
                ${limit}
                ${offset}
            `;

            return rows.map(row => ({
                id: row.id,
                senderName: row.senderName,
                blessingMessage: row.blessingMessage,
                cardId: row.cardId,
                createdAt: row.createdAt
            }));
        },
        count: async (params?: { where?: { cardId?: string } }) => {
            await ensureSchema();
            let conditions = sql``;
            if (params?.where?.cardId) {
                conditions = sql`WHERE "cardId" = ${params.where.cardId}`;
            }

            const [result] = await sql`
                SELECT COUNT(*) as count FROM father_day."Blessing"
                ${conditions}
            `;
            return Number(result.count);
        },
        delete: async (params: { where: { id: number } }) => {
            await ensureSchema();
            await sql`
                DELETE FROM father_day."Blessing"
                WHERE id = ${params.where.id}
            `;
            return { success: true };
        },
        deleteMany: async (params: { where: { id: { in: number[] } } }) => {
            await ensureSchema();
            if (params.where.id.in.length === 0) return { count: 0 };

            const result = await sql`
                DELETE FROM father_day."Blessing"
                WHERE id IN ${sql(params.where.id.in)}
            `;
            return { count: result.count };
        },
        update: async (params: { where: { id: number }, data: { senderName?: string, blessingMessage?: string } }) => {
            await ensureSchema();

            // Construct update object
            const updateData: any = {};
            if (params.data.senderName !== undefined) updateData.senderName = params.data.senderName;
            if (params.data.blessingMessage !== undefined) updateData.blessingMessage = params.data.blessingMessage;

            if (Object.keys(updateData).length === 0) return null;

            const [result] = await sql`
                UPDATE father_day."Blessing"
                SET ${sql(updateData)}
                WHERE id = ${params.where.id}
                RETURNING *
            `;

            if (!result) return null;

            return {
                id: result.id,
                senderName: result.senderName,
                blessingMessage: result.blessingMessage,
                cardId: result.cardId,
                createdAt: result.createdAt
            };
        }
    }
}

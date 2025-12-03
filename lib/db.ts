import { DuckDBInstance } from '@duckdb/node-api';
import path from 'path';

const dbPath = path.join(process.cwd(), 'dev.duckdb');
console.log('Database path:', dbPath);

let instance: DuckDBInstance | null = null;
let connection: any = null;

// Add global type for development caching
declare global {
    var prismaGlobal: undefined | { instance: DuckDBInstance; connection: any };
}

async function getDb() {
    if (globalThis.prismaGlobal?.connection) {
        return globalThis.prismaGlobal.connection;
    }

    if (connection) return connection;

    try {
        instance = await DuckDBInstance.create(dbPath);
        connection = await instance.connect();

        // Create sequence for ID auto-increment
        await connection.run("CREATE SEQUENCE IF NOT EXISTS blessing_id_seq");

        // Create table
        await connection.run(`
      CREATE TABLE IF NOT EXISTS Blessing (
        id INTEGER PRIMARY KEY DEFAULT nextval('blessing_id_seq'),
        senderName TEXT NOT NULL,
        blessingMessage TEXT NOT NULL,
        cardId TEXT NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

        console.log('Connected to DuckDB and verified schema');

        globalThis.prismaGlobal = { instance, connection };

        return connection;
    } catch (error) {
        console.error('Failed to initialize DuckDB:', error);
        throw error;
    }
}

// Export helper functions
export const prisma = {
    blessing: {
        create: async (data: { data: { senderName: string; blessingMessage: string; cardId: string } }) => {
            const db = await getDb();

            // DuckDB insert with returning
            const result = await db.run(
                `INSERT INTO Blessing (senderName, blessingMessage, cardId, createdAt) 
         VALUES (?, ?, ?, current_timestamp) 
         RETURNING id, createdAt`,
                [data.data.senderName, data.data.blessingMessage, data.data.cardId]
            );

            const rows = await result.getRows();
            const row = rows[0];

            return {
                id: Number(row[0]),
                ...data.data,
                createdAt: new Date(row[1])
            }
        },
        findMany: async (params?: { where?: { cardId?: string }, orderBy?: any, skip?: number, take?: number }) => {
            const db = await getDb();
            let query = 'SELECT * FROM Blessing'
            const queryParams: any[] = []

            if (params?.where?.cardId) {
                query += ' WHERE cardId = ?'
                queryParams.push(params.where.cardId)
            }

            query += ' ORDER BY createdAt DESC'

            if (params?.take) {
                query += ' LIMIT ?'
                queryParams.push(params.take)
            }

            if (params?.skip) {
                query += ' OFFSET ?'
                queryParams.push(params.skip)
            }

            const result = await db.run(query, queryParams);
            const rows = await result.getRows();

            return rows.map((row: any[]) => ({
                id: Number(row[0]),
                senderName: String(row[1]),
                blessingMessage: String(row[2]),
                cardId: String(row[3]),
                createdAt: new Date(row[4])
            }))
        },
        count: async (params?: { where?: { cardId?: string } }) => {
            const db = await getDb();
            let query = 'SELECT COUNT(*) FROM Blessing'
            const queryParams: any[] = []

            if (params?.where?.cardId) {
                query += ' WHERE cardId = ?'
                queryParams.push(params.where.cardId)
            }

            const result = await db.run(query, queryParams);
            const rows = await result.getRows();
            return Number(rows[0][0]);
        },
        delete: async (params: { where: { id: number } }) => {
            const db = await getDb();
            await db.run('DELETE FROM Blessing WHERE id = ?', [params.where.id]);
            return { success: true };
        },
        deleteMany: async (params: { where: { id: { in: number[] } } }) => {
            const db = await getDb();
            if (params.where.id.in.length === 0) return { count: 0 };

            const placeholders = params.where.id.in.map(() => '?').join(',');
            await db.run(`DELETE FROM Blessing WHERE id IN (${placeholders})`, params.where.id.in);
            return { count: params.where.id.in.length };
        },
        update: async (params: { where: { id: number }, data: { senderName?: string, blessingMessage?: string } }) => {
            const db = await getDb();
            const updates: string[] = [];
            const values: any[] = [];

            if (params.data.senderName !== undefined) {
                updates.push('senderName = ?');
                values.push(params.data.senderName);
            }
            if (params.data.blessingMessage !== undefined) {
                updates.push('blessingMessage = ?');
                values.push(params.data.blessingMessage);
            }

            if (updates.length === 0) return null;

            values.push(params.where.id);
            await db.run(`UPDATE Blessing SET ${updates.join(', ')} WHERE id = ?`, values);

            return { id: params.where.id, ...params.data };
        }
    }
}

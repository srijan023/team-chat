import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

// a global db instance to prevent multiple db initiation during hot reloads in dev
const globalForDb = globalThis as unknown as {
    db: ReturnType<typeof drizzle> | undefined
}

// in production each function gets its own DB pool instance.
const pool = globalForDb.db ? undefined : new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export const db = globalForDb.db ?? drizzle(pool!, { schema, });

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;

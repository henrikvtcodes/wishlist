import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { env } from '$lib/env/server';

const client = drizzle(createClient({ url: env.DATABASE_URL }), { schema });

export const db = { client, schema };
export default db;

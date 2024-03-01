import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';
import postgres from 'postgres';

// for query purposes
const queryClient = postgres(process.env.POSTGRES_URL);
const db = drizzle(queryClient, {schema});

export default db;

import env from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
env.config();
console.log(process.env.DATABASE_URL)
if (process.env.NODE_ENV === 'development') throw new Error('DATABASE_URL is required');

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
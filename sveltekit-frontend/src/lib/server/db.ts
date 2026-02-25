import { DATABASE_URL } from '$env/static/private';
import { neon } from '@neondatabase/serverless';

export const sql = neon(DATABASE_URL);

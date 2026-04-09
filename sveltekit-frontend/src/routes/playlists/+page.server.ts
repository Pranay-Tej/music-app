import { USER_ID } from '$env/static/private';
import { sql } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const userId = USER_ID;
	const playlists = await sql`SELECT id, name, description, created_at, updated_at
		FROM playlists
		WHERE user_id=${userId}
		ORDER BY updated_at DESC`;

	return { playlists };
};

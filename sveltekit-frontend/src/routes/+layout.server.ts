import { USER_ID } from '$env/static/private';
import { sql } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const playlists = await sql`SELECT
	id,
	name
	FROM playlists
	WHERE user_id = ${USER_ID}
	ORDER BY updated_at DESC`;

	return { playlists };
};

import { USER_ID } from '$env/static/private';
import { sql } from '$lib/server/db';
import type { Playlist } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const playlists = (await sql`
		SELECT
			id,
			name,
			description,
			user_id,
			created_at,
			updated_at
		FROM playlists
		WHERE user_id = ${USER_ID}
		ORDER BY updated_at DESC
	`) as Playlist[];

	return { playlists };
};

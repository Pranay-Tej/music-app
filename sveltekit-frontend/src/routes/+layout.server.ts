import { sql } from '$lib/server/db';
import type { Playlist } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.userInfo) {
		return { userInfo: null, playlists: [] as Playlist[] };
	}

	const playlists = (await sql`
		SELECT
			id,
			name,
			description,
			user_id,
			created_at,
			updated_at
		FROM playlists
		WHERE user_id = ${locals.userInfo.id}
		ORDER BY updated_at DESC
	`) as Playlist[];

	return { userInfo: locals.userInfo, playlists };
};

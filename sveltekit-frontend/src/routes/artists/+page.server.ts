import { sql } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const artists = await sql`SELECT id, name, about
		FROM artists
		WHERE deleted_at IS NULL
		ORDER BY name`;

	return { artists };
};

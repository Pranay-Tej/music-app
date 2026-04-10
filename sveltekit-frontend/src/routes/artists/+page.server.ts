import { sql } from '$lib/server/db';
import type { Artist } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const artists = (await sql`
		SELECT
			id,
			name,
			about,
			image_url,
			created_at,
			updated_at,
			deleted_at
		FROM artists
		WHERE deleted_at IS NULL
		ORDER BY name
	`) as Artist[];

	return { artists };
};

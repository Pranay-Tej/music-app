import { sql } from '$lib/server/db';
import type { Album, Artist } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
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
		WHERE id = ${params.id}
			AND deleted_at IS NULL
	`) as Artist[];

	if (artists.length === 0) {
		error(404, 'Artist not found');
	}

	const albums = (await sql`
		SELECT
			id,
			title,
			cover_art,
			description,
			release_date,
			artist_id,
			created_at,
			updated_at
		FROM albums
		WHERE artist_id = ${params.id}
		ORDER BY title
	`) as Album[];

	return {
		artist: artists[0],
		albums
	};
};

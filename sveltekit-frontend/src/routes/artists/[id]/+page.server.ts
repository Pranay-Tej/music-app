import { sql } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const artists = await sql`SELECT * FROM artists WHERE id = ${params.id}`;

	if (artists.length === 0) {
		error(404, 'Artist not found');
	}

	const albums = await sql`
		SELECT id, title, cover_art
		FROM albums
		WHERE artist_id = ${params.id}
		ORDER BY title
	`;

	return {
		artist: artists[0],
		albums
	};
};

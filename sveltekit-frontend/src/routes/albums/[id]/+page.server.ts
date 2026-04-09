import { sql } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const albums = await sql`
		SELECT a.id, a.title, a.cover_art, ar.id AS artist_id, ar.name AS artist_name
		FROM albums a
		JOIN artists ar ON ar.id = a.artist_id
		WHERE a.id = ${params.id} AND ar.deleted_at IS NULL
	`;

	if (albums.length === 0) {
		error(404, 'Album not found');
	}

	const songs = await sql`
		SELECT id, title, duration
		FROM songs
		WHERE album_id = ${params.id}
		ORDER BY title
	`;

	return {
		album: albums[0],
		songs
	};
};

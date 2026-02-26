import { sql } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const q = url.searchParams.get('q') || '';

	if (!q.trim()) {
		return { query: q, songs: [] };
	}

	const songs = await sql`
		SELECT s.id, s.title, s.duration,
			ar.id AS artist_id, ar.name AS artist_name,
			al.id AS album_id, al.title AS album_title
		FROM songs s
		JOIN artists ar ON ar.id = s.artist_id
		LEFT JOIN albums al ON al.id = s.album_id
		WHERE s.title ILIKE ${'%' + q.trim() + '%'}
		ORDER BY s.title
	`;

	return { query: q, songs };
};

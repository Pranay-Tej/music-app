import { sql } from '$lib/server/db';
import type { SongWithDetails } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const q = url.searchParams.get('q') || '';

	if (!q.trim()) {
		return { query: q, songs: [] as SongWithDetails[] };
	}

	const songs = (await sql`
		SELECT
			s.id,
			s.title,
			s.description,
			s.duration,
			s.lyrics,
			s.artist_id,
			s.album_id,
			s.created_at,
			s.updated_at,
			ar.name AS artist_name,
			al.title AS album_title
		FROM songs s
		JOIN artists ar ON ar.id = s.artist_id
		LEFT JOIN albums al ON al.id = s.album_id
		WHERE s.title ILIKE ${'%' + q.trim() + '%'}
			AND ar.deleted_at IS NULL
		ORDER BY s.title
	`) as SongWithDetails[];

	return { query: q, songs };
};

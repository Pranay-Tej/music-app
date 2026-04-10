import { sql } from '$lib/server/db';
import type { AlbumWithArtist, SongWithDetails } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const albums = (await sql`
		SELECT
			a.id,
			a.title,
			a.cover_art,
			a.description,
			a.release_date,
			a.artist_id,
			a.created_at,
			a.updated_at,
			ar.name AS artist_name
		FROM albums a
		JOIN artists ar ON ar.id = a.artist_id
		WHERE a.id = ${params.id}
			AND ar.deleted_at IS NULL
	`) as AlbumWithArtist[];

	if (albums.length === 0) {
		error(404, 'Album not found');
	}

	const songs = (await sql`
		SELECT
			id,
			title,
			description,
			duration,
			lyrics,
			artist_id,
			album_id,
			created_at,
			updated_at
		FROM songs
		WHERE album_id = ${params.id}
		ORDER BY title
	`) as SongWithDetails[];

	return {
		album: albums[0],
		songs
	};
};

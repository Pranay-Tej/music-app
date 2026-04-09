import { sql } from '$lib/server/db';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const playlist = await sql`SELECT id, name, description, created_at, updated_at
        FROM playlists
        WHERE id = ${params.id}`;

	if (playlist.length === 0) {
		error(404, 'Playlist not found');
	}

	const [playlistSongs, playlistStats] = await Promise.all([
		sql`SELECT ps.added_at, s.id AS song_id, s.title AS song_title, s.album_id AS album_id, s.artist_id AS artist_id, ar.name AS artist_name, al.title AS album_title
        FROM playlist_songs ps
        INNER JOIN songs s ON s.id = ps.song_id
        INNER JOIN artists ar on ar.id = s.artist_id
        LEFT JOIN albums al on al.id = s.album_id
        WHERE ps.playlist_id = ${params.id}
        AND ar.deleted_at IS NULL
        ORDER BY ps.added_at`,

		sql`SELECT COUNT(s.id) as total_songs, SUM(s.duration) AS total_duration
        FROM playlist_songs ps
        INNER JOIN songs s on s.id = ps.song_id
        INNER JOIN artists ar on ar.id = s.artist_id
        WHERE ps.playlist_id = ${params.id}
        AND ar.deleted_at IS NULL`
	]);

	return {
		playlist: playlist[0],
		playlistSongs: playlistSongs,
		stats: playlistStats[0]
	};
};

export const actions = {
	edit: async ({ params, request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString()?.trim();
		const description = formData.get('description')?.toString()?.trim() || null;

		if (!name) {
			return fail(400, { error: 'Playlist name is required', name, description });
		}

		await sql`UPDATE playlists
        SET name = ${name}, description = ${description}, updated_at = NOW()
        WHERE id = ${params.id}`;
	},
	delete: async ({ params }) => {
		await sql`DELETE FROM playlists WHERE id = ${params.id}`;
		redirect(303, '/playlists');
	}
} satisfies Actions;

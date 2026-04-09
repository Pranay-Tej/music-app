import { sql } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const playlist = await sql`SELECT id, name, description, created_at, updated_at
        FROM playlists
        WHERE id = ${params.id}`;

	if (playlist.length === 0) {
		error(404, 'Playlist not found');
	}

	const playlistSongs =
		await sql`SELECT ps.added_at, s.id AS song_id, s.title AS song_title, s.album_id AS album_id, s.artist_id AS artist_id, ar.name AS artist_name, al.title AS album_title
        FROM playlist_songs ps
        INNER JOIN songs s ON s.id = ps.song_id
        INNER JOIN artists ar on ar.id = s.artist_id
        LEFT JOIN albums al on al.id = s.album_id
        WHERE ps.playlist_id = ${params.id}
        AND ar.deleted_at IS NULL
        ORDER BY ps.added_at`;

	const playlistStats =
		await sql`SELECT COUNT(s.id) as total_songs, SUM(s.duration) AS total_duration
        FROM playlist_songs ps
        INNER JOIN songs s on s.id = ps.song_id
        INNER JOIN artists ar on ar.id = s.artist_id
        WHERE ps.playlist_id = ${params.id}
        AND ar.deleted_at IS NULL`;

	return {
		playlist: playlist[0],
		playlistSongs: playlistSongs,
		stats: playlistStats[0]
	};
};

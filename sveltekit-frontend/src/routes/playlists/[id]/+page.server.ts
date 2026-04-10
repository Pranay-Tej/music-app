import { sql } from '$lib/server/db';
import type { Playlist, PlaylistSongWithDetails, PlaylistStats } from '$lib/types';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const playlist = (await sql`
		SELECT
			id,
			name,
			description,
			user_id,
			created_at,
			updated_at
		FROM playlists
		WHERE id = ${params.id}
	`) as Playlist[];

	if (playlist.length === 0) {
		error(404, 'Playlist not found');
	}

	const [playlistSongs, playlistStats] = (await Promise.all([
		sql`
			SELECT
				ps.playlist_id,
				ps.song_id,
				ps.added_at,
				s.title AS song_title,
				s.artist_id,
				s.album_id,
				ar.name AS artist_name,
				al.title AS album_title
			FROM playlist_songs ps
			INNER JOIN songs s ON s.id = ps.song_id
			INNER JOIN artists ar ON ar.id = s.artist_id
			LEFT JOIN albums al ON al.id = s.album_id
			WHERE ps.playlist_id = ${params.id}
				AND ar.deleted_at IS NULL
			ORDER BY ps.added_at
		`,
		sql`
			SELECT
				COUNT(s.id) AS total_songs,
				SUM(s.duration) AS total_duration
			FROM playlist_songs ps
			INNER JOIN songs s ON s.id = ps.song_id
			INNER JOIN artists ar ON ar.id = s.artist_id
			WHERE ps.playlist_id = ${params.id}
				AND ar.deleted_at IS NULL
		`
	])) as [PlaylistSongWithDetails[], PlaylistStats[]];

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

		await sql`
			UPDATE playlists
			SET
				name = ${name},
				description = ${description},
				updated_at = NOW()
			WHERE id = ${params.id}
		`;
	},
	removeSong: async ({ params, request }) => {
		const formData = await request.formData();
		const songId = formData.get('song_id')?.toString();

		if (!songId) {
			return fail(400, { error: 'Song ID is required' });
		}

		await sql`
			DELETE FROM playlist_songs
			WHERE playlist_id = ${params.id}
				AND song_id = ${songId}
		`;
	},
	delete: async ({ params }) => {
		await sql`
			DELETE FROM playlists
			WHERE id = ${params.id}
		`;
		redirect(303, '/playlists');
	}
} satisfies Actions;

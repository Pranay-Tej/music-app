import { sql } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { playlist_id, song_id } = await request.json();

	if (!playlist_id || !song_id) {
		return json({ error: 'playlist_id and song_id are required' }, { status: 400 });
	}

	await sql`
		INSERT INTO playlist_songs (playlist_id, song_id)
		VALUES (${playlist_id}, ${song_id})
		ON CONFLICT (playlist_id, song_id) DO NOTHING
	`;

	return json({ success: true });
};

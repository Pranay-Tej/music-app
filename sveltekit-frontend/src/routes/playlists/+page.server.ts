import { USER_ID } from '$env/static/private';
import { sql } from '$lib/server/db';
import type { Playlist } from '$lib/types';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const userId = USER_ID;
	const playlists = (await sql`
		SELECT
			id,
			name,
			description,
			user_id,
			created_at,
			updated_at
		FROM playlists
		WHERE user_id = ${userId}
		ORDER BY updated_at DESC
	`) as Playlist[];

	return { playlists };
};

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString()?.trim();
		const description = formData.get('description')?.toString()?.trim() || null;

		if (!name) {
			return fail(400, { error: 'Playlist name is required', name, description });
		}

		await sql`
			INSERT INTO playlists (name, description, user_id)
			VALUES (${name}, ${description}, ${USER_ID})
		`;
	}
} satisfies Actions;

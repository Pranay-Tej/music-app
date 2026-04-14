import { sql } from '$lib/server/db';
import type { Playlist } from '$lib/types';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.userInfo) {
		redirect(303, '/login');
	}

	const playlists = (await sql`
		SELECT
			id,
			name,
			description,
			user_id,
			created_at,
			updated_at
		FROM playlists
		WHERE user_id = ${locals.userInfo.id}
		ORDER BY updated_at DESC
	`) as Playlist[];

	return { playlists };
};

export const actions = {
	create: async ({ request, locals }) => {
		if (!locals.userInfo) {
			redirect(303, '/login');
		}

		const formData = await request.formData();
		const name = formData.get('name')?.toString()?.trim();
		const description = formData.get('description')?.toString()?.trim() || null;

		if (!name) {
			return fail(400, { error: 'Playlist name is required', name, description });
		}

		await sql`
			INSERT INTO playlists (name, description, user_id)
			VALUES (${name}, ${description}, ${locals.userInfo.id})
		`;
	}
} satisfies Actions;

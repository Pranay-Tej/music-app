import { USER_INFO_COOKIE } from '$lib/constants';
import { sql } from '$lib/server/db';
import type { User } from '$lib/types';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const userId = formData.get('user_id')?.toString()?.trim();

		if (!userId) {
			return fail(400, { error: 'User ID is required' });
		}

		const [user] = (await sql`
			SELECT
				id,
				username,
				display_name
			FROM users
			WHERE id = ${userId}
		`) as User[];

		if (!user) {
			return fail(400, { error: 'User not found' });
		}

		cookies.set(USER_INFO_COOKIE, JSON.stringify(user), { path: '/', httpOnly: true, sameSite: 'lax' });
		redirect(303, '/');
	}
} satisfies Actions;

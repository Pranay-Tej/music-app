import { USER_INFO_COOKIE } from '$lib/constants';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete(USER_INFO_COOKIE, { path: '/' });
		redirect(303, '/login');
	}
} satisfies Actions;

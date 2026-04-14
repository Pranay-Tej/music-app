import { USER_INFO_COOKIE } from '$lib/constants';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const raw = event.cookies.get(USER_INFO_COOKIE);
	event.locals.userInfo = raw ? JSON.parse(raw) : null;
	return resolve(event);
};

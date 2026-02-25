import { sql } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const artists = await sql`SELECT id, name, about FROM artists ORDER BY name`;

	return { artists };
};

import { sql } from '$lib/server/db';
import type { User } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// TODO: fetch all users
	const users = (await sql`
		SELECT
			id,
			username,
			display_name,
			created_at,
			updated_at
		FROM
			users
		ORDER BY display_name
		`) as User[];

	return { users };
};

import { sql } from '$lib/server/db';
import type { Playlist, User } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const [user] = (await sql`
		SELECT
			id,
			username,
			display_name,
			created_at,
			updated_at
		FROM
			users
		WHERE id = ${params.id}
		`) as User[];

	if (!user) {
		error(404, 'User not found');
	}

	// fetch user's playlists, follower and following counts in parallel
	const [playlists, [followerCount], [followingCount]] = (await Promise.all([
		sql`
			SELECT
				id,
				name,
				description,
				user_id,
				created_at,
				updated_at
			FROM
				playlists
			WHERE user_id = ${params.id}
			ORDER BY updated_at DESC
		`,
		sql`
			SELECT
				COUNT(following_id) AS follower_count
			FROM
				user_followers
			WHERE following_id = ${params.id}
		`,
		sql`
			SELECT
				COUNT(follower_id) AS following_count
			FROM
				user_followers
			WHERE follower_id = ${params.id}
		`
	])) as [Playlist[], { follower_count: number }[], { following_count: number }[]];

	let isFollowing = false;
	if (locals.userInfo && locals.userInfo.id !== params.id) {
		const [result] = (await sql`
			SELECT EXISTS(
				SELECT 1 FROM user_followers
				WHERE follower_id = ${locals.userInfo.id}
				AND following_id = ${params.id}
			)
			`) as { exists: boolean }[];
		isFollowing = result?.exists ?? false;
	}

	return {
		user,
		playlists,
		followerCount: followerCount.follower_count ?? 0,
		followingCount: followingCount.following_count ?? 0,
		isFollowing,
		isOwnProfile: locals.userInfo?.id === params.id
	};
};

export const actions = {
	follow: async ({ params, locals }) => {
		if (!locals.userInfo) {
			redirect(303, '/login');
		}

		await sql`
			INSERT INTO user_followers (follower_id, following_id)
			VALUES (${locals.userInfo.id}, ${params.id})
		`;
	},
	unfollow: async ({ params, locals }) => {
		if (!locals.userInfo) {
			redirect(303, '/login');
		}

		await sql`
			DELETE FROM user_followers
			WHERE follower_id = ${locals.userInfo.id}
				AND following_id = ${params.id}
		`;
	}
} satisfies Actions;

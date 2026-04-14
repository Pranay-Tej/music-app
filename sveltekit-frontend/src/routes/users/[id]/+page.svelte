<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.user.display_name}</title>
</svelte:head>

<a href={resolve('/users')}>&larr; All Users</a>

<h1>{data.user.display_name}</h1>
<p>@{data.user.username}</p>

<p>{data.followerCount} followers &middot; {data.followingCount} following</p>

{#if data.userInfo && !data.isOwnProfile}
	{#if data.isFollowing}
		<form method="POST" action="?/unfollow" use:enhance>
			<button type="submit">Unfollow</button>
		</form>
	{:else}
		<form method="POST" action="?/follow" use:enhance>
			<button type="submit">Follow</button>
		</form>
	{/if}
{/if}

<h2>Playlists</h2>

{#if data.playlists.length > 0}
	<ul>
		{#each data.playlists as playlist (playlist.id)}
			<li>
				<a href={resolve(`/playlists/${playlist.id}`)}>{playlist.name}</a>
				{#if playlist.description}
					<span> &mdash; {playlist.description}</span>
				{/if}
			</li>
		{/each}
	</ul>
{:else}
	<p>No playlists yet.</p>
{/if}

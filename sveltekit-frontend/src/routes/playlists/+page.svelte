<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>My Playlists</title>
</svelte:head>

<h1>My Playlists</h1>

<form method="POST" action="?/create" use:enhance>
	<input type="text" name="name" placeholder="Playlist name" value={form?.name ?? ''} required />
	<input type="text" name="description" placeholder="Description (optional)" value={form?.description ?? ''} />
	<button type="submit">Create Playlist</button>
	{#if form?.error}
		<p>{form.error}</p>
	{/if}
</form>

<ul>
	{#each data.playlists as playlist (playlist.id)}
		<li>
			<a href={resolve(`/playlists/${playlist.id}`)}>{playlist.name}</a>
		</li>
	{/each}
</ul>

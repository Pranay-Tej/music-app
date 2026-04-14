<script lang="ts">
	import { resolve } from '$app/paths';
	import SongItem from '$lib/components/SongItem.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Search Songs</title>
</svelte:head>

<h1>Search for Song, Album or Artist</h1>

<form method="GET">
	<input type="text" name="q" value={data.query} placeholder="Search by song title..." />
	<button type="submit">Search</button>
	{#if data.query.trim()}
		<a href={resolve('/')}>Clear</a>
	{/if}
</form>

<!-- <pre>
	{JSON.stringify(data, null, 2)}
</pre> -->

{#if data.query.trim()}
	{#if data.songs.length > 0}
		<p>{data.songs.length} result{data.songs.length === 1 ? '' : 's'} for "{data.query}"</p>
		<ul>
			{#each data.songs as song (song.id)}
				<SongItem {song} playlists={data.playlists} />
			{/each}
		</ul>
	{:else}
		<p>No songs found for "{data.query}"</p>
	{/if}
{/if}

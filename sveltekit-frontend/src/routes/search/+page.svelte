<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDuration } from '$lib/utils.js';

	let { data } = $props();
</script>

<svelte:head>
	<title>Search Songs</title>
</svelte:head>

<h1>Search Songs</h1>

<form method="GET">
	<input type="text" name="q" value={data.query} placeholder="Search by song title..." />
	<button type="submit">Search</button>
	{#if data.query.trim()}
		<a href={resolve('/search')}>Clear</a>
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
				<li>
					{song.title}
					{#if song.duration}
						<span>({formatDuration(song.duration)})</span>
					{/if}
					— <a href={resolve(`/artists/${song.artist_id}`)}>{song.artist_name}</a>
					{#if song.album_id}
						· <a href={resolve(`/albums/${song.album_id}`)}>{song.album_title}</a>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<p>No songs found for "{data.query}"</p>
	{/if}
{/if}

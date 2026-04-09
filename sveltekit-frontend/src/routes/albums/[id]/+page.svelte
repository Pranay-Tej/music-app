<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDuration } from '$lib/utils.js';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.album.title}</title>
</svelte:head>

<a href={resolve(`/artists/${data.album.artist_id}`)}>&larr; {data.album.artist_name}</a>

<h1>{data.album.title}</h1>

<h2>Songs ({data.songs.length})</h2>

<ul>
	{#each data.songs as song (song.id)}
		<li>
			{song.title}
			{#if song.duration}
				<span>({formatDuration(song.duration)})</span>
			{/if}
		</li>
	{/each}
</ul>

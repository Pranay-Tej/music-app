<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();

	function formatDuration(totalSeconds: number): string {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		if (hours > 0) {
			return `${hours} hr ${minutes} min`;
		}
		return `${minutes} min ${seconds} sec`;
	}
</script>

<svelte:head>
	<title>{data.playlist.name}</title>
</svelte:head>

<a href={resolve(`/playlists`)}>&larr; Playlists</a>

<pre>
    {JSON.stringify(data, null, 2)}    
</pre>

<h1>{data.playlist.name}</h1>

{#if data.playlist.description}
	<p>{data.playlist.description}</p>
{/if}

<h2>{data.stats.total_songs} Songs &middot; {formatDuration(data.stats.total_duration)}</h2>

<ul>
	{#each data.playlistSongs as ps (ps.song_id)}
		<li>
			<p>{ps.song_title}</p>
			&mdash;<a href={resolve(`/artists/${ps.artist_id}`)}>{ps.artist_id}</a>
			{#if ps.album_id}
				&middot; <a href={resolve(`/albums/${ps.album_id}`)}>{ps.album_id}</a>
			{/if}
		</li>
	{/each}
</ul>

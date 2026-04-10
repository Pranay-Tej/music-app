<script lang="ts">
	import { resolve } from '$app/paths';
	import SongItem from '$lib/components/SongItem.svelte';

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
		<SongItem {song} playlists={data.playlists} showArtist={false} showAlbum={false} />
	{/each}
</ul>

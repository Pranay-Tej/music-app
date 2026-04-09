<script lang="ts">
	import { resolve } from '$app/paths';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.artist.name}</title>
</svelte:head>

<a href={resolve(`/artists`)}>&larr; All Artists</a>

<h1>{data.artist.name}</h1>

{#if data.artist.about}
	<p>{data.artist.about}</p>
{/if}

<h2>Albums ({data.albums.length})</h2>
{#each data.albums as album (album.id)}
	<section>
		<h3><a href={resolve(`/albums/${album.id}`)}>{album.title}</a></h3>
	</section>
{/each}

<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>My Playlists</title>
</svelte:head>

<ul>
	{#each data.playlists as playlist (playlist.id)}
		<li>
			<a href={resolve(`/playlists/${playlist.id}`)}>{playlist.name}</a>
		</li>
	{/each}
</ul>

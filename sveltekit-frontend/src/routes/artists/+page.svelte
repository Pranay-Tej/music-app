<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>Artists</title>
</svelte:head>

<h1>Artists</h1>

<!-- <pre>
	{JSON.stringify(data, null, 2)}
</pre> -->

<ul>
	{#each data.artists as artist (artist.id)}
		<li>
			<a href={resolve(`/artists/${artist.id}`)}>{artist.name}</a>
			{#if artist.about}
				<p>{artist.about}</p>
			{/if}
		</li>
	{/each}
</ul>

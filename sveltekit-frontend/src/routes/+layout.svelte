<script lang="ts">
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href={resolve('/')}>Discover</a>
	<a href={resolve('/artists')}>Artists</a>
	<a href={resolve('/playlists')}>Playlists</a>
</nav>

<main>
	{@render children()}
</main>

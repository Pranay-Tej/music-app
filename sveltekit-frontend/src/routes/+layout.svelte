<script lang="ts">
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="container">
	<nav>
		<div>
			<a href={resolve('/')}>Discover</a>
			<a href={resolve('/artists')}>Artists</a>
			<a href={resolve('/playlists')}>Playlists</a>
		</div>
		{#if data.userInfo}
			<div>
				<span>{data.userInfo.display_name}</span>
				<a href={resolve('/logout')}>Logout</a>
			</div>
		{:else}
			<a href={resolve('/login')}>Login</a>
		{/if}
	</nav>

	<main>
		<!-- <pre>
			{JSON.stringify(data, null, 2)}
			</pre> -->
		{@render children()}
	</main>
</div>

<style>
	#container {
		max-width: 768px;
		margin: 3rem auto;
	}
	main {
		padding: 5rem;
	}
	nav {
		padding: 0 5rem;
		display: flex;
		justify-content: space-between;
	}
	nav div {
		display: flex;
		gap: 1rem;
	}
</style>

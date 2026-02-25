<script lang="ts">
	let { data } = $props();

	function formatDuration(seconds: number) {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<svelte:head>
	<title>{data.album.title}</title>
</svelte:head>

<a href="/artists/{data.album.artist_id}">&larr; {data.album.artist_name}</a>

<h1>{data.album.title}</h1>

<h2>Songs ({data.songs.length})</h2>

<ul>
	{#each data.songs as song}
		<li>
			{song.title}
			{#if song.duration}
				<span>({formatDuration(song.duration)})</span>
			{/if}
		</li>
	{/each}
</ul>

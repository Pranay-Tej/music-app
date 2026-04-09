<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let editing = $state(false);
	let submitting = $state(false);

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

<!-- <pre>
    {JSON.stringify(data, null, 2)}
</pre> -->

{#if editing}
	<form
		method="POST"
		action="?/edit"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
				editing = false;
			};
		}}
	>
		<input type="text" name="name" value={form?.name ?? data.playlist.name} required />
		<input
			type="text"
			name="description"
			placeholder="Description (optional)"
			value={form?.description ?? data.playlist.description ?? ''}
		/>
		<button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save'}</button>
		<button type="button" onclick={() => (editing = false)} disabled={submitting}>Cancel</button>
		{#if form?.error}
			<p>{form.error}</p>
		{/if}
	</form>
{:else}
	<h1>{data.playlist.name}</h1>
	{#if data.playlist.description}
		<p>{data.playlist.description}</p>
	{/if}
	<button onclick={() => (editing = true)}>Edit</button>
{/if}

<hr />

<form
	method="POST"
	action="?/delete"
	use:enhance={() => {
		submitting = true;
		return async ({ update }) => {
			await update();
			submitting = false;
		};
	}}
>
	<button type="submit" disabled={submitting}
		>{submitting ? 'Deleting...' : 'Delete Playlist'}</button
	>
</form>

<h2>{data.stats.total_songs} Songs &middot; {formatDuration(data.stats.total_duration)}</h2>

<ul>
	{#each data.playlistSongs as ps (ps.song_id)}
		<li>
			<p>{ps.song_title}</p>
			&mdash;<a href={resolve(`/artists/${ps.artist_id}`)}>{ps.artist_name}</a>
			{#if ps.album_id}
				&middot; <a href={resolve(`/albums/${ps.album_id}`)}>{ps.album_title}</a>
			{/if}
			<form method="POST" action="?/removeSong" use:enhance style="display:inline">
				<input type="hidden" name="song_id" value={ps.song_id} />
				<button type="submit">Remove</button>
			</form>
		</li>
	{/each}
</ul>

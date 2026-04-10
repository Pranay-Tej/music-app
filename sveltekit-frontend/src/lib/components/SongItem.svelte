<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDuration } from '$lib/utils.js';

	type Props = {
		song: {
			id: string;
			title: string;
			duration?: number;
			artist_id?: string;
			artist_name?: string;
			album_id?: string;
			album_title?: string;
		};
		playlists: { id: string; name: string }[];
		showArtist?: boolean;
		showAlbum?: boolean;
	};

	let { song, playlists, showArtist = true, showAlbum = true }: Props = $props();
	let selectedPlaylist = $state('');
	let submitting = $state(false);

	async function addToPlaylist() {
		if (!selectedPlaylist) return;
		submitting = true;
		await fetch('/api/playlist-songs', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ playlist_id: selectedPlaylist, song_id: song.id })
		});
		submitting = false;
		selectedPlaylist = '';
	}
</script>

<li>
	{song.title}
	{#if song.duration}
		<span>({formatDuration(song.duration)})</span>
	{/if}
	{#if showArtist && song.artist_id && song.artist_name}
		&mdash; <a href={resolve(`/artists/${song.artist_id}`)}>{song.artist_name}</a>
	{/if}
	{#if showAlbum && song.album_id && song.album_title}
		&middot; <a href={resolve(`/albums/${song.album_id}`)}>{song.album_title}</a>
	{/if}
	{#if playlists.length > 0}
		<select bind:value={selectedPlaylist}>
			<option value="">Add to playlist...</option>
			{#each playlists as pl (pl.id)}
				<option value={pl.id}>{pl.name}</option>
			{/each}
		</select>
		<button onclick={addToPlaylist} disabled={!selectedPlaylist || submitting}>
			{submitting ? 'Adding...' : 'Add'}
		</button>
	{/if}
</li>

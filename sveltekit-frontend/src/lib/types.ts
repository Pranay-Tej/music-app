// Row types matching sql/schema

export type Artist = {
	id: string;
	name: string;
	about: string | null;
	image_url: string | null;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
};

export type Album = {
	id: string;
	title: string;
	cover_art: string | null;
	description: string | null;
	release_date: string | null;
	artist_id: string | null;
	created_at: string;
	updated_at: string;
};

export type Song = {
	id: string;
	title: string;
	description: string | null;
	duration: number | null;
	lyrics: string | null;
	artist_id: string;
	album_id: string | null;
	created_at: string;
	updated_at: string;
};

export type User = {
	id: string;
	username: string;
	display_name: string;
	created_at: string;
	updated_at: string;
};

export type Playlist = {
	id: string;
	name: string;
	description: string | null;
	user_id: string;
	created_at: string;
	updated_at: string;
};

export type PlaylistSong = {
	playlist_id: string;
	song_id: string;
	added_at: string;
};

// Query result types (base row type & joined fields)

export type SongWithDetails = Song & {
	artist_name?: string;
	album_title?: string;
};

export type AlbumWithArtist = Album & {
	artist_name: string;
};

export type PlaylistSongWithDetails = PlaylistSong & {
	song_title: string;
	artist_id: string;
	artist_name: string;
	album_id: string | null;
	album_title: string | null;
};

export type PlaylistStats = {
	total_songs: number;
	total_duration: number;
};

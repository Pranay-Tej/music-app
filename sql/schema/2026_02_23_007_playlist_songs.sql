create table playlist_songs(
	playlist_id uuid not null,
	song_id uuid not null,
	added_at timestamptz default now(),
	--- pk
	primary key (playlist_id, song_id),
	--- fk
	foreign key (playlist_id) references playlists(id) on delete cascade,
	foreign key (song_id) references songs(id) on delete cascade
);
---
drop table playlist_songs;
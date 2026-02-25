--- artists clean
update artists
set created_at = now()
where created_at is null;
update artists
set updated_at = now()
where updated_at is null;
--- artists not null
alter table artists
alter column created_at
set not null;
alter table artists
alter column updated_at
set not null;
--- albums clean
update albums
set created_at = now()
where created_at is null;
update albums
set updated_at = now()
where updated_at is null;
--- albums not null
alter table albums
alter column created_at
set not null;
alter table albums
alter column updated_at
set not null;
--- songs clean
update songs
set created_at = now()
where created_at is null;
update songs
set updated_at = now()
where updated_at is null;
--- songs not null
alter table songs
alter column created_at
set not null;
alter table songs
alter column updated_at
set not null;
--- users clean
update users
set created_at = now()
where created_at is null;
update users
set updated_at = now()
where updated_at is null;
--- users not null
alter table users
alter column created_at
set not null;
alter table users
alter column updated_at
set not null;
--- playlists clean
update playlists
set created_at = now()
where created_at is null;
update playlists
set updated_at = now()
where updated_at is null;
--- playlists not null
alter table playlists
alter column created_at
set not null;
alter table playlists
alter column updated_at
set not null;
--- playlist_songs clean
update playlist_songs
set added_at = now()
where added_at is null;
--- playlist_songs not null
alter table playlist_songs
alter column added_at
set not null;
---
--- artists
alter table artists
alter column created_at drop not null;
alter table artists
alter column updated_at drop not null;
--- albums
alter table albums
alter column created_at drop not null;
alter table albums
alter column updated_at drop not null;
--- songs
alter table songs
alter column created_at drop not null;
alter table songs
alter column updated_at drop not null;
--- users
alter table users
alter column created_at drop not null;
alter table users
alter column updated_at drop not null;
--- playlists
alter table playlists
alter column created_at drop not null;
alter table playlists
alter column updated_at drop not null;
--- playlist_songs
alter table playlist_songs
alter column added_at drop not null;
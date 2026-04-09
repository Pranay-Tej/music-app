# Music App

A music app database schema built to learn SQL, schema design, and migrations with PostgreSQL.

## Tasks

- [x] Artists table
- [x] Albums table with artist FK
- [x] Songs table with artist/album FKs
- [x] Add description and release_date to albums
- [x] Users table
- [x] Playlists table with user FK and cascade delete
- [x] Playlist-songs junction table (composite PK, cascade deletes)
- [x] Add `NOT NULL` to `created_at`/`updated_at` across all tables (requires handling existing NULL values via migration)
- [x] Add date fields to users table
- [x] Soft deletes for artists (add `deleted_at` column, scheduled cleanup job)
- [ ] Scheduled cleanup job for soft-deleted artists (30 days)
- [ ] Playlists
  - [x] View my playlists
  - [x] View playlist details (songs, total duration)
    - [x] filter out soft-deleted artists
    - [x] get album, artist names
    - [x] optimize 3 separate sql queries
    - [ ] merge playlistSongs and stats into single query with OVER
  - [ ] Create playlist
  - [ ] Edit playlist (name, description)
  - [ ] Delete playlist
  - [ ] Add song to playlist
  - [ ] Remove song from playlist

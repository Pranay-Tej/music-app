--- name: PlaylistDetails :many
select ps.added_at,
    s.id as song_id,
    s.title as song_title,
    p.name as playlist_name,
    p.description as playlist_description,
    s.album_id as album_id,
    s.artist_id as artist_id,
    from playlist_songs ps
    inner join playlists p on p.id = ps.playlist_id
    inner join songs s on s.id = ps.song_id
where p.id = 'e0000000-0000-0000-0000-000000000001'
order by ps.added_at;
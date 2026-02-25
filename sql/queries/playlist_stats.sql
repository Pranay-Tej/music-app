--- name: GetPlaylistStats :one
select count(s.id) as total_songs,
    sum(s.duration) as total_duration
from playlist_songs ps
    inner join playlists p on p.id = ps.playlist_id
    inner join songs s on s.id = ps.song_id
where p.id = 'e0000000-0000-0000-0000-000000000001';
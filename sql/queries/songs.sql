-- name: GetSongsByArtistId :many
select
	s.id,
	s.title,
	s.description,
	s.duration,
	s.lyrics,
	s.album_id,
	a.cover_art ,
	a.title
from
	songs s
-- left join, singles are included
left join albums a
on s.album_id = a.id
where
	s.artist_id = 'a0000000-0000-0000-0000-000000000001'
order by
	s.updated_at desc
limit 10
offset 0;

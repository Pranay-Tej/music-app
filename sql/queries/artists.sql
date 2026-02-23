-- name: GetAllArtists :many
select
	id,
	title,
	description,
	artist_id ,
	cover_art ,
	release_date
from
	albums
where
	artist_id = 'a0000000-0000-0000-0000-000000000001'
order by
	updated_at desc;
--- name: GetUserPlaylists :many
select p.id,
    p.name,
    p.description,
    p.created_at,
    p.updated_at
from playlists p
where p.user_id = 'd0000000-0000-0000-0000-000000000001'
order by p.updated_at desc;
create table songs(
	id uuid primary key default gen_random_uuid(),
	title text not null,
	description text,
	duration integer,
	lyrics text,
	created_at timestamptz default now(),
	updated_at timestamptz default now(),
	--- fk
	artist_id uuid not null,
	album_id uuid,
	-- fk
	foreign key (artist_id) references artists(id),
	foreign key (album_id) references albums(id)
);


---
drop table songs;

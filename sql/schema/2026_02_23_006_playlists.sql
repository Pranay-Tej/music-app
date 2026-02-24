create table playlists(
	id uuid primary key default gen_random_uuid(),
	name text not null,
	description text,
	created_at timestamptz default now(),
	updated_at timestamptz default now(),
	--- fk
	user_id uuid not null,
	--- fk
	foreign key (user_id) references users(id) on delete cascade
);

---

drop table playlists;
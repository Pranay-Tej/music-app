create table users(
	id uuid primary key default gen_random_uuid(),
	username text unique not null,
	display_name text not null
);
---
drop table users;
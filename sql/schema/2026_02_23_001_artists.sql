CREATE TABLE artists(
	id uuid primary key default gen_random_uuid(),
	name text not null,
	about text,
	image_url text,
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);

---

DROP TABLE artists;

create table song_genres(
    song_id uuid not null,
    genre_id uuid not null,
    created_at timestamptz not null default now(),
    --pk
    primary key (song_id, genre_id),
    --fk
    foreign key (song_id) references songs(id) on delete cascade,
    foreign key (genre_id) references genres(id) on delete cascade
);

---
drop table song_genres;
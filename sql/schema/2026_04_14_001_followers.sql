create table user_followers(
    follower_id uuid not null,
    following_id uuid not null,
    added_at timestamptz default now(),
    --pk
    primary key (follower_id, following_id),
    --fk
    foreign key (follower_id) references users(id) on delete cascade,
    foreign key (following_id) references users(id) on delete cascade,
    --constraints
    check (follower_id != following_id)
);
---
drop table user_followers;
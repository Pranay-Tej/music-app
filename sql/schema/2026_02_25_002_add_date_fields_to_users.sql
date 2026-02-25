alter table users
add column created_at timestamptz default now() not null;
alter table users
add column updated_at timestamptz default now() not null;
---
alter table users drop column created_at;
alter table users drop column updated_at;
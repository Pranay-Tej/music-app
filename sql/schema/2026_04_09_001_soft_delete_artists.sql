alter table artists
add column deleted_at timestamptz;
---
alter table artists drop column deleted_at;

alter table albums add column description text;
alter table albums add column release_date date;

---
alter table albums drop column description;
alter table albums drop column release_date;
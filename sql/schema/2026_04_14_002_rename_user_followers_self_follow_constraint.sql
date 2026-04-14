alter table user_followers
    drop constraint user_followers_check,
    add constraint no_self_follow check (follower_id != following_id); 
---
alter table user_followers
    drop constraint no_self_follow,
    add constraint user_followers_check check (follower_id != following_id)
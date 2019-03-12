begin transaction;

insert into users(name, email, entries, joined) values ('Jessie', 'jessie@gmail.com', 5, '2018-01-01');
insert into login(hash, email) values ('$2a$10$td98R4vUlcldTRC69ClGQOD0wz3fzBcC3jBxwEPYgNdR3eZVp43gu', 'jessie@gmail.com');

commit;
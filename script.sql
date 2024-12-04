-- Скрипт для старта работы. Всё остальное, как я понимаю, должен создать хибер
-- USER`a можно создать потом через админа

insert into roles (id,role) values (1,'ADMIN'),(2,'USER');
insert into users (id,age,password,email,first_name,last_name) values
                                                                   (1,22,'ADMIN','ADMIN@mail.ru','ADM_firs','ADM_last'),
                                                                   (2,33,'USER','USER@mail.ru','USR_firs','USR_last');
insert into users_roles (roles_id,user_id) values (1,1),(2,2);
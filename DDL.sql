create database if not exists chat_sg;

use chat_sg;

create table if not exists user (
  id bigint unsigned not null auto_increment,
  firstname varchar(50) not null,
  lastname varchar(50) not null,
  email varchar(100) not null,
  avatar text not null,
  password varchar(100) not null,
  primary key (id),
  unique key email (email)
);

create table if not exists message (
  id bigint unsigned not null auto_increment,
  content varchar(255) not null,
  sender_id bigint unsigned,
  recipient_id bigint unsigned,
  primary key (id),
  foreign key (sender_id) references user (id),
  foreign key (recipient_id) references user (id)
);
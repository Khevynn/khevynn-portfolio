DROP DATABASE IF EXISTS portfolio;
CREATE DATABASE portfolio;
USE portfolio;

CREATE TABLE projects(
    id serial primary key not null,
    name varchar(100) not null,
    status varchar(50) not null,
    description text not null,
    used_technologies text,
    github_url varchar(200),
    download_url varchar(200),
    image_url varchar(200)
);

SELECT * FROM projects;
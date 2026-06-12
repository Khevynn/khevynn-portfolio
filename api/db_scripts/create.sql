DROP DATABASE IF EXISTS portfolio;
CREATE DATABASE portfolio;
USE portfolio;

CREATE TABLE projects(
    id serial primary key not null,
    name varchar(100) not null,
    slug varchar(150) not null unique,
    description text not null,
    short_description varchar(500),
    detailed_description longtext,
    impact_metrics text,
    category varchar(50) not null default 'Other',
    tech_tags text,
    status varchar(50) not null default 'In Progress',
    is_featured tinyint(1) not null default 0,
    display_order int not null default 0,
    is_published tinyint(1) not null default 1,
    used_technologies text,
    github_url varchar(200),
    download_url varchar(200),
    image_url varchar(200),
    gallery_images text,
    live_demo_url varchar(300),
    documentation_url varchar(300),
    video_demo_url varchar(300)
);

CREATE TABLE users(
    id serial primary key not null,
    password varchar(200) not null,
    email varchar(100) not null unique,
    refresh_token varchar(200)
);

SELECT * FROM projects;
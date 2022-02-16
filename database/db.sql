-- news feeds 
USE DATABASE newsapp;

CREATE TABLE feeds (
    id PRIMARY KEY,
    article_thumbnail BYTEA,
    headline VARCHAR(200) NOT NULL,
    category VARCHAR(200) NOT NULL,
    author_name VARCHAR(200) NOT NULL,
    upload_time TIMESTAMP WITHOUT TIMEZONE DEFAULT (NOW() AT TIMEZONE 'UTC')
);

CREATE TABLE author (
    author_id PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(12) NOT NULL,
    phoneNo NUMERIC(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    time_of_birth TIME NOT NULL,
    gender NOT NULL,
    marital_status NOT NULL,
    language VARCHAR(20) NOT NULL,
    profile_picture BYTEA NOT NULL,
    CHECK(gender IN ("female", "male"))
);
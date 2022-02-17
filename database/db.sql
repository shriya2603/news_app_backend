-- news feeds 
CREATE DATABASE newsapp;

-- create Feeds table 
CREATE TABLE feeds (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    article_thumbnail BYTEA,
    headline VARCHAR(200) NOT NULL,
    category VARCHAR(200) NOT NULL,
    author_name VARCHAR(200) NOT NULL,
    upload_time TIMESTAMP DEFAULT NOW()
);

-- Create Author table 
CREATE TABLE author (
    author_id BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(12) NOT NULL,
    phoneNo NUMERIC(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    time_of_birth TIME NOT NULL,
    gender VARCHAR(6) NOT NULL,
    marital_status VARCHAR(20) NOT NULL,
    language VARCHAR(20) NOT NULL,
    profile_picture BYTEA NOT NULL
);

-- Sample feeds data 
INSERT INTO feeds (article_thumbnail,headline, category, author_name) VALUES (pg_read_binary_file('C:\studies\study_material\Workspace\Projects\news_api\database\snakeNews.png'),'Meet the man who rescues', 'general','Ram Sharma'); 

INSERT INTO feeds (article_thumbnail,headline, category, author_name) VALUES (pg_read_binary_file('C:\studies\study_material\Workspace\Projects\news_api\database\technews.png'),'Russia-Linked Hackers Bagged $400 Million in Crypto From Ransomware Attacks, Reports Chainalysis', 'technology',' Shomik Sen Bhattacharjee');

INSERT INTO feeds (article_thumbnail,headline, category, author_name) VALUES (pg_read_binary_file('C:\studies\study_material\Workspace\Projects\news_api\database\technews.png'),'Kremlin Denies Russia Behind Ukraine Cyberattack', 'technology','Agence France-Presse');

INSERT INTO feeds (article_thumbnail,headline, category, author_name) VALUES (pg_read_binary_file('C:\studies\study_material\Workspace\Projects\news_api\database\technews.png'),'Apple Spotted Registering Three New Mac Models on EEC Ahead of Rumoured March 8 Event', 'technology','Sourabh Kulesh ');

-- sample user data 


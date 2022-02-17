-- news feeds 
CREATE DATABASE newsapp;

-- create Feeds table 
CREATE TABLE feeds (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    article_thumbnail BYTEA,
    headline VARCHAR(200) NOT NULL,
    category VARCHAR(200) NOT NULL,
    author_name VARCHAR(200) NOT NULL,
    author_id BIGSERIAL NOT NULL, 
    upload_time TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (author_id) REFERENCES author(author_id)
);

-- creation of author table 
CREATE TABLE author (
    author_id BIGSERIAL NOT NULL PRIMARY KEY,
    author_name VARCHAR(20) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password TEXT NOT NULL,
    phoneNo NUMERIC(10) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    language VARCHAR(20) NOT NULL,
    profile_picture BYTEA NOT NULL
); 

-- Create user table 
CREATE TABLE user_data (
    userid BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password TEXT NOT NULL,
    phoneNo NUMERIC(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    time_of_birth TIME NOT NULL,
    gender VARCHAR(6) NOT NULL,
    marital_status VARCHAR(20) NOT NULL,
    language VARCHAR(20) NOT NULL,
    profile_picture BYTEA NOT NULL
);

-- sample user data 
INSERT INTO author (author_name, email, password, phoneNo, gender, language, profile_picture) VALUES ('SourabhKulesh','sourabhkulesh@gmail.com', crypt('johnspassword', gen_salt('bf')), 1234567890, 'male', 'English', pg_read_binary_file('C:\studies\study_material\Workspace\Projects\news_api\database\profile.png'));

INSERT INTO author (author_name, email, password, phoneNo, gender, language, profile_picture) VALUES ('Agence France Presse','agencepresse@gmail.com', crypt('johnspassword', gen_salt('bf')), 1234567890, 'male', 'English', pg_read_binary_file('C:\studies\study_material\Workspace\Projects\news_api\database\profile.png'));

INSERT INTO author (author_name, email, password, phoneNo, gender,language, profile_picture)  VALUES ('Shomik Sen','sen123@gmail.com', crypt('senpassword', gen_salt('bf')), 1234567890, 'male', 'English', pg_read_binary_file('C:\studies\study_material\Workspace\Projects\news_api\database\profile.png'));

-- Sample feeds data 
INSERT INTO feeds (article_thumbnail,headline, category, author_name, author_id) VALUES (pg_read_binary_file('C:\studies\study_material\Workspace\Projects\news_api\database\snakeNews.png'),'Meet the man who rescues snake', 'general',' Shomik Sen', 3); 

INSERT INTO feeds (article_thumbnail,headline, category, author_name, author_id) VALUES (pg_read_binary_file('C:\studies\study_material\Workspace\Projects\news_api\database\technews.png'),'Russia-Linked Hackers Bagged $400 Million in Crypto From Ransomware Attacks, Reports Chainalysis', 'technology','Shomik Sen', 3);

INSERT INTO feeds (article_thumbnail,headline, category, author_name, author_id) VALUES (pg_read_binary_file('C:\studies\study_material\Workspace\Projects\news_api\database\technews.png'),'Kremlin Denies Russia Behind Ukraine Cyberattack', 'technology','Agence France Presse', 2);

INSERT INTO feeds (article_thumbnail,headline, category, author_name, author_id ) VALUES (pg_read_binary_file('C:\studies\study_material\Workspace\Projects\news_api\database\technews.png'),'Apple Spotted Registering Three New Mac Models on EEC Ahead of Rumoured March 8 Event', 'technology','Sourabh Kulesh', 1);

-- User 
INSERT INTO user_data (username, email, password, phoneNo, date_of_birth, time_of_birth, gender, marital_status, language, profile_picture) VALUES ('Raj Sharma','raj123@gmail.com', crypt('rajpassword', gen_salt('bf')), 1234567890, '2016-06-23', '08:00:00', 'male', 'single', 'English', pg_read_binary_file('C:\studies\study_material\Workspace\Projects\news_api\database\profile.png'));


-- {
-- "username": "rajj",
-- "email":"ss",
-- "password":"pinkredgreen",
-- "phoneNo":1234567890,
-- "date_of_birth":"2016-06-23",
-- "time_of_birth": "08:00:00",
-- "gender":"male",
-- "marital_status":"single",
-- "language": "english",
-- "profile_picture":"C:\studies\study_material\Workspace\Projects\news_api\database\profile.png"
-- }
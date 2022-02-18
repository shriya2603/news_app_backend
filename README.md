<h1 align="center">News App Backend </h1>

# News App Backend

News App API s to get all the news feeds, sorting feeds by upload time, adding filter by news category, author etc , creating or updating the user profile.

## Technology Used

- Backend: NodeJS
- Database: PostgreSQL

## Database

Currently, PostgreSQL (i.e ORDBMS = Relational + Object Oriented model) is used for storing feeds, author and user details. Can move to NoSQL (Unstructured database ) if we decide to store videos, audios files and decide to scale to massive users (As NoSQL can easily be horizonally scalled )
All the SQL Queries used for creating the tables and inserting data are present in [database\db.sql]

### Database Tables

- Author - (author_id, author_name, email, password, phoneNo, gender, language, profile_picture )

- Feeds - (id, article_thumbnail, headline, category, author_name, author_id, upload_time)

- User Data - (userid, username, email, password, phoneNo, date_of_birth, time_of_birth, gender,marital_status, language, profile_picture )

Here, password field is being encrypted and saved in database using crypt () (pgcryto entension )
All the images are stores as binary data in database using BYTEA datatype.
All the data are validated first and then stored in database.

## API s Examples

Curently I am not displaying any images as its a binary file and in postman we see the whole binary content instead of the image. But while integrating with backend we can just change the query by using "SELECT \* FROM feeds;" .

- Get Feeds: Sample URL: http://localhost:3006/getFeeds
  ![Get Feeds API ](/postman_screenshots/Get_Feeds.PNG)

- Filter: Sample URL http://localhost:3006/getFeedsByFilter?category=technology&author_name=Shomik Sen
  ![Filter Feeds API ](/postman_screenshots/Get_Feeds_By_Filter.PNG)

- Search by headline or authorname:Sample URL http://localhost:3006/getFeedsBySearchString/sen
  ![Search by headline or authorname API ](/postman_screenshots/Search_Feeds.PNG)

- Sort By: Sample URL http://localhost:3006/getSortedFeedsBy?orderBy=ASC&sortBy=upload_time
  ![Sort By API ](/postman_screenshots/Sort_Feeds_By_Uploadtime.PNG)

- Get user details: Sample URL http://localhost:3006/getMyProfile/1
  ![Get user details API ](/postman_screenshots/Get_User_Profile.PNG)

- Create or Update User Profile: Sample URL http://localhost:3006/addOrUpdateMyProfile/1
  ![Create or Update User API ](/postman_screenshots/Cre_Update_User_Profile.PNG)

Postman Collections Link: /postman_screenshots/News App API.postman_collection.json

## Set up

To set up PostgreSQL
Run all the sql queries present in database/db.sql
Create a .env File and mention below details:

<br>PORT=
<br>PGUSER=
<br>PGHOST=
<br>PGPASSWORD=
<br>PGDATABASE=
<br>PGPORT=

To start the NodeJS Server

- npm init
- npm install
- npm start

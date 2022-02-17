const express = require("express");
const router = express.Router();
const db = require("./database");

// Get Feeds: http://localhost:3006/getFeeds
router.get("/getFeeds", async (request, response) => {
  try {
    const { rows: feeds } = await db.query(
      "SELECT headline, category, author_name, author_id FROM feeds;"
    );
    if (feeds != null && feeds.length <= 0) {
      response.status(200).json({
        status: "success",
        data: { feeds: "No feeds available " },
      });
    }
    response.status(200).json({
      status: "success",
      results: feeds.rows.length,
      data: { feeds: feeds.rows },
    });
  } catch (error) {
    // console.log(error);
    response.status(500).send(error);
  }
});

// Filter : http://localhost:3006/getFeedsByFilter?category=technology&author_name=Shomik Sen
router.get("/getFeedsByFilter", async (request, response) => {
  try {
    const { rows: feeds } = await db.query(
      "SELECT headline, category, author_name, author_id FROM feeds;"
    );
    if (feeds != null && feeds.length <= 0) {
      response.status(200).json({
        status: "success",
        data: { feeds: "No feeds available " },
      });
    }
    const filters = request.query;
    const filteredFeeds = feeds.filter((feed) => {
      let isValid = true;
      for (key in filters) {
        console.log(key, feed[key], filters[key]);
        isValid = isValid && feed[key] == filters[key];
      }
      return isValid;
    });
    response.status(200).json({
      status: "success",
      results: filteredFeeds.length,
      data: { feeds: filteredFeeds },
    });
  } catch (error) {
    // console.log(error);
    response.status(500).send(error);
  }
});

// Search by headline and authorname : http://localhost:3006/getFeedsBySearchString/sen
router.get(
  "/getFeedsBySearchString/:searchString",
  async (request, response) => {
    try {
      const { rows: feeds } = await db.query(
        "SELECT headline, category, author_name, author_id FROM feeds;"
      );
      if (feeds != null && feeds.length <= 0) {
        response.status(200).json({
          status: "success",
          data: { feeds: "No feeds available " },
        });
      }
      const searchString = request.params.searchString.toLowerCase();
      const searchedFeeds = feeds.filter((feed) => {
        return (
          feed.headline.toLowerCase().includes(searchString) ||
          feed.author_name.toLowerCase().includes(searchString)
        );
      });
      response.status(200).json({
        status: "success",
        results: searchedFeeds.length,
        data: { feeds: searchedFeeds },
      });
    } catch (error) {
      response.status(500).send(error);
    }
  }
);

// Sort By : http://localhost:3006/getSortedFeedsBy?orderBy=ASC&sortBy=upload_time
router.get("/getSortedFeedsBy", async (request, response) => {
  try {
    const orderBy = request.query.orderBy;
    const sortBy = request.query.sortBy;
    let query =
      "SELECT headline, category, author_name, author_id, upload_time FROM feeds ORDER BY $1;";
    if (orderBy == "DESC") {
      query =
        "SELECT headline, category, author_name, author_id, upload_time FROM feeds ORDER BY $1 DESC;";
    }
    const { rows: feeds } = await db.query(query, [sortBy]);
    //console.log(feeds);
    if (feeds != null && feeds.length <= 0) {
      response.status(200).json({
        status: "success",
        data: { feeds: "No feeds available " },
      });
    }
    response.status(200).json({
      status: "success",
      results: feeds.length,
      data: { feeds: feeds },
    });
  } catch (error) {
    // console.log(error);
    response.status(500).send(error);
  }
});

// get user details :http://localhost:3006/getMyProfile/1
router.get("/getMyProfile/:id", async (request, response) => {
  try {
    const { rows: user } = await db.query(
      "SELECT userid, username, email FROM user_data where userid=$1",
      [request.params.id]
    );
    console.log(user);
    response.status(200).json({
      status: "success",
      data: { user: user },
    });
  } catch (error) {
    console.log(error);
    response.status(500).send("An error occured ");
  }
});

router.put("/addOrUpdateMyProfile/:id", async (request, response) => {
  try {
    const { rows: user } = await db.query(
      "SELECT * FROM user_data where userid=$1",
      [request.params.id]
    );
    //console.log(request);
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    const phoneNo = request.body.phoneNo;
    const date_of_birth = request.body.date_of_birth;
    const time_of_birth = request.body.time_of_birth;
    const gender = request.body.gender;
    const marital_status = request.body.marital_status;
    const language = request.body.language;
    const profile_picture = request.body.profile_picture;
    if (
      username != null &&
      email != null &&
      password != null &&
      phoneNo != null &&
      date_of_birth != null &&
      time_of_birth != null &&
      gender != null &&
      marital_status != null &&
      language != null &&
      profile_picture != null &&
      validatePassword(password) &&
      validateEmail(email) &&
      validatePhoneNo(phoneNo)
    ) {
      let addedOrUpdatedUser = [];
      if (user == null || user.length < 0) {
        // Insert details
        addedOrUpdatedUser = await db.query(
          "INSERT INTO user_data (username, email, password, phoneNo, date_of_birth, time_of_birth, gender, marital_status, language, profile_picture) VALUES ($1,$2, crypt($3, gen_salt('bf')), $4, $5, $6, $7, $8, $9, pg_read_binary_file($10)) returning *",
          [
            username,
            email,
            password,
            phoneNo,
            date_of_birth,
            time_of_birth,
            gender,
            marital_status,
            language,
            profile_picture,
          ]
        );
      } else {
        addedOrUpdatedUser = await db.query(
          "UPDATE user_data SET username=$1, email=$2, password=crypt($3, gen_salt('bf')), phoneNo=$4, date_of_birth=$5, time_of_birth=$6, gender=$7, marital_status=$8, language=$9, profile_picture=pg_read_binary_file($10) WHERE userid=$11 returning *",
          [
            username,
            email,
            password,
            phoneNo,
            date_of_birth,
            time_of_birth,
            gender,
            marital_status,
            language,
            profile_picture,
            req.params.id,
          ]
        );
      }
      console.log(addedOrUpdatedUser);
      response.status(200).json({
        status: "success",
        data: { user: addedOrUpdatedUser },
      });
    } else {
      response
        .status(400)
        .send("Please enter all details with correct inputs ");
    }
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = router;

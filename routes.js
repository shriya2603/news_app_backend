const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/getFeeds", async (request, response) => {
  try {
    const feeds = await db.query("SELECT * FROM newfeeds;");
    res.status(200).json({
      status: "success",
      results: feeds.rows.length,
      data: { feeds: feeds.rows },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured ");
  }
});

module.exports = router;

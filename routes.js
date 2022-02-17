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

// // Method to set salt and hash the password for a user
// UserSchema.methods.setPassword = function(password) {

//  // Creating a unique salt for a particular user
//     this.salt = crypto.randomBytes(16).toString('hex');

//     // Hashing user's salt and password with 1000 iterations,

//     this.hash = crypto.pbkdf2Sync(password, this.salt,
//     1000, 64, `sha512`).toString(`hex`);
// };

// // Method to check the entered password is correct or not
// UserSchema.methods.validPassword = function(password) {
//     var hash = crypto.pbkdf2Sync(password,
//     this.salt, 1000, 64, `sha512`).toString(`hex`);
//     return this.hash === hash;
// };

//https://medium.com/@alexishevia/storing-passwords-securely-with-postgresql-and-pgcrypto-87151a318998

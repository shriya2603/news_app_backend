require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/", routes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server up and listening at port " + port);
});

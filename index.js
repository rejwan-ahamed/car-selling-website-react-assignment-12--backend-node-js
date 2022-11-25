const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

// middle ware
app.use(cors());
app.use(express.json());

// get test api
app.get("/", (req, res) => {
  res.send("get api is working");
});

// api listening
app.listen(port, () => {
  console.log("api listening port is", port);
});

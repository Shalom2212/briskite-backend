require("dotenv").config();
const express = require("express");
const authRoute = require("./routes/authRoute");
const restaurantRoute = require("./routes/restaurantsRoute");
const app = express();

app.use(express.json());
app.use(authRoute);
app.use(restaurantRoute);

app.all("*", (req, res) => {
  res.status(404).send("404 NOT FOUND");
});

module.exports = app;

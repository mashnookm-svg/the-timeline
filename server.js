require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./config/routes");
const formatDate = require("./helpers/formatDate");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.locals.formatDate = formatDate;

app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

mongoose.connect(process.env.MONGODB_URI)
  .then(function () {
    console.log("Connected to MongoDB");
    app.listen(PORT, function () {
      console.log("Server is running on http://localhost:" + PORT);
    });
  })
  .catch(function (err) {
    console.error("MongoDB connection failed:", err.message);
  });
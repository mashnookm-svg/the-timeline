const express = require("express");
const route = express.Router();
const postController = require("../controller/postController");

route.get("/", postController.showTimeline);

module.exports = route;
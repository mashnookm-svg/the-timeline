const express = require("express");
const route = express.Router();
const postController = require("../controller/postController");

route.get("/", postController.showHome);
route.post("/", postController.createPost);

route.get("/edit/:id", postController.showEditForm);
route.post("/edit/:id", postController.updatePost);
route.post("/delete/:id", postController.deletePost);

route.get("/:id", postController.showOne);

module.exports = route;
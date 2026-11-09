const mongoose = require("mongoose");
const Post = require("../models/Post");

function sendError(res, err) {
  console.error(err);
  res.status(500).send("Something went wrong.");
}

function validationMessage(err) {
  return err.errors && err.errors.post ? err.errors.post.message : err.message;
}

async function renderHome(res, error, oldText) {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render("home", { posts: posts, error: error, oldText: oldText });
}

async function showHome(req, res) {
  try {
    await renderHome(res, null, "");
  } catch (err) {
    sendError(res, err);
  }
}

async function createPost(req, res) {
  const text = (req.body.post || "").trim();
  try {
    await Post.create({ post: text });
    res.redirect("/");
  } catch (err) {
    if (err.name === "ValidationError") {
      try {
        await renderHome(res, validationMessage(err), text);
      } catch (err2) {
        sendError(res, err2);
      }
    } else {
      sendError(res, err);
    }
  }
}

async function showOne(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) return res.status(404).send("Post not found");

    const post = await Post.findById(id);
    if (!post) return res.status(404).send("Post not found");

    res.render("show", { post: post });
  } catch (err) {
    sendError(res, err);
  }
}

async function showEditForm(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) return res.status(404).send("Post not found");

    const post = await Post.findById(id);
    if (!post) return res.status(404).send("Post not found");

    res.render("edit", { post: post, error: null });
  } catch (err) {
    sendError(res, err);
  }
}

async function updatePost(req, res) {
  const id = req.params.id;
  const text = (req.body.post || "").trim();
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(404).send("Post not found");

    const updated = await Post.findByIdAndUpdate(
      id,
      { post: text },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).send("Post not found");

    res.redirect("/" + id);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.render("edit", { post: { _id: id, post: text }, error: validationMessage(err) });
    } else {
      sendError(res, err);
    }
  }
}

async function deletePost(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) return res.status(404).send("Post not found");

    await Post.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    sendError(res, err);
  }
}

module.exports = {
  showHome, createPost, showOne, showEditForm, updatePost, deletePost
};
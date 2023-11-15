const { response } = require("express");
const Post = require("../model/postModel");
const textApiProvider = require("../provider/textApiProvider");

exports.getFiles = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createFile = async (req, res) => {
  let randomText;
  try {
    randomText = await textApiProvider.getLoremIpsum();
    if (!randomText) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to retrieve random text",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error fetching random text",
    });
  }

  const { title, author } = req.body;

  try {
    const newPost = await Post.create({ title, content: randomText, author });
    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateFile = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found",
      });
    }

    res.status(200).json({
      status: "success post updated",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail ",
      message: err,
    });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAFile = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

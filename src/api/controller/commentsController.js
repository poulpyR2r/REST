const Post = require("../model/postModel");
const Comment = require("../model/commentsModel");

exports.getAllcommentsForPost = async (req, res) => {
  const id = req.params.id_post;

  try {
    const comments = await Comment.find({ post: id });
    res.status(200).json({
      status: "success",
      results: comments.length,
      data: {
        comments,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createCommentForPost = async (req, res) => {
  const id = req.params.id_post;
  const { name, message } = req.body;

  console.log(req.body);
  try {
    const comments = await Comment.create({ name, message, post: id });
    res.status(200).json({
      status: "success",
      data: {
        comments,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateAComment = async (req, res) => {
  const id = req.params.id_comment;
  const { name, message } = req.body;

  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      { name, message },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "succes",
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAComment = async (req, res) => {
  const id = req.params.id_comment;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAComment = async (req, res) => {
  const id = req.params.id_comment;
  try {
    const comment = await Comment.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

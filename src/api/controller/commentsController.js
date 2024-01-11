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
      status: "fail comment not found",
      message: err,
    });
  }
};

exports.createCommentForPost = async (req, res) => {
  const id = req.params.id_post;
  const { name, message } = req.body;

  try {
    const comments = await Comment.create({ name, message, post: id });
    res.status(200).json({
      status: "success comment created",
      data: {
        comments,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail comment not created",
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
    if (!comment) {
      res.status(404).json({
        status: "fail comment not found",
      });
    }
    res.status(200).json({
      status: "succes comment updated",
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
      status: "success comment deleted",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail comment not deleted",
      message: err,
    });
  }
};

exports.getAComment = async (req, res) => {
  const id = req.params.id_comment;
  try {
    const comment = await Comment.findById(id);
    res.status(200).json({
      status: "success comment found",
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail comment not found",
      message: err,
    });
  }
};

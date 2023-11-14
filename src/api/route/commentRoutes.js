const express = require("express");
const router = express.Router();

const {
  getAllcommentsForPost,
  createCommentForPost,
  updateAComment,
  deleteAComment,
  getAComment,
} = require("../controller/commentsController");

router.get("/get/:id_post", getAllcommentsForPost);
router.post("/create/:id_post", createCommentForPost);

router.put("/patch/:id_comment", updateAComment);
router.delete("/delete/:id_comment", deleteAComment);
router.get("/getacomment/:id_comment", getAComment);

module.exports = router;

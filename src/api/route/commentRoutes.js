const express = require("express");
const router = express.Router();

const {
  getAllcommentsForPost,
  createCommentForPost,
  updateAComment,
  deleteAComment,
  getAComment,
} = require("../controller/commentsController");

const {
  verifyToken,
  verifyAdmin,
  verifyUser,
} = require("../middleware/AuthVerification");

router.get("/get/:id_post", verifyToken, getAllcommentsForPost);
router.post("/create/:id_post", verifyToken, createCommentForPost);

router.put("/patch/:id_comment", verifyToken, updateAComment);
router.delete("/delete/:id_comment", verifyToken, deleteAComment);
router.get("/getacomment/:id_comment", verifyToken, getAComment);

module.exports = router;

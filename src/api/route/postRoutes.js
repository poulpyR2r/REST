const express = require("express");
const {
  getFiles,
  createFile,
  updateFile,
  deleteFile,
  getAFile,
} = require("../controller/postController");

const router = express.Router();

router.get("/get", getFiles);
router.post("/create", createFile);
router.put("/patch/:id", updateFile);
router.delete("/delete/:id", deleteFile);
router.get("/get/:id", getAFile);

module.exports = router;

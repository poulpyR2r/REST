const express = require("express");
const router = express.Router();


const {} = require("../controller/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
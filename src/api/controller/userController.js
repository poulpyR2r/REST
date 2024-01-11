const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtkey = process.env.JWT_SECRET;

const bcrypt = require("bcryptjs");
const User = require("../model/userModel");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
    });
    const createdUser = await user.save();
    res.status(201).send({
      status: "success",
      data: {
        name: createdUser.name,
        email: createdUser.email,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(500).send({ message: "User not found" });
      return;
    }
    if (user.email === req.body.email && user.password === req.body.password) {
      const userData = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(userData, jwtkey, { expiresIn: "1h" });
      res.status(200).json({ token });
    } else {
      res.status(401).send({ message: "mot de pas ou email incorrect" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//evolution schema / stoqué dans la session  / revoir model / verification role / admin droit de posté /

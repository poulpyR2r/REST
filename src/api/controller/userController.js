const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.status(200).json({
      status: "success user created",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail user not created",
      message: err,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await User.find({ email, password });
    if (!response) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail ",
      message: error,
    });
  }
};

exports.lougoutUser = async (req, res) => {};

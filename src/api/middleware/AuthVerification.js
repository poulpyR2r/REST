const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Missing authorization header" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userData.userId });
    console.log(user.role);
    if (user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return next();
  } catch (error) {
    console.error("Error verifying admin:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { verifyToken, verifyAdmin };

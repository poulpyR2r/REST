const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtkey = process.env.JWT_SECRET;

// exports.verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers["authorization"];
//     if (token !== undefined) {
//       const payload = await new Promise((resolve, reject) => {
//         jwt.verify(token, jwtkey, (error, decoded) => {
//           if (error) return reject(error);
//           resolve(decoded);
//         });
//       });
//       req.user = payload;
//       next();
//     } else {
//       res.status(403).json({
//         status: "fail",
//         message: "token manquant",
//       });
//     }
//   } catch (error) {
//     res.status(403).json({
//       status: "fail",
//       message: "token invalid",
//     });
//   }
// };

// exports.verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: "Missing authorization header" });
//   }
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     req.token = token;
//     console.log(token);  }
//   try {
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     req.userData = { userId: decodedToken.userId, email: decodedToken.email };
//     next();
//   } catch (error) {
//     console.error("Error verifying token:", error.message);
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    console.log(jwtkey);
    if (token !== undefined) {
      const payload = await new Promise((resolve, reject) => {
        jwt.verify(token, jwtkey, (error, decoded) => {
          if (error) {
            reject(error);
          } else {
            resolve(decoded);
          }
        });
      });
      req.user = payload;
      next();
    } else {
      res.status(403).json({ message: "Accès interdit: token manquant" });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Accès interdit: token invalide" });
  }
};

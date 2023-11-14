const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://127.0.0.1:27017/compteRendu");

if (connect) {
  console.log("Database connected");
} else {
  console.log("Database connection failed");
}

module.exports = connect;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("../src/api/route/postRoutes");
const hostname = "0.0.0.0";

const port = 5555;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/post", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/exo-node")
  .then(() => {
    console.log("Database connected");

    // Start the server after successful database connection
    app.listen(port, hostname, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

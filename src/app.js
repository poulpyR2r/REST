const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("../src/api/route/postRoutes");
const commentRoutes = require("../src/api/route/commentRoutes");
const userRoute = require("../src/api/route/userRoute");
const hostname = "0.0.0.0";

const port = 3000;
const app = express();

// swagger :

// docker
// mongoose.connect("mongodb://mongo/apinode");

// local
mongoose
  .connect("mongodb://127.0.0.1:27017/apinode")
  .then(() => console.log("MongoDB Connected"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});

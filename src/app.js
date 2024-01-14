const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("../src/api/route/postRoutes");
const commentRoutes = require("../src/api/route/commentRoutes");
const userRoute = require("../src/api/route/userRoute");
const hostname = "0.0.0.0";
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const port = 3000;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/apinode")
  .then(() => console.log("MongoDB Connected"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api Node",
      version: "1.0.0",
      description: "A simple API",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
    components: {
      securitySchemes: {
        Authorization: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    security: [
      {
        Authorization: [],
      },
    ],
  },
  apis: ["./src/api/route/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

module.exports = app; 

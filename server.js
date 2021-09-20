require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT;

mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("mongo connected")
);

app.listen(port, console.log(`express app running on port:${port}`));

// express routes
const authRoute = require("./routes/auth");
const blogRoute = require("./routes/blog");
const workRoute = require("./routes/work");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/blog", blogRoute);
app.use("/work", workRoute);

require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT;

mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("mongo connected")
);

app.listen(port, console.log(`express app running on port:${port}`));

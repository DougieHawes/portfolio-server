const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
  imageDark: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);

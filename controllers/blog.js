const formidable = require("formidable");
const fs = require("fs");

const Post = require("../models/postModel");

exports.createPost = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "image could not be uploaded",
      });
    }

    let newPost = new Post(fields);

    if (files.image) {
      newPost.image.data = fs.readFileSync(files.image.path);
      newPost.image.contentType = files.image.type;
    }

    newPost.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: "server error",
        });
      }

      res.status(200).json(result);
    });
  });
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};

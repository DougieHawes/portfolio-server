const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  const { imageDark, title, date, text } = req.body;

  try {
    const newPost = new Post({ imageDark, title, date, text });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
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

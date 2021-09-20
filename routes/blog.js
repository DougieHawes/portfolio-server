const router = require("express").Router();

const { isAuth } = require("../controllers/auth");
const { createPost, getPosts } = require("../controllers/blog");

router.post("/", isAuth, createPost);
router.get("/", getPosts);

module.exports = router;

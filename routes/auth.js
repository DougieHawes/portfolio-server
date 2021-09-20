const router = require("express").Router();

const {
  newUser,
  signIn,
  signOut,
  getUser,
  isAuth,
} = require("../controllers/auth");

router.post("/", newUser);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/user", isAuth, getUser);

module.exports = router;

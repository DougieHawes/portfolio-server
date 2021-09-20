const router = require("express").Router();

const { isAuth } = require("../controllers/auth");
const { createWork, getWork } = require("../controllers/work");

router.post("/", isAuth, createWork);
router.get("/", getWork);

module.exports = router;

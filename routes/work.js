const router = require("express").Router();

const { createWork, getWorks } = require("../controllers/work");

router.post("/", createWork);
router.get("/", getWorks);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getHowWeDoIt,
  createHowWeDoIt,
} = require("../controllers/howWeDoItController");

router.get("/", getHowWeDoIt);
router.post("/", createHowWeDoIt); // (I added this for admin)

module.exports = router;

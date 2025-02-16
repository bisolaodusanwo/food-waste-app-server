const express = require("express");
const router = express.Router();
const {
  getLandingContent,
  updateLandingContent,
} = require("../controllers/landingController");

router.get("/", getLandingContent);
router.put("/", updateLandingContent);

module.exports = router;

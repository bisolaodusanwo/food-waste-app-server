const express = require("express");
const router = express.Router();
const {
  createHowWeDoIt,
  getHowWeDoIt,
  getHowWeDoItById,
  updateHowWeDoIt,
  deleteHowWeDoIt,
} = require("../controllers/howWeDoItController");

router.get("/", getHowWeDoIt);
router.get("/:id", getHowWeDoItById);
router.post("/", createHowWeDoIt);
router.put("/:id", updateHowWeDoIt);
router.delete("/:id", deleteHowWeDoIt);

module.exports = router;

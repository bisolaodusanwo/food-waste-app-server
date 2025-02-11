const express = require("express");
const {
  createFood,
  getFoodList,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createFood);
router.get("/", getFoodList);
router.put("/:id", authMiddleware, updateFood);
router.delete("/:id", authMiddleware, deleteFood);

module.exports = router;

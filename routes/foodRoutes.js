const express = require("express");
const router = express.Router();
const {
  createFood,
  getAllFood,
  getFoodById,
  updateFood,
  deleteFood,
  getNearbyFoods,
} = require("../controllers/foodController");

router.post("/", createFood);
router.get("/", getAllFood);
router.get("/near", getNearbyFoods);
router.get("/:id", getFoodById);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

module.exports = router;

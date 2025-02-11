const Food = require("../models/Food");

exports.createFood = async (req, res) => {
  try {
    const { name, quantity, description, location } = req.body;
    const food = new Food({
      donor: req.user.userId,
      name,
      quantity,
      description,
      location,
    });
    await food.save();
    res.status(201).json({ message: "Food donation added successfully", food });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getFoodList = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const foodList = await Food.find({ status: "available", deleted: false })
      .populate("donor", "name location")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Food.countDocuments({
      status: "available",
      deleted: false,
    });
    res.json({ foodList, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);

    if (!food) return res.status(404).json({ message: "Food not found" });
    if (food.donor.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    Object.assign(food, req.body);
    await food.save();
    res.json({ message: "Food updated successfully", food });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.softDeleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);

    if (!food) return res.status(404).json({ message: "Food not found" });
    if (food.donor.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    food.deleted = true;
    g;
    await food.save();
    res.json({ message: "Food donation deleted successfully (soft delete)" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const Food = require("../models/Food");

exports.createFood = async (req, res) => {
  try {
    const { donor, name, quantity, description, location } = req.body;
    if (!name || !quantity || !description || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFood = new Food({
      donor,
      name,
      quantity,
      description,
      location,
    });
    await newFood.save();

    res.status(201).json({
      message: "Food created successfully",
      food: newFood,
    });
  } catch (error) {
    console.error("Create Food Error:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllFood = async (req, res) => {
  try {
    const foods = await Food.find({ isDeleted: false }).populate(
      "donor",
      "firstName lastName email"
    );
    res.status(200).json({
      message: "Foods retrieved successfully",
      foods,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).populate("donor", "firstName lastName email");
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({
      message: "Food item retrieved successfully",
      food,
    });
  } catch (error) {
    console.error("Get Food By ID Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const { name, quantity, description, location, status } = req.body;

    const updatedFood = await Food.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { name, quantity, description, location, status },
      { new: true, runValidators: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({
      message: "Food item updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    console.error("Update Food Error:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!deletedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({
      message: "Food item soft-deleted successfully",
    });
  } catch (error) {
    console.error("Delete Food Error:", error);
    res.status(500).json({ message: error.message });
  }
};

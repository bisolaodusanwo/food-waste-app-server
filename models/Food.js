const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Food name is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: 1,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    status: {
      type: String,
      enum: ["available", "claimed", "expired"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", FoodSchema);

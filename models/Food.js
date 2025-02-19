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
    locationCoordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["available", "claimed", "expired"],
      default: "available",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
FoodSchema.index({ locationCoordinates: "2dsphere" });

module.exports = mongoose.model("Food", FoodSchema);

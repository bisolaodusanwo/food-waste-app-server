const Claim = require("../models/Claim");
const Food = require("../models/Food");

exports.createClaim = async (req, res) => {
  try {
    const { food, requestor } = req.body;

    const foodItem = await Food.findById(food);
    if (!foodItem)
      return res.status(404).json({ message: "Food item not found" });

    if (foodItem.status !== "available") {
      return res
        .status(400)
        .json({ message: "This food is no longer available for claim" });
    }

    const existingClaim = await Claim.findOne({ food, requestor });
    if (existingClaim) {
      return res
        .status(400)
        .json({ message: "You have already claimed this food" });
    }

    const newClaim = await Claim.create({ food, requestor, status: "pending" });
    res.status(201).json({ message: "Food claim submitted", claim: newClaim });
  } catch (error) {
    console.error("Create Claim Error:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("food", "name description location status")
      .populate("requestor", "firstName lastName email");

    res.status(200).json({ message: "Claims retrieved", claims });
  } catch (error) {
    console.error("Get Claims Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate("food", "name description location status")
      .populate("requestor", "firstName lastName email");

    if (!claim) return res.status(404).json({ message: "Claim not found" });

    res.status(200).json({ message: "Claim retrieved successfully", claim });
  } catch (error) {
    console.error("Get Claim By ID Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "approved", "declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid claim status" });
    }

    const updatedClaim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedClaim)
      return res.status(404).json({ message: "Claim not found" });

    if (status === "approved") {
      await Food.findByIdAndUpdate(updatedClaim.food, { status: "claimed" });
    }

    res
      .status(200)
      .json({ message: "Claim status updated", claim: updatedClaim });
  } catch (error) {
    console.error("Update Claim Status Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteClaim = async (req, res) => {
  try {
    const deletedClaim = await Claim.findByIdAndDelete(req.params.id);
    if (!deletedClaim)
      return res.status(404).json({ message: "Claim not found" });

    res.status(200).json({ message: "Claim deleted successfully" });
  } catch (error) {
    console.error("Delete Claim Error:", error);
    res.status(500).json({ error: error.message });
  }
};

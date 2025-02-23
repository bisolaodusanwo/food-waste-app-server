const HowWeDoIt = require("../models/HowWeDoIt");

exports.createHowWeDoIt = async (req, res) => {
  try {
    const { title, description, steps } = req.body;

    if (!title || !description || !steps || steps.length === 0) {
      return res
        .status(400)
        .json({ message: "All fields are required, including steps" });
    }

    const newEntry = new HowWeDoIt({ title, description, steps });
    await newEntry.save();

    res.status(201).json({
      message: "How We Do It entry created successfully",
      data: newEntry,
    });
  } catch (error) {
    console.error("Create How We Do It Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getHowWeDoIt = async (req, res) => {
  try {
    const entries = await HowWeDoIt.find();
    res.status(200).json({
      message: "How We Do It data retrieved successfully",
      data: entries,
    });
  } catch (error) {
    console.error("Get How We Do It Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getHowWeDoItById = async (req, res) => {
  try {
    const entry = await HowWeDoIt.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({
      message: "How We Do It entry retrieved successfully",
      data: entry,
    });
  } catch (error) {
    console.error("Get How We Do It By ID Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateHowWeDoIt = async (req, res) => {
  try {
    const { title, description, steps } = req.body;

    const updatedEntry = await HowWeDoIt.findByIdAndUpdate(
      req.params.id,
      { title, description, steps },
      { new: true, runValidators: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({
      message: "How We Do It entry updated successfully",
      data: updatedEntry,
    });
  } catch (error) {
    console.error("Update How We Do It Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteHowWeDoIt = async (req, res) => {
  try {
    const deletedEntry = await HowWeDoIt.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({
      message: "How We Do It entry deleted successfully",
    });
  } catch (error) {
    console.error("Delete How We Do It Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

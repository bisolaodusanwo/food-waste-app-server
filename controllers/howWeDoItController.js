const HowWeDoIt = require("../models/HowWeDoIt");

exports.getHowWeDoIt = async (req, res) => {
  try {
    const content = await HowWeDoIt.find();
    res.status(200).json({ message: "Content fetched successfully", content });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.createHowWeDoIt = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const newContent = new HowWeDoIt({ title, description, image });
    await newContent.save();
    res
      .status(201)
      .json({ message: "Content added successfully", content: newContent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

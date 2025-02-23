const mongoose = require("mongoose");

const HowWeDoItSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  steps: [
    {
      stepTitle: String,
      stepDescription: String,
    },
  ],
});

module.exports = mongoose.model("HowWeDoIt", HowWeDoItSchema);

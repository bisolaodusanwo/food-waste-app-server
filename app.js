require("dotenv").config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS", process.env.EMAIL_PASS);

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);

app.get("/", (req, res) => {
  res.send("Food Waste App API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

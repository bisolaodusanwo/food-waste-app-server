require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const landingRoutes = require("./routes/landingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const howWeDoItRoutes = require("./routes/howWeDoItRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/landing", landingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/how-we-do-it", howWeDoItRoutes);

app.get("/", (req, res) => {
  res.send("Food Waste App API is running...");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

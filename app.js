import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/food")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);

// Test root route
app.get("/", (req, res) => res.send("Server running"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/userRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const port = 3000;
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/food")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("running");
});

app.use("/api", router);

app.get("/api/products", authMiddleware, (req, res) => {
  res.send("Products - Protected");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

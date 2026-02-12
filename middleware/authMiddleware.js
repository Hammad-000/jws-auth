import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

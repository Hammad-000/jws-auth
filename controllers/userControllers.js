import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const SECRET_KEY = "supersecret123";

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body || {};

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashPassword,
      role: role || "user", 
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Password does not match!" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


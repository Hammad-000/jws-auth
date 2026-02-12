import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

 export const SECRET_KEY = "supersecret123";

export const register = async (req, res) => {
  const { name, email, password } = req.body || {};

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    SECRET_KEY,
    {
      expiresIn: "24h",
    },
  );

  res.json({ token });
};

export const login = async (req, res) => {
  const { email, password } = req.body || {};

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("User not found!");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "Password not match!" });
  }

  const token = jwt.sign(
    { userId: user._id },
    SECRET_KEY,
    { expiresIn: "24h" }
  );

  res.json({ token });
};

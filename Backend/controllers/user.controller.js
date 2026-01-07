import { JsonWebTokenError } from "jsonwebtoken";
import User from "../models/user.model";

import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, pass } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, pass });

    if (user) {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, pass } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(pass, User.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ token, user: userExists });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

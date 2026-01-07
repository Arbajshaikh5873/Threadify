import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    console.log("=== REGISTRATION REQUEST ===");
    console.log("Request body:", req.body);

    const { name, email, pass } = req.body;

    console.log("Extracted values:", {
      name,
      email,
      pass: pass ? "***" : undefined,
    });

    if (!name || !email || !pass) {
      console.log("Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Checking if user exists...");
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("Creating new user...");
    const user = await User.create({ name, email, password: pass });

    console.log("User created successfully:", user._id);

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("=== REGISTRATION ERROR ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    return res.status(500).json({
      message: error.message,
      details: error.toString(),
    });
  }
}

export async function login(req, res) {
  try {
    console.log("=== LOGIN REQUEST ===");
    console.log("Request body:", req.body);

    const { email, pass } = req.body;

    if (!email || !pass) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(pass, userExists.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Login successful");

    return res.status(200).json({
      token,
      user: {
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
      },
    });
  } catch (error) {
    console.error("=== LOGIN ERROR ===");
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

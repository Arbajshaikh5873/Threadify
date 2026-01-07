// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export async function register(req, res) {
//   try {
//     const { name, email, pass } = req.body;

//     // Validate input
//     if (!name || !email || !pass) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: "Invalid email format" });
//     }

//     // Validate password length
//     if (pass.length < 6) {
//       return res
//         .status(400)
//         .json({ message: "Password must be at least 6 characters" });
//     }

//     // Check if user already exists
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create new user (password will be hashed by the pre-save hook)
//     const user = await User.create({
//       name,
//       email,
//       password: pass,
//     });

//     console.log("User created successfully:", user._id);

//     // Don't send password back to client
//     const userResponse = {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//     };

//     return res.status(201).json(userResponse);
//   } catch (error) {
//     console.error("Registration error:", error);

//     // Handle duplicate key error (MongoDB unique constraint)
//     if (error.code === 11000) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Handle validation errors
//     if (error.name === "ValidationError") {
//       const messages = Object.values(error.errors).map((err) => err.message);
//       return res.status(400).json({ message: messages.join(", ") });
//     }

//     return res.status(500).json({
//       message: error.message || "Server error during registration",
//     });
//   }
// }

// export async function login(req, res) {
//   try {
//     const { email, pass } = req.body;

//     // Validate input
//     if (!email || !pass) {
//       return res
//         .status(400)
//         .json({ message: "Email and password are required" });
//     }

//     // Find user by email
//     const userExists = await User.findOne({ email });

//     if (!userExists) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(pass, userExists.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     console.log("User logged in successfully:", userExists._id);

//     // Don't send password back to client
//     const userResponse = {
//       _id: userExists._id,
//       name: userExists.name,
//       email: userExists.email,
//     };

//     return res.status(200).json({
//       token,
//       user: userResponse,
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({
//       message: error.message || "Server error during login",
//     });
//   }
// }

import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
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

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Token generated, login successful:", userExists._id);

    const userResponse = {
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
    };

    return res.status(200).json({
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("=== LOGIN ERROR ===");
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      message: "Server error during login",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

export async function deleteAccount(req, res) {
  try {
    const userId = req.userId;
    const { password } = req.body;

    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required to delete account" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password before deletion
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Delete all user's posts
    await Post.deleteMany({ userId });

    // Delete all user's comments
    await Comment.deleteMany({ userId });

    // Delete the user
    await user.deleteOne();

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete account error:", error);
    return res.status(500).json({
      message: "Server error during account deletion",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
